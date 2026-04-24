/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useEditorStore } from '@/src/store/useEditorStore';
import { Wand2, Globe, Music } from 'lucide-react';
import { CONTENT_STYLES, VOICE_OPTIONS } from '@/src/constants';

export const AIPanel: React.FC = () => {
  const { generatedData, appState, processingStep } = useEditorStore();

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex justify-between items-center bg-cyan-950/20 p-3 rounded-xl border border-cyan-500/20">
         <div>
           <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2 mb-1"><Wand2 className="w-4 h-4" /> AI Generator</h3>
           <p className="text-[10px] text-neutral-500 font-medium">Buat script & suara otomatis.</p>
         </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-neutral-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
           <Globe className="w-3.5 h-3.5 text-blue-400" /> Bahasa Utama
        </label>
        <select className="bg-neutral-950 border border-neutral-800 rounded-md p-2.5 text-sm">
          <option>Bahasa Indonesia</option>
          <option>English</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
         <label className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Style Konten</label>
         <select className="bg-neutral-950 border border-neutral-800 rounded-md p-2.5 text-sm">
            {CONTENT_STYLES.map(s => <option key={s.name}>{s.name}</option>)}
         </select>
      </div>

      <div className="flex flex-col gap-2">
         <label className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Voice Actor</label>
         <select className="bg-neutral-950 border border-neutral-800 rounded-md p-2.5 text-sm">
            {VOICE_OPTIONS.Wanita.map(v => <option key={v.value} value={v.value}>{v.name}</option>)}
         </select>
      </div>

      <div className="flex flex-col gap-2">
         <label className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">AI Script</label>
         <div className="bg-neutral-950 border border-neutral-800 rounded-md p-3 text-xs text-neutral-300 leading-relaxed h-32 overflow-y-auto">
            {generatedData.scriptText || "Belum ada script yang di-generate."}
         </div>
      </div>
      
      <button className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl text-white font-bold transition-all shadow-lg active:scale-95">
         Generate Konten Baru
      </button>

      {appState === 'processing' && (
          <div className="text-xs text-center text-cyan-400 animate-pulse mt-2">
              {processingStep}
          </div>
      )}
    </div>
  );
};
