import React from 'react';
import { ProfessionProfile } from '../shared/professions.ts';
import { ProfessionIcon } from './ProfessionIcon.tsx';
import {
  X,
  Award,
  BookOpen,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  profession: ProfessionProfile;
  onSelectPrompt: (promptText: string) => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({
  isOpen,
  onClose,
  profession,
  onSelectPrompt,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl border ${profession.color.bg} ${profession.color.border} ${profession.color.primary}`}
            >
              <ProfessionIcon name={profession.iconName} className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  {profession.categoryName}
                </span>
                {profession.disclaimerType !== 'none' && (
                  <span className="text-[10px] font-semibold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    Wajib Disclaimer
                  </span>
                )}
              </div>
              <h2 className="text-lg font-bold text-white mt-1">
                {profession.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950/30">
          {/* Subtitle / Role Overview */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Ringkasan Mandat & Peran
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              {profession.subtitle}
            </p>
          </div>

          {/* Standar Industri */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-cyan-400" />
              Standar & Regulasi Acuan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {profession.standards.map((std, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="font-mono">{std}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fokus Keahlian Utama */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              Fokus Kompetensi & Analisis
            </h3>
            <div className="space-y-1.5">
              {profession.focusAreas.map((focus, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900/40 text-xs text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{focus}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer Text if exists */}
          {profession.disclaimerText && (
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-200/90 text-xs leading-relaxed flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-amber-300 mb-0.5">
                  Protokol Batasan & Etika Profesi:
                </span>
                {profession.disclaimerText}
              </div>
            </div>
          )}

          {/* Suggested Prompts */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Saran Topik Konsultasi Siap Pakai
            </h3>
            <div className="space-y-2">
              {profession.suggestedPrompts.map((sp, i) => (
                <button
                  key={i}
                  onClick={() => {
                    onSelectPrompt(sp.prompt);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-xl bg-slate-900/70 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 transition group flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/50 px-2 py-0.2 rounded border border-cyan-800/40 font-mono">
                        {sp.tag}
                      </span>
                      <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition">
                        {sp.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {sp.prompt}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3 border-t border-slate-800 bg-slate-900/90">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition text-xs font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
