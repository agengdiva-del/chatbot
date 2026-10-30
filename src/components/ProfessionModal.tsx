import React, { useState } from 'react';
import {
  PROFESSIONS,
  CATEGORIES,
  ProfessionProfile,
  CategoryId,
} from '../shared/professions.ts';
import { ProfessionIcon } from './ProfessionIcon.tsx';
import {
  X,
  Search,
  Check,
  ShieldAlert,
  ArrowRight,
  BookOpen,
  Award,
  Layers,
} from 'lucide-react';

interface ProfessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfession: ProfessionProfile;
  onSelectProfession: (profession: ProfessionProfile) => void;
}

export const ProfessionModal: React.FC<ProfessionModalProps> = ({
  isOpen,
  onClose,
  activeProfession,
  onSelectProfession,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');

  if (!isOpen) return null;

  const filteredProfessions = PROFESSIONS.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.categoryId === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.focusAreas.some((f) => f.toLowerCase().includes(q)) ||
      p.standards.some((s) => s.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                Direktori Keahlian & Spesialisasi Industri
              </h2>
              <p className="text-xs text-slate-400">
                Pilih profil keahlian untuk menyesuaikan terminologi, kerangka standar, dan sudut pandang konsultasi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="p-4 sm:p-6 border-b border-slate-800/80 bg-slate-950/50 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari profesi, standar (misal: ISO, WHO, PSAK, IEEE), atau kata kunci (misal: bug, kontrak, gizi, drone)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/70 text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedCategory === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              Semua Kategori (21)
            </button>
            {CATEGORIES.map((cat) => {
              const count = PROFESSIONS.filter((p) => p.categoryId === cat.id).length;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <ProfessionIcon name={cat.iconName} className="w-3.5 h-3.5" />
                  <span>{cat.name.split('. ')[1] || cat.name}</span>
                  <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-slate-700/60 text-slate-300">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Professions Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 bg-slate-950/20">
          {filteredProfessions.map((prof) => {
            const isActive = activeProfession.id === prof.id;
            return (
              <div
                key={prof.id}
                onClick={() => {
                  onSelectProfession(prof);
                  onClose();
                }}
                className={`relative flex flex-col justify-between p-4 rounded-xl border transition-all cursor-pointer group ${
                  isActive
                    ? 'border-cyan-500 bg-cyan-950/20 ring-1 ring-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                    : 'border-slate-800/90 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-850 hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`p-2 rounded-xl border ${prof.color.bg} ${prof.color.border} ${prof.color.primary}`}
                      >
                        <ProfessionIcon name={prof.iconName} className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block">
                          {prof.categoryName.split('. ')[1] || prof.categoryName}
                        </span>
                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                          {prof.title}
                        </h3>
                      </div>
                    </div>
                    {isActive ? (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-500/30">
                        <Check className="w-3 h-3" />
                        Aktif
                      </span>
                    ) : (
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 p-1">
                        <ArrowRight className="w-4 h-4 text-cyan-400" />
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 mb-3 line-clamp-2">
                    {prof.subtitle}
                  </p>

                  {/* Standards Badges */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {prof.standards.slice(0, 2).map((std, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700/60 text-slate-300 font-mono flex items-center gap-1"
                      >
                        <Award className="w-2.5 h-2.5 text-cyan-400" />
                        {std}
                      </span>
                    ))}
                    {prof.standards.length > 2 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/50 text-slate-400">
                        +{prof.standards.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer tags */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1 text-slate-400">
                    <BookOpen className="w-3 h-3" />
                    <span>{prof.focusAreas.length} Fokus Keahlian</span>
                  </div>
                  {prof.disclaimerType !== 'none' && (
                    <span className="flex items-center gap-1 text-amber-400 text-[10px] px-1.5 py-0.5 rounded bg-amber-950/40 border border-amber-800/40">
                      <ShieldAlert className="w-3 h-3" />
                      Disclaimer
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-slate-900/90 text-xs text-slate-400">
          <span>Menampilkan {filteredProfessions.length} dari {PROFESSIONS.length} spesialisasi</span>
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
