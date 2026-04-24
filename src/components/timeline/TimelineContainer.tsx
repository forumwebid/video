/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { useEditorStore } from '@/src/store/useEditorStore';
import { TrackLabel } from '@/src/components/shared/TrackLabel';
import { Video, Music, Type, Subtitles, GripHorizontal } from 'lucide-react';

export const TimelineContainer: React.FC = () => {
  const { 
    duration, currentTime, setCurrentTime, isPlaying, setIsPlaying,
    videoSegments, voiceSegments, generatedData, trackOrder, setTrackOrder
  } = useEditorStore();
  
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleSeek = (e: React.PointerEvent) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    setCurrentTime(Math.max(0, Math.min(percent * duration, duration))); 
  };

  return (
    <div className="bg-neutral-950 border-t border-neutral-800 flex flex-col shrink-0 relative h-[240px]">
      <div className="flex-1 flex overflow-y-auto overflow-x-hidden relative bg-[#0a0a0a] mt-1">
        
        {/* Labels Track */}
        <div className="w-[60px] shrink-0 flex flex-col z-50 bg-neutral-950 border-r border-neutral-800 pt-8 pb-32 sticky left-0">
          <TrackLabel id="video" icon={Video} name="Video" index={0} />
          {trackOrder.map((id, idx) => {
              const icon = id === 'voice' ? Music : id === 'caption' ? Type : Subtitles;
              return <TrackLabel key={id} id={id} icon={icon} name={id} index={idx + 1} isDraggable />;
          })}
        </div>

        {/* Tracks Area */}
        <div className="flex-1 overflow-x-auto relative">
          <div 
            ref={timelineRef}
            onPointerDown={handleSeek}
            className="relative cursor-text min-h-full pb-32 w-full"
            style={{ minWidth: '100%' }}
          >
            {/* Playhead */}
            <div 
              className="absolute top-0 bottom-0 w-px bg-red-500 z-30 pointer-events-none" 
              style={{ left: `${(currentTime / duration) * 100}%` }}
            >
              <div className="w-2 h-2 bg-red-500 absolute top-0 -left-[3.5px] rounded-full" />
            </div>

            {/* Dummy Track Rows */}
            <div className="h-12 border-b border-neutral-800/50 relative">
               {videoSegments.map(seg => (
                 <div 
                    key={seg.id}
                    className="absolute h-10 top-1 bg-blue-600/40 border border-blue-500 rounded text-[10px] flex items-center px-2"
                    style={{ left: `${(seg.start / duration) * 100}%`, width: `${((seg.end - seg.start) / duration) * 100}%` }}
                 >
                   {seg.name || 'Clip'}
                 </div>
               ))}
            </div>

            {trackOrder.map(trackId => (
              <div key={trackId} className="h-12 border-b border-neutral-800/50 relative">
                  {trackId === 'voice' && voiceSegments.map(seg => (
                      <div 
                        key={seg.id}
                        className="absolute h-10 top-1 bg-green-900/60 border border-green-500 rounded text-[10px] flex items-center px-2"
                        style={{ left: `${(seg.start / duration) * 100}%`, width: `${((seg.end - seg.start) / duration) * 100}%` }}
                      >
                        Voice AI
                      </div>
                  ))}
                  {trackId === 'caption' && generatedData.captions.map((cap, i) => (
                      <div 
                        key={i}
                        className="absolute h-8 top-2 bg-pink-600 border border-pink-400 rounded text-[9px] flex items-center px-1 overflow-hidden"
                        style={{ left: `${(cap.start / duration) * 100}%`, width: `${((cap.end - cap.start) / duration) * 100}%` }}
                      >
                        {cap.text}
                      </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
