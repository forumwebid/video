/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Upload, FileText } from 'lucide-react';
import { useEditorStore } from '@/src/store/useEditorStore';
import { EditorLayout } from '@/src/components/layout/EditorLayout';
import { EditorToolbar } from '@/src/components/layout/EditorToolbar';
import { PreviewContainer } from '@/src/components/preview/PreviewContainer';
import { TimelineContainer } from '@/src/components/timeline/TimelineContainer';
import { SidebarEditor } from '@/src/components/panels/SidebarEditor';

export default function App() {
  const { media, setMedia, appState, setAppState } = useEditorStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    let type = 'text';
    if (file.type.startsWith('video/')) type = 'video';
    else if (file.type.startsWith('image/')) type = 'image';

    const mediaObj = {
      type,
      file,
      url: URL.createObjectURL(file),
      previewContent: type === 'text' ? 'User uploaded a text document.' : ''
    };
    
    setMedia(mediaObj);
    setAppState('ready');
  };

  if (!media) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-neutral-950 text-white">
        <div className="bg-neutral-900 border-2 border-dashed border-neutral-700 p-10 rounded-2xl flex flex-col items-center text-center max-w-md w-full mx-4">
          <div className="bg-cyan-950 p-4 rounded-full mb-4">
            <Upload className="w-10 h-10 text-cyan-400" />
          </div>
          <h2 className="text-xl font-bold mb-2">AutoCut AI Studio</h2>
          <p className="text-neutral-400 text-sm mb-6">
            Pilih Video, Gambar, atau Teks untuk mulai membuat konten viral dalam hitungan detik.
          </p>
          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()} 
            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all shadow-lg"
          >
            Pilih File
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
            accept="video/*,image/*,.txt" 
          />
        </div>
      </div>
    );
  }

  return (
    <EditorLayout
      sidebar={<SidebarEditor />}
      toolbar={<EditorToolbar />}
      timeline={<TimelineContainer />}
    >
      <PreviewContainer />
    </EditorLayout>
  );
}
