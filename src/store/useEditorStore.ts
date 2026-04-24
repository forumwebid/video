/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { create } from 'zustand';
import { 
  DEFAULT_CAPTION_STYLE, 
  DEFAULT_SUBTITLE_STYLE, 
  DEFAULT_ADJUSTMENTS 
} from '@/src/constants';
import { AppStore, VideoSegment, AudioSegment, Overlay, VideoMask, TextStyle } from '@/src/types';

interface EditorState extends AppStore {
  setMedia: (media: any) => void;
  setAppState: (state: AppStore['appState']) => void;
  setProcessingStep: (step: string) => void;
  setVideoSegments: (segments: VideoSegment[] | ((prev: VideoSegment[]) => VideoSegment[])) => void;
  setVoiceSegments: (segments: AudioSegment[] | ((prev: AudioSegment[]) => AudioSegment[])) => void;
  setDubbings: (dubbings: AudioSegment[] | ((prev: AudioSegment[]) => AudioSegment[])) => void;
  setOverlays: (overlays: Overlay[] | ((prev: Overlay[]) => Overlay[])) => void;
  setVideoMasks: (masks: VideoMask[] | ((prev: VideoMask[]) => VideoMask[])) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setTrackSettings: (settings: any | ((prev: any) => any)) => void;
  setTrackOrder: (order: string[] | ((prev: string[]) => string[])) => void;
  setCaptionStyle: (style: TextStyle | ((prev: TextStyle) => TextStyle)) => void;
  setSubtitleStyle: (style: TextStyle | ((prev: TextStyle) => TextStyle)) => void;
  setGeneratedData: (data: any | ((prev: any) => any)) => void;
  setSelectedClipId: (id: string | null) => void;
  setSelectedOverlayId: (id: string | null) => void;
  setSelectedMaskId: (id: string | null) => void;
  setSelectedRatio: (ratio: string) => void;
  reset: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  media: null,
  appState: 'idle',
  processingStep: '',
  videoSegments: [],
  voiceSegments: [],
  dubbings: [],
  overlays: [],
  videoMasks: [],
  duration: 15,
  currentTime: 0,
  isPlaying: false,
  trackSettings: {
    video: { hidden: false, muted: false, volume: 1 },
    voice: { hidden: false, muted: false, volume: 1 },
    caption: { hidden: false, muted: false, volume: 1 },
    subtitle: { hidden: false, muted: false, volume: 1 }
  },
  trackOrder: ['voice', 'caption', 'subtitle'],
  captionStyle: DEFAULT_CAPTION_STYLE,
  subtitleStyle: DEFAULT_SUBTITLE_STYLE,
  generatedData: {
    scriptText: "",
    captions: [],
    subtitles: [],
    isSynced: true
  },
  selectedClipId: null,
  selectedOverlayId: null,
  selectedMaskId: null,
  selectedRatio: 'auto',

  setMedia: (media) => set({ media }),
  setAppState: (appState) => set({ appState }),
  setProcessingStep: (processingStep) => set({ processingStep }),
  setVideoSegments: (val) => set((state) => ({ videoSegments: typeof val === 'function' ? val(state.videoSegments) : val })),
  setVoiceSegments: (val) => set((state) => ({ voiceSegments: typeof val === 'function' ? val(state.voiceSegments) : val })),
  setDubbings: (val) => set((state) => ({ dubbings: typeof val === 'function' ? val(state.dubbings) : val })),
  setOverlays: (val) => set((state) => ({ overlays: typeof val === 'function' ? val(state.overlays) : val })),
  setVideoMasks: (val) => set((state) => ({ videoMasks: typeof val === 'function' ? val(state.videoMasks) : val })),
  setDuration: (duration) => set({ duration }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setTrackSettings: (val) => set((state) => ({ trackSettings: typeof val === 'function' ? val(state.trackSettings) : val })),
  setTrackOrder: (val) => set((state) => ({ trackOrder: typeof val === 'function' ? val(state.trackOrder) : val })),
  setCaptionStyle: (val) => set((state) => ({ captionStyle: typeof val === 'function' ? val(state.captionStyle) : val })),
  setSubtitleStyle: (val) => set((state) => ({ subtitleStyle: typeof val === 'function' ? val(state.subtitleStyle) : val })),
  setGeneratedData: (val) => set((state) => ({ generatedData: typeof val === 'function' ? val(state.generatedData) : val })),
  setSelectedClipId: (selectedClipId) => set({ selectedClipId }),
  setSelectedOverlayId: (selectedOverlayId) => set({ selectedOverlayId }),
  setSelectedMaskId: (selectedMaskId) => set({ selectedMaskId }),
  setSelectedRatio: (selectedRatio) => set({ selectedRatio }),

  reset: () => set({
    media: null,
    appState: 'idle',
    videoSegments: [],
    voiceSegments: [],
    dubbings: [],
    overlays: [],
    videoMasks: [],
    currentTime: 0,
    isPlaying: false,
    generatedData: { scriptText: "", captions: [], subtitles: [], isSynced: true },
    selectedClipId: null,
    selectedOverlayId: null,
    selectedMaskId: null
  })
}));
