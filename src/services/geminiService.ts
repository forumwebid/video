/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CONTENT_STYLES } from "@/src/constants";

const API_KEY = process.env.GEMINI_API_KEY;

export const extractJSON = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (e) {
    const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    let braceCount = 0;
    let startIndex = -1;
    for (let i = 0; i < cleaned.length; i++) {
      if (cleaned[i] === '{') {
        if (braceCount === 0) startIndex = i;
        braceCount++;
      } else if (cleaned[i] === '}') {
        braceCount--;
        if (braceCount === 0 && startIndex !== -1) {
          try {
            return JSON.parse(cleaned.substring(startIndex, i + 1));
          } catch(err) {
            break;
          }
        }
      }
    }
    throw new Error("Gagal mengekstrak JSON dari respons AI.");
  }
};

export const fetchWithRetry = async (url: string, options: RequestInit, retries = 5) => {
  const delays = [1000, 2000, 4000, 8000, 16000];
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(res => setTimeout(res, delays[i]));
    }
  }
};

export const getTTSEmotionPrefix = (styleName: string) => {
    const map: Record<string, string> = {};
    CONTENT_STYLES.forEach(style => {
        map[style.name] = `Say it ${style.prompt}: `;
    });
    return map[styleName] || "Say naturally: ";
};

export const generateGeminiContent = async (payload: any) => {
  return fetchWithRetry(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
    { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
    }
  );
};

export const generateGeminiAudio = async (payload: any) => {
  return fetchWithRetry(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`,
    { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
    }
  );
};
