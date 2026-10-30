/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  PROFESSIONS,
  CATEGORIES,
  CONSULTATION_MODES,
  ProfessionProfile,
  ConsultationModeId,
  CategoryId,
} from './shared/professions.ts';
import { ProfessionIcon } from './components/ProfessionIcon.tsx';
import { MarkdownView } from './components/MarkdownView.tsx';
import { ProfessionModal } from './components/ProfessionModal.tsx';
import { DossierModal } from './components/DossierModal.tsx';
import { Sidebar, ChatSession } from './components/Sidebar.tsx';
import {
  Send,
  Menu,
  RotateCcw,
  Download,
  Info,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Sparkles,
  ShieldAlert,
  ChevronDown,
  Layers,
  ArrowRight,
  SlidersHorizontal,
  Mic,
  MicOff,
  Square,
  Bot,
  User,
  ExternalLink,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  professionId?: string;
  modeId?: ConsultationModeId;
}

const STORAGE_KEY_SESSIONS = 'expert_ai_sessions_v1';
const STORAGE_KEY_MESSAGES_PREFIX = 'expert_ai_msg_';
const STORAGE_KEY_LAST_PROF = 'expert_ai_last_prof';

export default function App() {
  // State
  const [activeProfession, setActiveProfession] = useState<ProfessionProfile>(() => {
    const savedProfId = localStorage.getItem(STORAGE_KEY_LAST_PROF);
    const found = PROFESSIONS.find((p) => p.id === savedProfId);
    return found || PROFESSIONS[0];
  });

  const [activeCategory, setActiveCategory] = useState<CategoryId>(
    activeProfession.categoryId
  );

  const [consultationMode, setConsultationMode] =
    useState<ConsultationModeId>('deep_analysis');

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  // Modals & Drawers
  const [isProfessionModalOpen, setIsProfessionModalOpen] = useState(false);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sessions
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SESSIONS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  // Speech & Narration
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  // Save last selected profession
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LAST_PROF, activeProfession.id);
    setActiveCategory(activeProfession.categoryId);
  }, [activeProfession]);

  // Save current messages to active session
  useEffect(() => {
    if (currentSessionId && messages.length > 0) {
      try {
        localStorage.setItem(
          `${STORAGE_KEY_MESSAGES_PREFIX}${currentSessionId}`,
          JSON.stringify(messages)
        );
      } catch (e) {
        console.error('Failed to save messages to localStorage', e);
      }
    }
  }, [messages, currentSessionId]);

  // Save sessions list
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to save sessions', e);
    }
  }, [sessions]);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'id-ID';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Voice Dictation Toggle
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Browser Anda tidak mendukung input suara (Speech Recognition). Silakan gunakan Chrome atau Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
        setIsListening(false);
      }
    }
  };

  // Text-to-Speech Narration Toggle
  const toggleSpeechNarration = (messageId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Browser Anda tidak mendukung text-to-speech.');
      return;
    }

    if (playingMessageId === messageId) {
      window.speechSynthesis.cancel();
      setPlayingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean text from markdown syntax for cleaner audio playback
    const cleanedText = text
      .replace(/```[\s\S]*?```/g, 'Potongan kode terlampir.')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/[#*_~>]/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.lang = 'id-ID';
    utterance.rate = 1.05;

    // Pick Indonesian voice if available
    const voices = window.speechSynthesis.getVoices();
    const indonesianVoice = voices.find((v) => v.lang.startsWith('id') || v.name.includes('Indonesian'));
    if (indonesianVoice) {
      utterance.voice = indonesianVoice;
    }

    utterance.onend = () => setPlayingMessageId(null);
    utterance.onerror = () => setPlayingMessageId(null);

    setPlayingMessageId(messageId);
    window.speechSynthesis.speak(utterance);
  };

  // Switch Profession
  const handleSelectProfession = (prof: ProfessionProfile) => {
    setActiveProfession(prof);
    setActiveCategory(prof.categoryId);
  };

  // Start new consultation session
  const handleNewConsultation = () => {
    if (isStreaming && abortController) {
      abortController.abort();
      setIsStreaming(false);
    }
    window.speechSynthesis?.cancel();
    setPlayingMessageId(null);
    setMessages([]);
    setCurrentSessionId(null);
    setInput('');
  };

  // Select existing session from history
  const handleSelectSession = (sessionId: string) => {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY_MESSAGES_PREFIX}${sessionId}`);
      if (raw) {
        const savedMessages: ChatMessage[] = JSON.parse(raw);
        setMessages(savedMessages);
        setCurrentSessionId(sessionId);

        const targetSession = sessions.find((s) => s.id === sessionId);
        if (targetSession) {
          const prof = PROFESSIONS.find((p) => p.id === targetSession.professionId);
          if (prof) {
            setActiveProfession(prof);
            setActiveCategory(prof.categoryId);
          }
        }
      }
    } catch (e) {
      console.error('Failed to load session messages', e);
    }
  };

  // Delete session
  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    localStorage.removeItem(`${STORAGE_KEY_MESSAGES_PREFIX}${sessionId}`);
    if (currentSessionId === sessionId) {
      handleNewConsultation();
    }
  };

  // Send message to Gemini via Server-Sent Events stream
  const handleSendMessage = async (textToSend?: string) => {
    const promptText = (textToSend !== undefined ? textToSend : input).trim();
    if (!promptText || isStreaming) return;

    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Ensure session exists
    let sessionId = currentSessionId;
    if (!sessionId) {
      sessionId = `sess_${Date.now()}`;
      setCurrentSessionId(sessionId);
      const newSession: ChatSession = {
        id: sessionId,
        professionId: activeProfession.id,
        title: promptText.slice(0, 40) + (promptText.length > 40 ? '...' : ''),
        timestamp: Date.now(),
        messageCount: 1,
      };
      setSessions((prev) => [newSession, ...prev]);
    } else {
      // Update message count in session
      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId ? { ...s, messageCount: s.messageCount + 1 } : s
        )
      );
    }

    const userMessage: ChatMessage = {
      id: `msg_u_${Date.now()}`,
      role: 'user',
      content: promptText,
      timestamp: Date.now(),
      professionId: activeProfession.id,
      modeId: consultationMode,
    };

    const assistantPlaceholderId = `msg_a_${Date.now() + 1}`;
    const initialAssistantMessage: ChatMessage = {
      id: assistantPlaceholderId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      professionId: activeProfession.id,
      modeId: consultationMode,
    };

    const updatedHistory = [...messages, userMessage];
    setMessages([...updatedHistory, initialAssistantMessage]);
    setIsStreaming(true);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          professionId: activeProfession.id,
          consultationModeId: consultationMode,
          stream: true,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      if (!response.body) {
        throw new Error('Response body is null');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulatedContent = '';
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.slice(6);
            if (dataStr === '[DONE]') {
              break;
            }
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                accumulatedContent += parsed.text;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantPlaceholderId
                      ? { ...m, content: accumulatedContent }
                      : m
                  )
                );
              } else if (parsed.error) {
                accumulatedContent += `\n\n*Terjadi kesalahan*: ${parsed.error}`;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantPlaceholderId
                      ? { ...m, content: accumulatedContent }
                      : m
                  )
                );
              }
            } catch {
              // Non-json SSE data line, ignore
            }
          }
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Consultation aborted by user');
      } else {
        console.error('Chat error:', err);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantPlaceholderId
              ? {
                  ...m,
                  content:
                    m.content ||
                    `⚠️ Terjadi kendala saat menghubungkan ke Expert AI System Core: ${
                      err.message || 'Koneksi terputus.'
                    }. Silakan periksa kembali atau kirim ulang permintaan Anda.`,
                }
              : m
          )
        );
      }
    } finally {
      setIsStreaming(false);
      setAbortController(null);
    }
  };

  // Stop streaming
  const handleStopStreaming = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
      setIsStreaming(false);
    }
  };

  // Copy message to clipboard
  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  // Export consultation to Markdown file
  const handleExportConsultation = () => {
    if (messages.length === 0) return;

    const dateStr = new Date().toISOString().slice(0, 10);
    const content = [
      `# Log Konsultasi - Expert AI System Core`,
      `**Tanggal**: ${new Date().toLocaleString('id-ID')}`,
      `**Spesialisasi**: ${activeProfession.title} (${activeProfession.subtitle})`,
      `**Kategori**: ${activeProfession.categoryName}`,
      `**Standar Acuan**: ${activeProfession.standards.join(', ')}`,
      `**Mode Konsultasi**: ${
        CONSULTATION_MODES.find((m) => m.id === consultationMode)?.name
      }`,
      `\n---\n`,
      ...messages.map((m) => {
        const sender = m.role === 'user' ? '👤 Pengguna' : `🤖 Expert AI (${activeProfession.title})`;
        return `### ${sender} - ${new Date(m.timestamp).toLocaleTimeString('id-ID')}\n\n${m.content}\n\n---\n`;
      }),
      activeProfession.disclaimerText
        ? `\n> **CATATAN BATASAN ETIKA & REGULASI:**\n> ${activeProfession.disclaimerText}\n`
        : '',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Konsultasi-${activeProfession.id}-${dateStr}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle textarea key down
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 180)}px`;
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeProfession={activeProfession}
        onSelectProfession={handleSelectProfession}
        onOpenDirectory={() => setIsProfessionModalOpen(true)}
        sessions={sessions}
        activeSessionId={currentSessionId}
        onSelectSession={handleSelectSession}
        onNewConsultation={handleNewConsultation}
        onDeleteSession={handleDeleteSession}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-850 lg:hidden"
              title="Menu direktori"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Active Profession Trigger */}
            <button
              onClick={() => setIsProfessionModalOpen(true)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition group text-left"
              title="Klik untuk memilih dari 21 spesialisasi profesi"
            >
              <div
                className={`p-1.5 rounded-lg border text-xs ${activeProfession.color.bg} ${activeProfession.color.border} ${activeProfession.color.primary}`}
              >
                <ProfessionIcon name={activeProfession.iconName} className="w-4 h-4" />
              </div>
              <div className="max-w-[150px] sm:max-w-[220px] md:max-w-xs truncate">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition truncate">
                    {activeProfession.title}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 shrink-0" />
                </div>
                <span className="text-[10px] text-slate-400 block truncate">
                  {activeProfession.categoryName.split('. ')[1] || activeProfession.categoryName}
                </span>
              </div>
            </button>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Consultation Mode Selector Dropdown / Pills */}
            <div className="hidden md:flex items-center bg-slate-900 border border-slate-800 p-0.5 rounded-xl text-xs">
              {CONSULTATION_MODES.slice(0, 3).map((mode) => {
                const isSelected = consultationMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setConsultationMode(mode.id)}
                    className={`px-2.5 py-1 rounded-lg transition font-medium text-[11px] ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title={mode.description}
                  >
                    {mode.name}
                  </button>
                );
              })}
            </div>

            {/* View Standards & Dossier Modal */}
            <button
              onClick={() => setIsDossierModalOpen(true)}
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-medium"
              title="Lihat spesifikasi kompetensi, standar industri & acuan etika"
            >
              <Info className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Standar & Dossier</span>
            </button>

            {/* Export Consultation */}
            {messages.length > 0 && (
              <button
                onClick={handleExportConsultation}
                className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-medium"
                title="Unduh log konsultasi sebagai file Markdown"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Export</span>
              </button>
            )}

            {/* Reset Session */}
            {messages.length > 0 && (
              <button
                onClick={handleNewConsultation}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-amber-400 transition"
                title="Mulai sesi konsultasi baru"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </header>

        {/* Disclaimer Bar for Sensitive Professions (Medical, Legal, Financial, Safety) */}
        {activeProfession.disclaimerText && (
          <div className="bg-amber-950/40 border-b border-amber-900/40 px-4 py-2 flex items-center justify-between text-xs text-amber-200/90 shrink-0">
            <div className="flex items-center gap-2 truncate">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">
                <strong className="font-semibold text-amber-300">Pemberitahuan Regulasi:</strong>{' '}
                {activeProfession.disclaimerText}
              </span>
            </div>
            <button
              onClick={() => setIsDossierModalOpen(true)}
              className="text-amber-400 hover:text-amber-300 text-[11px] underline shrink-0 ml-3"
            >
              Rincian Etika
            </button>
          </div>
        )}

        {/* Chat / Consultation Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin">
          {messages.length === 0 ? (
            /* Empty State: Welcome Hero & Suggested Inquiries */
            <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-8 animate-in fade-in duration-300">
              {/* Hero Banner */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  EXPERT AI SYSTEM CORE • STANDAR INDUSTRI AKTIF
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                  Konsultasi & Asistensi Virtual Profesional
                </h1>
                <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Memberikan wawasan, analisis mendalam, panduan teknis, strategi, dan pemecahan masalah sesuai standar industri global.
                </p>
              </div>

              {/* Active Profile Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`p-3 rounded-2xl border ${activeProfession.color.bg} ${activeProfession.color.border} ${activeProfession.color.primary} ${activeProfession.color.glow}`}
                    >
                      <ProfessionIcon name={activeProfession.iconName} className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-mono font-semibold">
                        Profil Spesialisasi Aktif
                      </span>
                      <h2 className="text-xl font-bold text-white">
                        {activeProfession.title}
                      </h2>
                      <p className="text-xs text-slate-400">
                        {activeProfession.subtitle}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsProfessionModalOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                  >
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Ganti Profesi (21 Spesialisasi)</span>
                  </button>
                </div>

                {/* Standards & Competencies */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Standar Acuan Industri:
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProfession.standards.map((std, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 font-mono"
                        >
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Mode Respon Aktif:
                    </h3>
                    <div className="grid grid-cols-2 gap-1.5">
                      {CONSULTATION_MODES.slice(0, 4).map((mode) => {
                        const isSelected = consultationMode === mode.id;
                        return (
                          <button
                            key={mode.id}
                            onClick={() => setConsultationMode(mode.id)}
                            className={`p-2 rounded-lg text-left text-xs transition border ${
                              isSelected
                                ? 'bg-cyan-950/50 border-cyan-500/50 text-cyan-200 font-semibold'
                                : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <span className="block truncate">{mode.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Suggested Questions Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Saran Topik Konsultasi Awal ({activeProfession.title})
                  </h3>
                  <span className="text-xs text-slate-500">Klik untuk langsung bertanya</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeProfession.suggestedPrompts.map((sp, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(sp.prompt)}
                      className="text-left p-4 rounded-xl bg-slate-900/60 hover:bg-slate-850/80 border border-slate-800 hover:border-cyan-500/50 shadow-sm hover:shadow-cyan-950/20 transition group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                            {sp.tag}
                          </span>
                          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition mb-1">
                          {sp.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {sp.prompt}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Active Messages Conversation */
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => {
                const isUser = message.role === 'user';
                const messageProf = message.professionId
                  ? PROFESSIONS.find((p) => p.id === message.professionId) || activeProfession
                  : activeProfession;

                return (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3.5 ${
                      isUser ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border text-xs shadow-md ${
                        isUser
                          ? 'bg-slate-800 border-slate-700 text-slate-300'
                          : `${messageProf.color.bg} ${messageProf.color.border} ${messageProf.color.primary}`
                      }`}
                    >
                      {isUser ? (
                        <User className="w-5 h-5 text-slate-300" />
                      ) : (
                        <ProfessionIcon name={messageProf.iconName} className="w-5 h-5" />
                      )}
                    </div>

                    {/* Message Bubble Container */}
                    <div
                      className={`flex flex-col max-w-[85%] sm:max-w-[80%] ${
                        isUser ? 'items-end' : 'items-start'
                      }`}
                    >
                      {/* Sub-header with Role Name & Timestamp */}
                      <div className="flex items-center gap-2 mb-1.5 px-1 text-[11px] text-slate-400">
                        <span className="font-semibold text-slate-300">
                          {isUser ? 'Anda' : `Expert AI Core (${messageProf.title})`}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(message.timestamp).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        {!isUser && message.modeId && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                            {CONSULTATION_MODES.find((m) => m.id === message.modeId)?.name}
                          </span>
                        )}
                      </div>

                      {/* Content Card */}
                      <div
                        className={`p-4 sm:p-5 rounded-2xl border text-sm leading-relaxed shadow-lg ${
                          isUser
                            ? 'bg-slate-850 border-slate-700 text-slate-100 rounded-tr-none'
                            : 'bg-slate-900 border-slate-800 text-slate-200 rounded-tl-none w-full'
                        }`}
                      >
                        {isUser ? (
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        ) : (
                          <>
                            {message.content ? (
                              <MarkdownView content={message.content} />
                            ) : (
                              <div className="flex items-center gap-2.5 text-cyan-400 py-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                                <span className="text-xs font-mono">
                                  Menyusun analisis teknis & wawasan profesional...
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {/* Assistant Action Toolbar */}
                      {!isUser && message.content && (
                        <div className="flex items-center gap-2 mt-2 px-1 text-xs">
                          {/* Text-to-Speech Button */}
                          <button
                            onClick={() =>
                              toggleSpeechNarration(message.id, message.content)
                            }
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition ${
                              playingMessageId === message.id
                                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                                : 'bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border-slate-800'
                            }`}
                            title={
                              playingMessageId === message.id
                                ? 'Hentikan pembacaan audio'
                                : 'Dengarkan narasi suara konsultan'
                            }
                          >
                            {playingMessageId === message.id ? (
                              <>
                                <VolumeX className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                                <span>Stop Audio</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5" />
                                <span>Dengarkan</span>
                              </>
                            )}
                          </button>

                          {/* Copy Message */}
                          <button
                            onClick={() => handleCopyMessage(message.id, message.content)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800 transition text-xs font-medium"
                            title="Salin isi respons ke clipboard"
                          >
                            {copiedMessageId === message.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Tersalin</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Salin</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Dock Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-md shrink-0">
          <div className="max-w-4xl mx-auto space-y-2">
            {/* Active Mode & Prompt Suggestions Ribbon */}
            <div className="flex items-center justify-between text-xs px-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  Mode Analisis:
                </span>
                <select
                  value={consultationMode}
                  onChange={(e) => setConsultationMode(e.target.value as ConsultationModeId)}
                  className="bg-slate-900 border border-slate-800 text-cyan-300 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-cyan-500"
                >
                  {CONSULTATION_MODES.map((mode) => (
                    <option key={mode.id} value={mode.id}>
                      {mode.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setIsDossierModalOpen(true)}
                className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition"
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Pilih Templat Pertanyaan</span>
              </button>
            </div>

            {/* Input Box */}
            <div className="relative flex items-end gap-2 p-2 rounded-2xl bg-slate-900 border border-slate-700/80 focus-within:border-cyan-500/80 focus-within:ring-1 focus-within:ring-cyan-500/40 shadow-xl transition">
              {/* Voice Dictation Button */}
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2 rounded-xl transition ${
                  isListening
                    ? 'bg-rose-500/20 text-rose-400 animate-pulse border border-rose-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={isListening ? 'Mendengarkan suara Anda...' : 'Bicara lewat suara (Dictation)'}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5 text-rose-400" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder={`Tanyakan wawasan, audit, solusi atau strategi kepada ${activeProfession.title}...`}
                rows={1}
                disabled={isStreaming}
                className="flex-1 bg-transparent border-0 resize-none py-2 px-1 text-sm text-slate-100 placeholder-slate-500 focus:outline-none leading-relaxed max-h-44 scrollbar-thin"
              />

              {/* Send or Stop Button */}
              {isStreaming ? (
                <button
                  type="button"
                  onClick={handleStopStreaming}
                  className="p-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition flex items-center gap-1 text-xs font-semibold"
                  title="Hentikan pembuatan respon"
                >
                  <Square className="w-4 h-4 fill-amber-300" />
                  <span className="hidden sm:inline">Hentikan</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim()}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-cyan-950/50 transition"
                  title="Kirim pertanyaan (Enter)"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Hint & Status Bar */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>
                Tekan <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">Enter</kbd> untuk kirim, <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">Shift+Enter</kbd> untuk baris baru
              </span>
              <span className="font-mono text-cyan-400/80">
                AI Core Model: Gemini 3.8 Flash
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProfessionModal
        isOpen={isProfessionModalOpen}
        onClose={() => setIsProfessionModalOpen(false)}
        activeProfession={activeProfession}
        onSelectProfession={handleSelectProfession}
      />

      <DossierModal
        isOpen={isDossierModalOpen}
        onClose={() => setIsDossierModalOpen(false)}
        profession={activeProfession}
        onSelectPrompt={(promptText) => {
          handleSendMessage(promptText);
        }}
      />
    </div>
  );
}
