/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Smile, Newspaper, Clapperboard, Heart, MessageSquare, Coffee, Zap, Lightbulb, 
  AlertTriangle, ShieldAlert, Eye, Shuffle, List, HelpCircle, Clock, CheckSquare, 
  BookOpen, Compass, BarChart, Target, Ghost, Flame, MessageCircle, MonitorPlay, 
  Camera, GraduationCap, Subtitles, Layers, CheckCircle, FastForward 
} from 'lucide-react';

export const CONTENT_STYLES = [
    { name: "Lucu", icon: Smile, prompt: "lucu, humoris, banyak bercanda, dan ekspresif", voiceMale: "Puck", voiceFemale: "Laomedeia" },
    { name: "Berita", icon: Newspaper, prompt: "formal, berwibawa, tegas seperti pembawa berita televisi nasional", voiceMale: "Charon", voiceFemale: "Kore" },
    { name: "Alur Cerita", icon: Clapperboard, prompt: "narasi mendalam, sinematik, dan mengalir seperti narrator film profesional", voiceMale: "Hyperion", voiceFemale: "Aoede" },
    { name: "Drama", icon: Heart, prompt: "sangat emosional, dramatis, penuh penghayatan dan penekanan pada perasaan", voiceMale: "Zubenelgenubi", voiceFemale: "Gacrux" },
    { name: "Review", icon: MessageSquare, prompt: "informatif, kritis, memberikan opini dengan gaya YouTuber populer", voiceMale: "Orus", voiceFemale: "Sulafat" },
    { name: "Santai", icon: Coffee, prompt: "santai, kasual, seperti teman yang sedang bercerita di tongkrongan", voiceMale: "Triton", voiceFemale: "Callirrhoe" },
    { name: "Fakta Mengejutkan", icon: Zap, prompt: "mengungkapkan fakta mengejutkan dengan nada antusias dan mengundang rasa penasaran", voiceMale: "Fenrir", voiceFemale: "Zephyr" },
    { name: "Kamu Pasti Tidak Tahu", icon: Lightbulb, prompt: "mengungkap rahasia yang jarang diketahui orang dengan nada misterius dan menarik", voiceMale: "Iapetus", voiceFemale: "Autonoe" },
    { name: "Jangan Lakukan Ini", icon: AlertTriangle, prompt: "memberikan peringatan tegas namun edukatif tentang kesalahan yang harus dihindari", voiceMale: "Orus", voiceFemale: "Kore" },
    { name: "Kesalahan Umum", icon: ShieldAlert, prompt: "menjelaskan kesalahan yang sering terjadi dengan nada informatif dan solutif", voiceMale: "Charon", voiceFemale: "Vindemiatrix" },
    { name: "Rahasia Tersembunyi", icon: Eye, prompt: "mengungkapkan rahasia mendalam dengan nada berbisik, misterius, dan penuh teka-teki", voiceMale: "Zubenelgenubi", voiceFemale: "Despina" },
    { name: "Mitos vs Fakta", icon: Shuffle, prompt: "membandingkan mitos dan fakta dengan gaya edukatif, analitis, dan jelas", voiceMale: "Rasalgethi", voiceFemale: "Erinome" },
    { name: "Top List", icon: List, prompt: "membacakan daftar urutan dengan semangat, energik, dan menjaga ritme agar tidak membosankan", voiceMale: "Fenrir", voiceFemale: "Zephyr" },
    { name: "Did You Know", icon: HelpCircle, prompt: "menyampaikan trivia menarik dengan nada ceria, cepat, dan informatif", voiceMale: "Achird", voiceFemale: "Laomedeia" },
    { name: "Sebelum Terlambat", icon: Clock, prompt: "memberikan peringatan mendesak dengan nada serius, peduli, dan sedikit tegang", voiceMale: "Algenib", voiceFemale: "Achernar" },
    { name: "Ini Alasannya", icon: CheckSquare, prompt: "menjelaskan sebab-akibat dengan logis, jelas, dan meyakinkan", voiceMale: "Schedar", voiceFemale: "Aoede" },
    { name: "Pertanyaan Misterius", icon: HelpCircle, prompt: "mengajukan pertanyaan yang memancing pikiran dengan nada misterius dan menggugah rasa ingin tahu", voiceMale: "Atlas", voiceFemale: "Enceladus" },
    { name: "Cerita Nyata", icon: BookOpen, prompt: "menceritakan kisah nyata dengan nada empati, serius, dan mendalam", voiceMale: "Hyperion", voiceFemale: "Gacrux" },
    { name: "Plot Twist", icon: Shuffle, prompt: "membangun ketegangan cerita lalu mengungkapkan kejutan tak terduga dengan nada dramatis", voiceMale: "Alnilam", voiceFemale: "Sulafat" },
    { name: "Bayangkan Jika", icon: Compass, prompt: "mengajak pendengar berimajinasi dengan nada naratif, mengawang, dan inspiratif", voiceMale: "Algieba", voiceFemale: "Leda" },
    { name: "POV", icon: Eye, prompt: "menceritakan dari sudut pandang orang pertama dengan gaya personal, intim, dan emosional", voiceMale: "Zubenelgenubi", voiceFemale: "Ariel" },
    { name: "Eksperimen Sosial", icon: BarChart, prompt: "mengamati dan menjelaskan perilaku manusia dengan nada analitis, penasaran, dan reflektif", voiceMale: "Sadaltager", voiceFemale: "Cressida" },
    { name: "Kronologi", icon: Clock, prompt: "menyusun urutan kejadian dengan nada terstruktur, rapi, dan informatif", voiceMale: "Iapetus", voiceFemale: "Kore" },
    { name: "Perbandingan", icon: Layers, prompt: "membandingkan dua hal secara objektif, dinamis, dan mudah dipahami", voiceMale: "Schedar", voiceFemale: "Vindemiatrix" },
    { name: "Rekomendasi", icon: CheckCircle, prompt: "memberikan saran dan ulasan positif dengan nada antusias, ramah, dan meyakinkan", voiceMale: "Achird", voiceFemale: "Sulafat" },
    { name: "Tutorial Cepat", icon: FastForward, prompt: "memberikan panduan langkah demi langkah dengan nada cepat, efisien, dan jelas", voiceMale: "Rasalgethi", voiceFemale: "Erinome" },
    { name: "Tips Kilat", icon: Zap, prompt: "memberikan tips singkat dan padat dengan nada energik, to the point, dan bermanfaat", voiceMale: "Puck", voiceFemale: "Autonoe" },
    { name: "Life Hack", icon: Lightbulb, prompt: "membagikan trik kehidupan dengan nada cerdik, menyenangkan, dan aplikatif", voiceMale: "Puck", voiceFemale: "Laomedeia" },
    { name: "Insight Psikologi", icon: Target, prompt: "membahas fenomena psikologis dengan nada tenang, bijak, dan menenangkan jiwa", voiceMale: "Sadaltager", voiceFemale: "Achernar" },
    { name: "Kontroversial", icon: AlertTriangle, prompt: "membahas topik perdebatan dengan nada berani, provokatif namun tetap profesional", voiceMale: "Orus", voiceFemale: "Gacrux" },
    { name: "Misteri", icon: Ghost, prompt: "membahas hal tak terpecahkan dengan nada gelap, menegangkan, dan penuh tanda tanya", voiceMale: "Atlas", voiceFemale: "Despina" },
    { name: "Horor Ringan", icon: Ghost, prompt: "menceritakan kisah seram dengan nada dingin, lambat, dan membuat merinding", voiceMale: "Algenib", voiceFemale: "Enceladus" },
    { name: "Warning", icon: AlertTriangle, prompt: "memberikan peringatan keras dan tegas agar pendengar waspada", voiceMale: "Alnilam", voiceFemale: "Kore" },
    { name: "Motivasi Keras", icon: Flame, prompt: "memberikan dorongan semangat dengan nada berapi-api, tegas, dan menggelegar", voiceMale: "Fenrir", voiceFemale: "Zephyr" },
    { name: "Reaction", icon: MessageCircle, prompt: "reaksi spontan, heboh, antusias, dan sangat ekspresif layaknya YouTuber reaction", voiceMale: "Fenrir", voiceFemale: "Zephyr" },
    { name: "Tutorial", icon: MonitorPlay, prompt: "memberikan panduan langkah demi langkah secara mendetail, terstruktur, dan mudah dipahami", voiceMale: "Charon", voiceFemale: "Kore" },
    { name: "Education", icon: GraduationCap, prompt: "edukatif, akademis, informatif, dan jelas layaknya seorang guru atau narator dokumenter", voiceMale: "Sadaltager", voiceFemale: "Aoede" },
    { name: "Vlogger", icon: Camera, prompt: "gaya nge-vlog yang energik, interaktif, personal, dan sangat antusias menyapa penonton", voiceMale: "Fenrir", voiceFemale: "Zephyr" }
];

export const VOICE_OPTIONS = {
    Wanita: [
      { name: "Kore (Profesional)", value: "Kore", popular: true },
      { name: "Aoede (Natural)", value: "Aoede", popular: true },
      { name: "Gacrux (Matang)", value: "Gacrux", popular: true },
      { name: "Sulafat (Ramah)", value: "Sulafat", popular: true },
      { name: "Vindemiatrix (Hangat)", value: "Vindemiatrix", popular: true },
      { name: "Achernar (Menenangkan)", value: "Achernar", popular: false },
      { name: "Zephyr (Energik)", value: "Zephyr", popular: false },
      { name: "Leda (Muda)", value: "Leda", popular: false },
      { name: "Callirrhoe (Santai)", value: "Callirrhoe", popular: false },
      { name: "Autonoe (Cerah)", value: "Autonoe", popular: false },
      { name: "Umbriel (Relaks)", value: "Umbriel", popular: false },
      { name: "Despina (Elegan)", value: "Despina", popular: false },
      { name: "Erinome (Jelas)", value: "Erinome", popular: false },
      { name: "Laomedeia (Ceria)", value: "Laomedeia", popular: false },
      { name: "Sadachbia (Dinamis)", value: "Sadachbia", popular: false },
      { name: "Pulcherrima (Distinct)", value: "Pulcherrima", popular: false },
      { name: "Enceladus (Unik)", value: "Enceladus", popular: false },
      { name: "Ariel (Lembut)", value: "Ariel", popular: false },
      { name: "Cressida (Tenang)", value: "Cressida", popular: false },
      { name: "Dione (Natural)", value: "Dione", popular: false },
      { name: "Eirene (Halus)", value: "Eirene", popular: false }
    ],
    Pria: [
      { name: "Charon (Informatif)", value: "Charon", popular: true },
      { name: "Orus (Tegas)", value: "Orus", popular: true },
      { name: "Schedar (Seimbang)", value: "Schedar", popular: true },
      { name: "Achird (Ramah)", value: "Achird", popular: true },
      { name: "Alnilam (Kuat)", value: "Alnilam", popular: true },
      { name: "Puck (Playful)", value: "Puck", popular: false },
      { name: "Fenrir (Bersemangat)", value: "Fenrir", popular: false },
      { name: "Iapetus (Presisi)", value: "Iapetus", popular: false },
      { name: "Algieba (Halus)", value: "Algieba", popular: false },
      { name: "Sadaltager (Bijak)", value: "Sadaltager", popular: false },
      { name: "Rasalgethi (Jelas)", value: "Rasalgethi", popular: false },
      { name: "Zubenelgenubi (Dalam)", value: "Zubenelgenubi", popular: false },
      { name: "Algenib (Berat)", value: "Algenib", popular: false },
      { name: "Atlas (Dalam)", value: "Atlas", popular: false },
      { name: "Hyperion (Naratif)", value: "Hyperion", popular: false },
      { name: "Triton (Santai)", value: "Triton", popular: false }
    ]
};

export const DEFAULT_TRANSITION = { type: 'none', duration: 1.0, intensity: 50, direction: 'left', particleAmount: 50, blurStrength: 50, soundFx: false, beatSync: false };
export const DEFAULT_ADJUSTMENTS = { presetColor: null, presetBlend: 'overlay', hue: 0, saturation: 100, luminance: 0, brightness: 100, contrast: 100, exposure: 100, sharpen: 0 };
export const DEFAULT_CAPTION_STYLE = { template: 'Viral Yellow', font: '"Anton", sans-serif', anim: 'popSpring', bgStyle: 'none', color: '#FFDE00', activeColor: '#FF0000', bgColor: '#000000', size: 4.0, transform: { x: 50, y: 70, scale: 1, rotation: 0 } };
export const DEFAULT_SUBTITLE_STYLE = { template: 'Classic Box', font: '"Inter", sans-serif', anim: 'fadeIn', bgStyle: 'blur', color: '#FFFFFF', activeColor: '#FFFFFF', bgColor: '#000000', size: 3.0, transform: { x: 50, y: 88, scale: 1, rotation: 0 } };

export const COLOR_PRESETS = [
    { id: 'Normal', color: null, blend: 'normal' },
    { id: 'Warm / Sunset', color: 'rgba(255, 140, 0, 0.25)', blend: 'overlay' },
    { id: 'Cool / Cyber', color: 'rgba(0, 200, 255, 0.3)', blend: 'overlay' },
    { id: 'Vintage', color: 'rgba(150, 100, 30, 0.4)', blend: 'soft-light' },
    { id: 'Moody Dark', color: 'rgba(0, 10, 40, 0.5)', blend: 'multiply' },
    { id: 'Faded Film', color: 'rgba(200, 200, 200, 0.2)', blend: 'soft-light' },
    { id: 'Dramatic Red', color: 'rgba(255, 0, 50, 0.2)', blend: 'overlay' },
    { id: 'Toxic Green', color: 'rgba(50, 255, 50, 0.15)', blend: 'multiply' }
];

export const FONT_OPTIONS = [
    { name: 'Inter (Default)', value: '"Inter", sans-serif' },
    { name: 'Anton (Viral)', value: '"Anton", sans-serif' },
    { name: 'Bangers (Komik)', value: '"Bangers", cursive' },
    { name: 'Montserrat (Elegan)', value: '"Montserrat", sans-serif' }
];
