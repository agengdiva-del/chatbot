import React from 'react';
import {
  PROFESSIONS,
  CATEGORIES,
  ProfessionProfile,
  CategoryId,
} from '../shared/professions.ts';
import { ProfessionIcon } from './ProfessionIcon.tsx';
import {
  Activity,
  Layers,
  Plus,
  History,
  Trash2,
  ChevronRight,
  ShieldCheck,
  X,
  MessageSquare,
} from 'lucide-react';

export interface ChatSession {
  id: string;
  professionId: string;
  title: string;
  timestamp: number;
  messageCount: number;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfession: ProfessionProfile;
  onSelectProfession: (prof: ProfessionProfile) => void;
  onOpenDirectory: () => void;
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onNewConsultation: () => void;
  onDeleteSession: (sessionId: string, e: React.MouseEvent) => void;
  activeCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeProfession,
  onSelectProfession,
  onOpenDirectory,
  sessions,
  activeSessionId,
  onSelectSession,
  onNewConsultation,
  onDeleteSession,
  activeCategory,
  onSelectCategory,
}) => {
  const currentCategoryProfessions = PROFESSIONS.filter(
    (p) => p.categoryId === activeCategory
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-80 bg-slate-950 border-r border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-extrabold tracking-wider text-white">
                  EXPERT AI
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                  CORE v3.8
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Multi-Domain Expert System
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action: New Consultation */}
        <div className="p-3 border-b border-slate-850">
          <button
            onClick={() => {
              onNewConsultation();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-950/40 hover:shadow-cyan-500/20 transition group"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
            <span>Mulai Konsultasi Baru</span>
          </button>
        </div>

        {/* Category Tabs */}
        <div className="p-3 border-b border-slate-850 bg-slate-900/40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Kelompok Profesi
            </span>
            <button
              onClick={onOpenDirectory}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5"
            >
              <Layers className="w-3 h-3" />
              <span>Semua (21)</span>
            </button>
          </div>

          <div className="grid grid-cols-5 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-850">
            {CATEGORIES.map((cat, idx) => {
              const isCatActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  title={cat.name}
                  className={`py-2 px-1 rounded-lg flex flex-col items-center justify-center transition ${
                    isCatActive
                      ? 'bg-slate-800 text-cyan-300 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <ProfessionIcon name={cat.iconName} className="w-4 h-4" />
                  <span className="text-[9px] font-mono mt-1 font-bold">
                    #{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-2 text-[11px] text-slate-300 truncate">
            {CATEGORIES.find((c) => c.id === activeCategory)?.name}
          </div>
        </div>

        {/* Profession List in Category */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-thin">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
            Daftar Spesialisasi
          </div>
          {currentCategoryProfessions.map((prof) => {
            const isSelected = activeProfession.id === prof.id;
            return (
              <button
                key={prof.id}
                onClick={() => {
                  onSelectProfession(prof);
                  onClose();
                }}
                className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center justify-between group transition ${
                  isSelected
                    ? 'bg-cyan-950/40 text-white border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                    : 'text-slate-300 hover:bg-slate-900/80 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div
                    className={`p-1.5 rounded-lg border text-xs ${
                      isSelected
                        ? `${prof.color.bg} ${prof.color.border} ${prof.color.primary}`
                        : 'bg-slate-900 border-slate-800 text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    <ProfessionIcon name={prof.iconName} className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-xs font-medium block truncate">
                      {prof.title}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {prof.subtitle}
                    </span>
                  </div>
                </div>
                {isSelected ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            );
          })}

          {/* Consultation History Section */}
          {sessions.length > 0 && (
            <div className="pt-4 mt-3 border-t border-slate-800/80">
              <div className="flex items-center justify-between px-2 py-1 mb-1">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <History className="w-3 h-3 text-cyan-400" />
                  Riwayat Konsultasi
                </span>
                <span className="text-[10px] px-1.5 rounded bg-slate-800 text-slate-400 font-mono">
                  {sessions.length}
                </span>
              </div>
              <div className="space-y-1">
                {sessions.slice(0, 8).map((session) => {
                  const prof = PROFESSIONS.find((p) => p.id === session.professionId);
                  const isCurrentSession = activeSessionId === session.id;
                  return (
                    <div
                      key={session.id}
                      onClick={() => {
                        onSelectSession(session.id);
                        onClose();
                      }}
                      className={`group flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition ${
                        isCurrentSession
                          ? 'bg-slate-800/80 text-cyan-300 font-medium'
                          : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <MessageSquare className="w-3 h-3 shrink-0 text-slate-400" />
                        <span className="truncate">{session.title}</span>
                      </div>
                      <button
                        onClick={(e) => onDeleteSession(session.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 text-slate-400 transition"
                        title="Hapus riwayat"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer System Specs */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950 text-[11px] text-slate-400">
          <div className="flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1 text-emerald-400 font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Gemini 3.8 Flash Engine
            </span>
            <span className="text-[10px] text-slate-400">ISO/IEEE/WHO</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Etika Industri & Proteksi Regulasi Aktif</span>
          </div>
        </div>
      </aside>
    </>
  );
};
