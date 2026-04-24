/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Eye, EyeOff, Volume2, VolumeX } from 'lucide-react';
import { useEditorStore } from '@/src/store/useEditorStore';

interface TrackLabelProps {
  id: string;
  icon: React.ElementType;
  name: string;
  isDraggable?: boolean;
  index: number;
  onDragStart?: (e: React.DragEvent, index: number) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent, index: number) => void;
}

export const TrackLabel: React.FC<TrackLabelProps> = ({
  id,
  icon: Icon,
  name,
  isDraggable,
  index,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  const { trackSettings, setTrackSettings } = useEditorStore();
  const settings = trackSettings[id] || { hidden: false, muted: false, volume: 1 };

  return (
    <div 
      draggable={isDraggable} 
      onDragStart={isDraggable ? e => onDragStart?.(e, index) : undefined}
      onDragOver={isDraggable ? onDragOver : undefined}
      onDrop={isDraggable ? e => onDrop?.(e, index) : undefined}
      className={`h-9 md:h-12 shrink-0 bg-neutral-900/80 rounded-r flex flex-col items-center justify-center py-1 border-b border-neutral-800/50 ${isDraggable ? 'cursor-grab active:cursor-grabbing hover:bg-neutral-800 transition-colors' : ''}`}
      title={name}
    >
      <div className="flex items-center justify-center w-full mb-1">
          <Icon className="w-4 h-4 md:w-5 md:h-5 text-neutral-400 shrink-0"/>
      </div>
      <div className="flex gap-1 md:gap-2 text-neutral-500">
          <button 
            type="button" 
            onClick={(e) => { 
                e.stopPropagation(); 
                setTrackSettings((p: any) => ({...p, [id]: {...(p[id]||{}), hidden: !(p[id]?.hidden)}})); 
            }} 
            className={`p-0.5 rounded hover:bg-neutral-800 ${settings.hidden ? 'text-red-400' : 'hover:text-white'}`}
          >
             {settings.hidden ? <EyeOff className="w-2.5 h-2.5 md:w-3 md:h-3"/> : <Eye className="w-2.5 h-2.5 md:w-3 md:h-3"/>}
          </button>
          {!id.includes('caption') && !id.includes('subtitle') && (
            <button 
              type="button" 
              onClick={(e) => { 
                  e.stopPropagation(); 
                  setTrackSettings((p: any) => ({...p, [id]: {...(p[id]||{}), muted: !(p[id]?.muted)}})); 
              }} 
              className={`p-0.5 rounded hover:bg-neutral-800 ${settings.muted ? 'text-red-400' : 'hover:text-white'}`}
            >
               {settings.muted ? <VolumeX className="w-2.5 h-2.5 md:w-3 md:h-3"/> : <Volume2 className="w-2.5 h-2.5 md:w-3 md:h-3"/>}
            </button>
          )}
      </div>
    </div>
  );
};
