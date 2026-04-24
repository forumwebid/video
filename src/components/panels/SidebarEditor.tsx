/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AIPanel } from './AIPanel';
import { Wand2, Sliders, Type, Layers, LayoutTemplate, X, Mic } from 'lucide-react';

export const SidebarEditor: React.FC = () => {
    const [activeTab, setActiveTab] = useState('ai');
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) return null;

    const tabs = [
        { id: 'ai', icon: Wand2, label: 'AI' },
        { id: 'clip', icon: Sliders, label: 'Klip' },
        { id: 'caption', icon: Type, label: 'Teks' },
        { id: 'overlay', icon: Layers, label: 'Overlay' },
        { id: 'record', icon: Mic, label: 'Dub' }
    ];

    return (
        <div className="flex flex-col h-full bg-neutral-900 overflow-hidden">
            {/* Header Tabs */}
            <div className="flex items-center gap-1 p-2 border-b border-neutral-800 bg-black/40">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex flex-col items-center py-2 rounded transition-all ${activeTab === tab.id ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                    >
                        <tab.icon className="w-4 h-4 mb-1" />
                        <span className="text-[10px] font-bold uppercase">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto">
                {activeTab === 'ai' && <AIPanel />}
                {activeTab === 'clip' && <div className="p-5 text-center text-sm text-neutral-500">Pilih klip di timeline untuk diedit.</div>}
                {activeTab === 'caption' && <div className="p-5 text-center text-sm text-neutral-500">Pengaturan gaya teks.</div>}
                {activeTab === 'overlay' && <div className="p-5 text-center text-sm text-neutral-500">Manajemen lapisan elemen.</div>}
            </div>
        </div>
    );
};
