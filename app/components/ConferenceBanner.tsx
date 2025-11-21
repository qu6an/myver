// React + TypeScript + Tailwind + Framer Motion + Custom Hooks
// Универсальный компонент, оптимизированный под Next.js / Remix / Vite / React Native Web

import React from "react";
import { motion } from "framer-motion";

/* ==========================
   🔧 Custom Hooks
   ========================== */

// ✨ Hook: плавное изменение масштаба (twinkle)
export const useTwinkle = (selector: string) => {
  React.useEffect(() => {
    const dots = document.querySelectorAll(selector);

    dots.forEach((dot) => {
      let scale = 1;
      let direction = 1;

      const animate = () => {
        scale += direction * 0.01;
        if (scale > 1.5) direction = -1;
        if (scale < 1) direction = 1;
        (dot as HTMLElement).style.transform = `scale(${scale})`;
        requestAnimationFrame(animate);
      };

      animate();
    });
  }, [selector]);
};

// ✨ Hook: открыть Google Calendar
export const useCalendar = () => {
 return React.useCallback(() => {
   const url =
     "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" +
     encodeURIComponent("Онлайн-конференция АВТОСЕРВИС 2026") +
     "&dates=20251225T10000/20251225T18000" +
     "&details=" +
     encodeURIComponent(
       "Крупнейшее отраслевое событие года. Темы: Аналитика, Юридические, Финансы, Маркировка."
     ) +
     "&location=" + encodeURIComponent("Онлайн") +
     "&ctz=Europe/Moscow";

   window.open(url, "_blank", "width=600,height=700");
 }, []);
};

/* ==========================
   ⚙️ Props
   ========================== */

interface Topic {
  icon: string;
  label: string;
}

interface ConferenceBannerProps {
  topics?: Topic[];
  date?: string;
  title?: string;
  subtitle?: string;
  registrationUrl?: string;
}

/* ==========================
   🌟 Default Props
   ========================== */

const defaultTopics = [
 { icon: "📊", label: "Аналитика" },
  { icon: "⚖️", label: "Юридические" },
 { icon: "💰", label: "Финансы" },
  { icon: "🏷️", label: "Маркировка" },
];

/* ==========================
   ⚛️ Component
   ========================== */

const ConferenceBanner: React.FC<ConferenceBannerProps> = ({
  topics = defaultTopics,
  date = "25 дек 2025",
  title = "АВТОСЕРВИС",
  subtitle = "2026",
  registrationUrl =
    "https://autocom.parts/events/autocom-avtoservis-2026.html",
}) => {
  useTwinkle(".twinkle-dot");
 const openCalendar = useCalendar();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-[250px] h-[500px] mx-auto rounded-2xl overflow-hidden shadow-2xl font-sans bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-5 flex flex-col"
    >
      {/* 🔥 Fading gradient background */}
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"
      />

      {/* Decorative shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-blue-50/5 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-xl"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="absolute -bottom-14 -left-14 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/5 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-xl"
      />

      {/* Twinkle dots */}
      <div className="twinkle-dot absolute top-1/4 right-[20%] w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_8px_2px_rgba(139,92,246,0.8)]" />
      <div className="twinkle-dot absolute top-[70%] right-[30%] w-[6px] h-[6px] bg-blue-300 rounded-full shadow-[0_0_6px_2px_rgba(96,165,250,0.6)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/40 px-3 py-1 rounded-full text-[10px] font-bold text-purple-300 backdrop-blur">
            <span className="w-1 h-1 bg-purple-300 rounded-full animate-ping" /> Онлайн
          </div>

          <h1 className="mt-3 font-extrabold text-2xl leading-tight bg-gradient-to-br from-white to-purple-300 bg-clip-text text-transparent">
            {title}
            <br />
            <span className="text-3xl bg-gradient-to-br from-blue-300 to-purple-400 bg-clip-text text-transparent">
              {subtitle}
            </span>
          </h1>

          <div className="flex items-center gap-2 text-blue-200 text-xs mt-2 font-semibold">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{date}</span>
          </div>
        </motion.div>

        {/* Topics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-2 my-4"
        >
          {topics.map((i) => (
            <motion.div
              key={i.label}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-500/20 to-blue-500/10 border border-purple-300/30 rounded-md p-2 flex flex-col items-center backdrop-blur"
            >
              <div className="text-xl">{i.icon}</div>
              <span className="text-[10px] text-blue-100 font-semibold text-center">
                {i.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-3"
        >
          <a
            href={registrationUrl}
            target="_blank"
            className="flex items-center justify-center gap-2 bg-gradient-to-br from-purple-50 to-indigo-500 text-white py-3 rounded-lg text-xs font-bold shadow-xl hover:-translate-y-1 transition-transform"
          >
            Зарегистрироваться
          </a>

          <button
            onClick={openCalendar}
            className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white py-2.5 rounded-lg text-xs font-semibold backdrop-blur hover:bg-white/20 transition"
          >
            В календарь
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ConferenceBanner;