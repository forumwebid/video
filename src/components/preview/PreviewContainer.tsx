/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { useEditorStore } from '@/src/store/useEditorStore';
import { getSubtitleTemplateStyle } from '@/src/utils/styleUtils';
import { RefreshCw } from 'lucide-react';

export const PreviewContainer: React.FC = () => {
  const { 
    media, videoSegments, currentTime, isPlaying, trackSettings, 
    generatedData, captionStyle, subtitleStyle, selectedOverlayId,
    setSelectedOverlayId, setSelectedClipId, setCaptionStyle, setSubtitleStyle
  } = useEditorStore();
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync Logic (Simplified for modular structure)
  useEffect(() => {
    // Media sync logic would go here, referencing global currentTime and isPlaying
    // This is handled by a separate controller or within the component life cycle
  }, [currentTime, isPlaying, videoSegments]);

  const renderTextItem = (item: any, style: any, id: string) => {
      if (!item || trackSettings[id]?.hidden) return null;
      const appearance = getSubtitleTemplateStyle(style);
      const isSelected = selectedOverlayId === id;

      return (
          <div 
            className={`absolute flex flex-col items-center justify-center pointer-events-auto group ${isSelected ? 'ring-2 ring-pink-500' : 'hover:ring-2 hover:ring-white/50 cursor-pointer'}`}
            style={{ 
              left: `${style.transform.x}%`, top: `${style.transform.y}%`,
              transform: `translate(-50%, -50%) rotate(${style.transform.rotation}deg) scale(${style.transform.scale})`,
              zIndex: isSelected ? 200 : 100
            }}
            onPointerDown={(e) => {
                e.stopPropagation();
                setSelectedOverlayId(id);
            }}
          >
            <div className={appearance.classes} style={appearance.styles}>{item.text}</div>
            {isSelected && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-2 border-pink-500 rounded-full flex items-center justify-center">
                    <RefreshCw className="w-3 h-3 text-pink-600" />
                </div>
            )}
          </div>
      );
  };

  const activeCap = generatedData.captions.find(c => currentTime >= c.start && currentTime <= c.end);
  const activeSub = generatedData.subtitles.find(s => currentTime >= s.start && currentTime <= s.end);

  return (
    <div className="flex-1 flex items-center justify-center p-2 md:p-6 relative min-h-0 w-full overflow-hidden">
      <div 
        ref={containerRef}
        className="bg-black overflow-hidden relative group flex flex-col justify-end mx-auto rounded-lg shadow-2xl border border-neutral-800"
        style={{ 
          aspectRatio: '9/16', maxHeight: '100%', maxWidth: '100%',
          width: 'auto', height: '100%', containerType: 'size'
       }}
      >
        {/* Video layers */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            {videoSegments.map(seg => {
                const isVisible = currentTime >= seg.start && currentTime <= seg.end && !trackSettings.video?.hidden;
                return (
                    <div key={seg.id} className="absolute inset-0" style={{ opacity: isVisible ? 1 : 0 }}>
                        {seg.mediaType === 'image' ? (
                            <img src={seg.url} className="w-full h-full object-cover" />
                        ) : (
                            <video id={`vid_${seg.id}`} src={seg.url} className="w-full h-full object-cover" />
                        )}
                    </div>
                );
            })}
        </div>

        {/* Text layers */}
        {renderTextItem(activeCap, captionStyle, 'caption')}
        {renderTextItem(activeSub, subtitleStyle, 'subtitle')}
      </div>
    </div>
  );
};
