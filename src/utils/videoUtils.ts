/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const hexToRgba = (hex: string, alpha = 1) => {
    if (!hex) return `rgba(0,0,0,${alpha})`;
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const fileToBase64 = (file: File): Promise<{ base64Data: string; mimeType: string }> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => { 
        const base64 = (reader.result as string).split(',')[1];
        resolve({ base64Data: base64, mimeType: file.type }); 
    };
    reader.readAsDataURL(file);
  });
};

export const pcmToWav = (base64Pcm: string, sampleRate = 24000): Blob => {
  const binaryString = window.atob(base64Pcm);
  const len = binaryString.length;
  const pcmData = new Uint8Array(len);
  for (let i = 0; i < len; i++) { pcmData[i] = binaryString.charCodeAt(i); }
  
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = pcmData.length;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  const writeString = (view: DataView, offset: number, string: string) => { 
      for (let i = 0; i < string.length; i++) { view.setUint8(offset + i, string.charCodeAt(i)); } 
  };

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  new Uint8Array(buffer, 44).set(pcmData);
  return new Blob([view], { type: 'audio/wav' });
};

export const extractAudioWavBase64 = async (fileOrUrl: File | string, start: number, end: number): Promise<string | null> => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      let arrayBuffer: ArrayBuffer;
      
      if (typeof fileOrUrl === 'string') {
        const res = await fetch(fileOrUrl);
        arrayBuffer = await res.arrayBuffer();
      } else {
        arrayBuffer = await fileOrUrl.arrayBuffer();
      }
      
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      const duration = end - start;
      if (duration <= 0) return null;
  
      const offlineCtx = new OfflineAudioContext(1, Math.ceil(44100 * duration), 44100);
      const source = offlineCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(offlineCtx.destination);
      source.start(0, start, duration); 
      
      const renderedBuffer = await offlineCtx.startRendering();
      
      const numOfChan = renderedBuffer.numberOfChannels;
      const length = renderedBuffer.length * numOfChan * 2 + 44;
      const buffer = new ArrayBuffer(length);
      const view = new DataView(buffer);
      const channels = [];
      let sample;
      let offset = 0;
      let pos = 0;
  
      const setUint16 = (data: number) => { view.setUint16(pos, data, true); pos += 2; };
      const setUint32 = (data: number) => { view.setUint32(pos, data, true); pos += 4; };
      const writeString = (name: string) => { for (let i = 0; i < name.length; i++) { view.setUint8(pos++, name.charCodeAt(i)); } };
  
      writeString('RIFF'); setUint32(length - 8); writeString('WAVE');
      writeString('fmt '); setUint32(16); setUint16(1); setUint16(numOfChan);
      setUint32(44100); setUint32(44100 * 2 * numOfChan); setUint16(numOfChan * 2); setUint16(16);
      writeString('data'); setUint32(length - pos - 4);
  
      for (let i = 0; i < renderedBuffer.numberOfChannels; i++) channels.push(renderedBuffer.getChannelData(i));
  
      while (pos < length) {
        for (let i = 0; i < numOfChan; i++) {
          sample = Math.max(-1, Math.min(1, channels[i][offset]));
          sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
          view.setInt16(pos, sample, true);
          pos += 2;
        }
        offset++;
      }
  
      let binary = '';
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
      
      return btoa(binary);
    } catch (err) {
      console.error("Audio extraction failed:", err);
      return null;
    }
  };

export const extractFramesFromVideoSegment = (file: File, start: number, end: number, numFrames = 3): Promise<any[]> => {
  return new Promise((resolve) => {
     const video = document.createElement('video');
     video.src = URL.createObjectURL(file);
     video.muted = true;
     video.playsInline = true;
     video.preload = "auto";

     const frames: any[] = [];
     let currentFrame = 0;
     
     const duration = end - start;
     if (duration <= 0) {
        URL.revokeObjectURL(video.src);
        return resolve([]);
     }

     const interval = duration / (numFrames + 1);
     const timePoints: number[] = [];
     for(let i=1; i<=numFrames; i++) timePoints.push(start + (interval * i));

     let captureTimeout: any;

     const captureFrame = () => {
        clearTimeout(captureTimeout);
        try {
           const canvas = document.createElement('canvas');
           const maxDim = 480; 
           let w = video.videoWidth;
           let h = video.videoHeight;
           
           if (w > maxDim || h > maxDim) {
              if (w > h) { h = h * (maxDim / w); w = maxDim; }
              else { w = w * (maxDim / h); h = maxDim; }
           }
           
           canvas.width = w || maxDim;
           canvas.height = h || maxDim;
           const ctx = canvas.getContext('2d');
           if (!ctx) return resolve([]);
           ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
           const dataUrl = canvas.toDataURL('image/jpeg', 0.6); 
           
           if (dataUrl.length > 100) {
               frames.push({ inlineData: { data: dataUrl.split(',')[1], mimeType: 'image/jpeg' } });
           }
           
           currentFrame++;
           if (currentFrame < numFrames) { 
               video.currentTime = timePoints[currentFrame]; 
               captureTimeout = setTimeout(() => { URL.revokeObjectURL(video.src); resolve(frames); }, 3000);
           } 
           else { 
               URL.revokeObjectURL(video.src); 
               resolve(frames); 
           }
        } catch(e) { 
           URL.revokeObjectURL(video.src); 
           resolve(frames); 
        }
     };

     video.onseeked = captureFrame;
     
     video.onloadedmetadata = () => {
         video.currentTime = timePoints[currentFrame];
         captureTimeout = setTimeout(() => { URL.revokeObjectURL(video.src); resolve(frames); }, 3000);
     };

     video.onerror = () => { URL.revokeObjectURL(video.src); resolve(frames); };
     setTimeout(() => { URL.revokeObjectURL(video.src); resolve(frames); }, 15000);
  });
};
