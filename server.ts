import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { PROFESSIONS, getProfessionById, CONSULTATION_MODES, ConsultationModeId } from './src/shared/professions.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Shared Gemini client with telemetry User-Agent as instructed by SKILL.md
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

function buildSystemInstruction(professionId: string, consultationModeId?: string): string {
  const prof = getProfessionById(professionId);
  const mode = CONSULTATION_MODES.find(m => m.id === consultationModeId) || CONSULTATION_MODES[0];

  let modeInstruction = '';
  switch (mode.id) {
    case 'quick_advice':
      modeInstruction = `MODE KONSULTASI SAAT INI: KONSULTASI CEPAT (QUICK ADVICE)
- Berikan jawaban yang padat, to the point, dan langsung ke solusi utama tanpa pengantar bertele-tele.
- Maksimal 3-4 poin esensial dan tindakan praktis langsung.`;
      break;
    case 'action_plan':
      modeInstruction = `MODE KONSULTASI SAAT INI: RENCANA AKSI BERTAHAP (ACTION PLAN)
- Susun jawaban dalam bentuk roadmap berfase (Fase 1: Persiapan/Audit, Fase 2: Eksekusi/Implementasi, Fase 3: Evaluasi/Monitoring).
- Sertakan checklist deliverable terukur dan estimasi timeline untuk setiap tahapan.`;
      break;
    case 'case_study':
      modeInstruction = `MODE KONSULTASI SAAT INI: STUDI KASUS & SIMULASI SKENARIO RIIL
- Bedah pertanyaan pengguna layaknya simulasi skenario riil di lapangan.
- Sajikan analisis trade-off (keuntungan vs kerugian), skenario worst-case vs best-case, dan evaluasi keputusan strategis.`;
      break;
    case 'audit_review':
      modeInstruction = `MODE KONSULTASI SAAT INI: AUDIT & REVIEW DOKUMEN / KODE / SOP
- Lakukan pemeriksaan kritis terhadap materi yang diajukan.
- Kategorikan temuan audit ke dalam: [Kritis / High Risk], [Sedang / Optimization Opportunity], dan [Rekomendasi Perbaikan Best-Practice].`;
      break;
    case 'deep_analysis':
    default:
      modeInstruction = `MODE KONSULTASI SAAT INI: ANALISIS MENDALAM (DEEP ANALYSIS)
- Lakukan kajian teknis komprehensif, standar baku industri yang berlaku, analisis akar masalah (root cause), dan mitigasi risiko menyeluruh.`;
      break;
  }

  let disclaimerInstruction = '';
  if (prof.disclaimerType === 'medical') {
    disclaimerInstruction = `
PENTING (DISCLAIMER MEDIS):
Di bagian paling akhir jawaban, selalu sertakan blok disclaimer medis yang jelas, mengingatkan pengguna bahwa jawaban ini bersifat edukasi/konsultatif awal dan tidak menggantikan diagnosis serta penanganan langsung dari dokter spesialis atau tenaga medis berwenang.`;
  } else if (prof.disclaimerType === 'legal') {
    disclaimerInstruction = `
PENTING (DISCLAIMER HUKUM):
Di bagian paling akhir jawaban, selalu sertakan blok disclaimer hukum yang menegaskan bahwa analisis ini bersifat konsultatif umum dan bukan merupakan legal opinion resmi yang mengikat dari advokat berizin. Pengguna disarankan mengonsultasikannya lebih lanjut dengan advokat/konsultan hukum terdaftar.`;
  } else if (prof.disclaimerType === 'financial') {
    disclaimerInstruction = `
PENTING (DISCLAIMER KEUANGAN):
Di bagian paling akhir jawaban, selalu sertakan catatan bahwa proyeksi dan panduan finansial ini adalah simulasi edukatif, bukan nasihat investasi atau audit perpajakan resmi.`;
  } else if (prof.disclaimerType === 'safety') {
    disclaimerInstruction = `
PENTING (DISCLAIMER KESELAMATAN & OPERASIONAL):
Di bagian paling akhir jawaban, cantumkan pengingat keselamatan bahwa prosedur lapangan nyata wajib selalu mengutamakan protokol darurat darat/udara/laut atau panggilan tanggap darurat resmi.`;
  }

  return `Anda adalah "Expert AI System Core", sebuah kecerdasan buatan tingkat lanjut yang berfungsi sebagai konsultan, asisten, dan mentor virtual profesional dari berbagai bidang keahlian di dunia.

Kategori Profesi Aktif: ${prof.categoryName}
Profil Spesialisasi Aktif: ${prof.title} (${prof.subtitle})
Standar Industri yang Dirujuk: ${prof.standards.join(', ')}

${modeInstruction}

Karakteristik & Arahan Spesifik Profil:
${prof.systemPromptAddon}

ATURAN UTAMA INTERAKSI (MANDATORY GUIDELINES):
1. IDENTIFIKASI KONTEKS:
   Pada awal jawaban (atau saat pertama kali menyapa), tunjukkan identitas profesional Anda secara elegan (misalnya: "[Mode Konsultasi: ${prof.title}]"). Pastikan nada bicara mencerminkan wibawa dan kompetensi seorang pakar industri terkemuka.

2. TERMINOLOGI INDUSTRI YANG TEPAT:
   Gunakan istilah teknis industri yang akurat dan berstandar internasional/nasional, namun tetap berikan penjelasan yang runtut dan mudah dipahami oleh pengguna.

3. STRUKTUR JAWABAN PROFESIONAL (WAJIB DIIKUTI):
   - Ringkasan / Solusi Langsung di awal (Executive Summary).
   - Penjelasan teknis mendalam menggunakan poin-poin (bullet points), tabel ringkas, atau tahapan terstruktur.
   - Actionable Next Steps (Langkah Tindakan Konkret) yang jelas dan realistis.
   - Pertanyaan Lanjutan Terarah (Follow-up Question) yang relevan untuk memandu pengguna memperdalam solusi permasalahan mereka.

4. FORMATTING & TIPOGRAFI:
   - Gunakan format Markdown yang rapi (headings, bold, lists, quotes, code blocks bila ada kode/rumus).
   - Hindari paragraf teks raksasa yang padat (dinding teks).

5. BAHASA:
   Gunakan Bahasa Indonesia yang profesional, berwibawa, ramah, lugas, dan adaptif.
${disclaimerInstruction}`;
}

// Prioritized list of compliant models from SKILL.md for immediate latency and high-availability
const MODELS_TO_TRY = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];

async function executeStreamWithRetry(formattedContents: any[], systemInstruction: string) {
  let lastError: any = null;

  for (const model of MODELS_TO_TRY) {
    try {
      const stream = await ai.models.generateContentStream({
        model,
        contents: formattedContents,
        config: {
          systemInstruction,
        },
      });
      return { stream, model };
    } catch (err: any) {
      lastError = err;
      console.warn(`[Gemini API] Model ${model} unavailable, trying fallback:`, err?.message || err);
    }
  }

  throw lastError;
}

async function executeContentWithRetry(formattedContents: any[], systemInstruction: string) {
  let lastError: any = null;

  for (const model of MODELS_TO_TRY) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: formattedContents,
        config: {
          systemInstruction,
        },
      });
      return response;
    } catch (err: any) {
      lastError = err;
      console.warn(`[Gemini API] Model ${model} unavailable, trying fallback:`, err?.message || err);
    }
  }

  throw lastError;
}

// Chat API endpoint (Supports Server-Sent Events Streaming and JSON fallback)
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, professionId, consultationModeId, stream = true } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'messages array is required' });
      return;
    }

    const currentProfessionId = professionId || 'software-engineer';
    const systemInstruction = buildSystemInstruction(currentProfessionId, consultationModeId);

    // Format messages for @google/genai SDK
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    if (stream) {
      // Set SSE headers
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders?.();

      const { stream: responseStream } = await executeStreamWithRetry(
        formattedContents,
        systemInstruction
      );

      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } else {
      const response = await executeContentWithRetry(
        formattedContents,
        systemInstruction
      );

      res.json({ text: response.text });
    }
  } catch (error: any) {
    console.error('Error generating response from Gemini:', error);
    const errorMessage = error?.message || 'Terjadi kesalahan internal pada Expert AI System Core';

    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`);
      res.end();
    } else {
      res.status(500).json({ error: errorMessage });
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    core: 'Expert AI System Core v3.8',
    professionsCount: PROFESSIONS.length,
    timestamp: new Date().toISOString(),
  });
});

// Setup Vite dev server or static files in production
async function startServer() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[Expert AI System Core] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
