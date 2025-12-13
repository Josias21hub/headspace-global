// Conteúdo Culturalmente Adaptado por Região

import { Language } from "./i18n";

export interface CulturalContent {
  dailyPractice: {
    title: string;
    description: string;
    duration: string;
  };
  specialPrograms: Array<{
    name: string;
    description: string;
    culturalContext: string;
  }>;
  meditationStyles: string[];
  soundscapes: string[];
  visualThemes: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const culturalContent: Record<Language, CulturalContent> = {
  en: {
    dailyPractice: {
      title: "1-Minute Meditation",
      description: "Close your eyes... Breathe deeply... Release slowly... One minute is enough to restart.",
      duration: "1 min",
    },
    specialPrograms: [
      {
        name: "21 Days to Zero Anxiety",
        description: "Science-based mindfulness program",
        culturalContext: "Western mindfulness approach",
      },
      {
        name: "Deep Sleep in 14 Days",
        description: "Sleep optimization techniques",
        culturalContext: "Sleep hygiene focus",
      },
      {
        name: "Balance with Mantras",
        description: "Ancient wisdom meets modern life",
        culturalContext: "Universal spiritual practices",
      },
      {
        name: "Mental Reset: 5 min daily",
        description: "Quick stress relief for busy professionals",
        culturalContext: "Fast-paced lifestyle adaptation",
      },
    ],
    meditationStyles: [
      "Mindfulness Meditation",
      "Body Scan",
      "Loving-Kindness",
      "Breath Awareness",
      "Walking Meditation",
    ],
    soundscapes: [
      "Ocean Waves",
      "Forest Rain",
      "White Noise",
      "Binaural Beats",
      "Nature Sounds",
    ],
    visualThemes: {
      primary: "#4CB09A",
      secondary: "#F7D97E",
      accent: "#CFCFCF",
    },
  },
  "pt-BR": {
    dailyPractice: {
      title: "Meditação de 1 Minuto",
      description: "Feche os olhos... Respire fundo... Solte lentamente... Um minuto é o suficiente para recomeçar.",
      duration: "1 min",
    },
    specialPrograms: [
      {
        name: "21 dias para Ansiedade Zero",
        description: "Programa de mindfulness baseado em ciência",
        culturalContext: "Adaptado para cultura brasileira",
      },
      {
        name: "Sono Profundo em 14 dias",
        description: "Técnicas de otimização do sono",
        culturalContext: "Foco em rotina e bem-estar",
      },
      {
        name: "Equilíbrio com Mantras",
        description: "Sabedoria ancestral encontra vida moderna",
        culturalContext: "Práticas espirituais universais",
      },
      {
        name: "Reset Mental: 5 min por dia",
        description: "Alívio rápido do estresse para profissionais ocupados",
        culturalContext: "Adaptação ao ritmo acelerado",
      },
    ],
    meditationStyles: [
      "Meditação Mindfulness",
      "Escaneamento Corporal",
      "Bondade Amorosa",
      "Consciência da Respiração",
      "Meditação Caminhando",
    ],
    soundscapes: [
      "Ondas do Mar",
      "Chuva na Floresta",
      "Ruído Branco",
      "Batidas Binaurais",
      "Sons da Natureza",
    ],
    visualThemes: {
      primary: "#4CB09A",
      secondary: "#F7D97E",
      accent: "#CFCFCF",
    },
  },
  hi: {
    dailyPractice: {
      title: "1 मिनट का ध्यान",
      description: "अपनी आँखें बंद करें... गहरी सांस लें... धीरे-धीरे छोड़ें... फिर से शुरू करने के लिए एक मिनट काफी है।",
      duration: "1 मिनट",
    },
    specialPrograms: [
      {
        name: "21 दिन में शून्य चिंता",
        description: "योग और आयुर्वेद आधारित कार्यक्रम",
        culturalContext: "भारतीय परंपरा के साथ एकीकृत",
      },
      {
        name: "14 दिन में गहरी नींद",
        description: "प्राचीन नींद तकनीक",
        culturalContext: "आयुर्वेदिक दृष्टिकोण",
      },
      {
        name: "मंत्रों के साथ संतुलन",
        description: "वैदिक मंत्र और आधुनिक जीवन",
        culturalContext: "पारंपरिक भारतीय अभ्यास",
      },
      {
        name: "मानसिक रीसेट: दैनिक 5 मिनट",
        description: "व्यस्त जीवन के लिए त्वरित तनाव राहत",
        culturalContext: "आधुनिक भारतीय जीवनशैली",
      },
    ],
    meditationStyles: [
      "विपश्यना ध्यान",
      "योग निद्रा",
      "मंत्र ध्यान",
      "प्राणायाम",
      "चक्र ध्यान",
    ],
    soundscapes: [
      "ओम मंत्र",
      "मंदिर की घंटियाँ",
      "वर्षा की आवाज़",
      "बांसुरी संगीत",
      "वैदिक मंत्र",
    ],
    visualThemes: {
      primary: "#FF9933", // Saffron
      secondary: "#138808", // Green
      accent: "#000080", // Navy Blue
    },
  },
  id: {
    dailyPractice: {
      title: "Meditasi 1 Menit",
      description: "Pejamkan mata Anda... Tarik napas dalam-dalam... Lepaskan perlahan... Satu menit cukup untuk memulai kembali.",
      duration: "1 menit",
    },
    specialPrograms: [
      {
        name: "21 Hari Menuju Kecemasan Nol",
        description: "Program mindfulness berbasis sains",
        culturalContext: "Disesuaikan dengan budaya Indonesia",
      },
      {
        name: "Tidur Nyenyak dalam 14 Hari",
        description: "Teknik optimasi tidur",
        culturalContext: "Pendekatan holistik",
      },
      {
        name: "Keseimbangan dengan Mantra",
        description: "Kebijaksanaan kuno bertemu kehidupan modern",
        culturalContext: "Praktik spiritual universal",
      },
      {
        name: "Reset Mental: 5 menit sehari",
        description: "Pereda stres cepat untuk profesional sibuk",
        culturalContext: "Adaptasi gaya hidup cepat",
      },
    ],
    meditationStyles: [
      "Meditasi Mindfulness",
      "Pemindaian Tubuh",
      "Meditasi Kasih Sayang",
      "Kesadaran Napas",
      "Meditasi Berjalan",
    ],
    soundscapes: [
      "Ombak Laut",
      "Hujan Hutan",
      "Suara Gamelan",
      "Suara Alam",
      "Musik Tradisional",
    ],
    visualThemes: {
      primary: "#4CB09A",
      secondary: "#F7D97E",
      accent: "#DC143C", // Merah Putih inspiration
    },
  },
  zh: {
    dailyPractice: {
      title: "1分钟冥想",
      description: "闭上眼睛...深呼吸...慢慢释放...一分钟足以重新开始。",
      duration: "1分钟",
    },
    specialPrograms: [
      {
        name: "21天零焦虑",
        description: "结合中医和现代科学",
        culturalContext: "融合传统中医智慧",
      },
      {
        name: "14天深度睡眠",
        description: "睡眠优化技术",
        culturalContext: "中医养生方法",
      },
      {
        name: "咒语平衡",
        description: "古老智慧遇见现代生活",
        culturalContext: "道家和佛教实践",
      },
      {
        name: "心理重置：每天5分钟",
        description: "忙碌专业人士的快速减压",
        culturalContext: "现代生活节奏适应",
      },
    ],
    meditationStyles: [
      "正念冥想",
      "气功冥想",
      "禅修",
      "太极冥想",
      "呼吸觉知",
    ],
    soundscapes: [
      "古筝音乐",
      "竹林风声",
      "寺庙钟声",
      "流水声",
      "传统音乐",
    ],
    visualThemes: {
      primary: "#DC143C", // Chinese Red
      secondary: "#FFD700", // Gold
      accent: "#000000", // Black
    },
  },
  th: {
    dailyPractice: {
      title: "สมาธิ 1 นาที",
      description: "หลับตา... หายใจเข้าลึกๆ... ปล่อยออกช้าๆ... หนึ่งนาทีก็เพียงพอที่จะเริ่มต้นใหม่",
      duration: "1 นาที",
    },
    specialPrograms: [
      {
        name: "21 วันสู่ความวิตกกังวลศูนย์",
        description: "โปรแกรมสติตามหลักพุทธศาสนา",
        culturalContext: "ผสมผสานปรัชญาพุทธ",
      },
      {
        name: "นอนหลับลึกใน 14 วัน",
        description: "เทคนิคการนอนหลับที่ดีที่สุด",
        culturalContext: "แนวทางองค์รวม",
      },
      {
        name: "สมดุลด้วยมนต์",
        description: "ภูมิปัญญาโบราณพบกับชีวิตสมัยใหม่",
        culturalContext: "การปฏิบัติทางจิตวิญญาณสากล",
      },
      {
        name: "รีเซ็ตจิตใจ: 5 นาทีต่อวัน",
        description: "บรรเทาความเครียดอย่างรวดเร็วสำหรับมืออาชีพที่ยุ่ง",
        culturalContext: "การปรับตัวกับวิถีชีวิตที่รวดเร็ว",
      },
    ],
    meditationStyles: [
      "สมาธิวิปัสสนา",
      "สมาธิเมตตา",
      "สมาธิลมหายใจ",
      "สมาธิเดิน",
      "สมาธิพุทธ",
    ],
    soundscapes: [
      "เสียงระฆังวัด",
      "เสียงธรรมชาติ",
      "เสียงน้ำไหล",
      "ดนตรีไทยดั้งเดิม",
      "เสียงสวดมนต์",
    ],
    visualThemes: {
      primary: "#0000CD", // Thai Blue
      secondary: "#FFD700", // Gold
      accent: "#DC143C", // Red
    },
  },
};

export function getCulturalContent(lang: Language): CulturalContent {
  return culturalContent[lang] || culturalContent.en;
}
