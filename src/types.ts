/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VideoAdjustment {
  presetColor: string | null;
  presetBlend: string;
  hue: number;
  saturation: number;
  luminance: number;
  brightness: number;
  contrast: number;
  exposure: number;
  sharpen: number;
}

export interface Transition {
  type: string;
  duration: number;
  intensity: number;
  direction: string;
  particleAmount: number;
  blurStrength: number;
  soundFx: boolean;
  beatSync: boolean;
}

export interface VideoSegment {
  id: string;
  mediaType: 'video' | 'image';
  start: number;
  end: number;
  sourceStart: number;
  transition?: Transition;
  url: string;
  file?: File;
  name?: string;
  volume: number;
  fadeIn: number;
  fadeOut: number;
  speed: number;
  adjustments?: VideoAdjustment;
}

export interface AudioSegment {
  id: string;
  start: number;
  end: number;
  sourceStart: number;
  url: string;
  waveform?: number[];
  volume: number;
  fadeIn: number;
  fadeOut: number;
  speed: number;
}

export interface Overlay {
  id: string;
  type: 'text' | 'image' | 'video' | 'shape';
  content: string;
  url: string;
  shapeType?: 'rectangle' | 'circle' | 'triangle' | 'donut' | 'semicircle' | 'parallelogram' | 'line';
  fillColor: string;
  borderColor: string;
  borderWidth: number;
  isMask: boolean;
  useGradient: boolean;
  gradientType: 'linear' | 'radial';
  gradientColor?: string;
  gradientOpacity: number;
  gradientPos: number;
  gradientSpread: number;
  gradientAngle: number;
  anim: string;
  start: number;
  end: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
}

export interface TextItem {
  text: string;
  start: number;
  end: number;
  originalIndex?: number;
}

export interface TextStyle {
  template: string;
  font: string;
  anim: string;
  bgStyle: string;
  color: string;
  activeColor: string;
  bgColor: string;
  size: number;
  transform: {
    x: number;
    y: number;
    scale: number;
    rotation: number;
  };
}

export interface VideoMask {
  id: string;
  type: 'linear' | 'radial';
  transparent: boolean;
  color: string;
  pos: number;
  angle: number;
  feather: number;
  intensity: number;
}

export interface TrackSettingsEntry {
  hidden: boolean;
  muted: boolean;
  volume: number;
}

export interface AppStore {
  media: any;
  appState: 'idle' | 'processing' | 'ready' | 'error';
  processingStep: string;
  videoSegments: VideoSegment[];
  voiceSegments: AudioSegment[];
  dubbings: AudioSegment[];
  overlays: Overlay[];
  videoMasks: VideoMask[];
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  trackSettings: Record<string, TrackSettingsEntry>;
  trackOrder: string[];
  captionStyle: TextStyle;
  subtitleStyle: TextStyle;
  generatedData: {
    scriptText: string;
    captions: TextItem[];
    subtitles: TextItem[];
    isSynced: boolean;
  };
  selectedClipId: string | null;
  selectedOverlayId: string | null;
  selectedMaskId: string | null;
  selectedRatio: string;
}
