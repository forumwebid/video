/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Play, Pause, Download, Scissors, Trash2, Undo2, Redo2 } from 'lucide-react';
import { useEditorStore } from '@/src/store/useEditorStore';

export const EditorToolbar: React.FC = () => {
    const { isPlaying, setIsPlaying, currentTime, duration } = useEditorStore();

    return (
        <div className="h-12 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between px-4 z-10 shrink-0">
            <div className="flex items-center gap-2">
                <button className="p-1.5 text-neutral-400 hover:text-white"><Undo2 className="w-4 h-4" /></button>
                <button className="p-1.5 text-neutral-400 hover:text-white"><Redo2 className="w-4 h-4" /></button>
                <div className="h-4 w-px bg-neutral-700 mx-1"></div>
                <button className="p-1.5 text-neutral-400 hover:text-white"><Scissors className="w-4 h-4" /></button>
                <button className="p-1.5 text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
            </div>

            <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-900/20"
                >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                </button>
                <div className="text-[10px] font-mono text-neutral-400 font-medium">
                    {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
                </div>
            </div>

            <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-md">
                <Download className="w-4 h-4" /> Export
            </button>
        </div>
    );
};
