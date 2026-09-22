"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Home, ArrowRight, ArrowLeft, Layers } from 'lucide-react';

function SplashScreen({ fading }: { fading: boolean }) {
  return (
    <div 
      dir="rtl" 
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0B1120] transition-opacity duration-700 ease-in-out font-sans antialiased ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes heartbeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.05); }
          28% { transform: scale(1); }
          42% { transform: scale(1.05); }
          70% { transform: scale(1); }
        }
        .animate-heartbeat { animation: heartbeat 2s infinite; }
      `}} />
      <div className="flex flex-col items-center justify-center relative -translate-y-20 sm:-translate-y-24">
        <div className="absolute w-[250%] h-[250%] bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] rounded-full animate-pulse pointer-events-none"></div>
        <div className="animate-in fade-in zoom-in-95 duration-1000 flex flex-col items-center relative z-10">
          <svg className="w-24 h-10 text-blue-500 mb-2 opacity-80" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 0 15 L 30 15 L 40 5 L 50 25 L 60 15 L 100 15" strokeDasharray="100" strokeDashoffset="0" className="animate-[pulse_2s_ease-in-out_infinite]" />
          </svg>
          <h1 className="text-6xl sm:text-7xl font-black tracking-tighter flex mb-1 drop-shadow-lg dark:drop-shadow-2xl animate-heartbeat" dir="ltr">
            <span className="text-slate-800 dark:text-white">Eliko</span>
            <span className="text-indigo-500 dark:text-indigo-400">M</span>
            <span className="text-blue-600 dark:text-blue-500">ed</span>
          </h1>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-3 opacity-80"></div>
        </div>
      </div>
    </div>
  );
}

export default function AppLauncher() {
  const [darkMode, setDarkMode] = useState(false);
  const [splashState, setSplashState] = useState("visible"); 
  const [minTimePassed, setMinTimePassed] = useState(false);
  
  // ניהול האפליקציה הפתוחה
  const [activeApp, setActiveApp] = useState<{ id: string; url: string; name: string } | null>(null);
  
  // הגדרות הסרגל הצדדי המרחף
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarSide, setSidebarSide] = useState<'left' | 'right'>('right');

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimePassed(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (minTimePassed) {
      setSplashState("fading");
      setTimeout(() => setSplashState("hidden"), 800);
    }
  }, [minTimePassed]);

  useEffect(() => {
    const handlePopState = () => {
      setActiveApp(null);
      setIsSidebarOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  const openApp = (id: string, url: string, name: string) => {
    if (activeApp) {
      // אם אנחנו כבר בתוך אפליקציה ועוברים לאחרת - נחליף את המצב (Replace)
      window.history.replaceState({ app: id }, '', `#${id}`);
    } else {
      // אם פתחנו ממסך הבית - נוסיף מצב חדש (Push)
      window.history.pushState({ app: id }, '', `#${id}`);
    }
    setActiveApp({ id, url, name });
    setIsSidebarOpen(false);
  };

  const goHome = () => {
    setActiveApp(null);
    setIsSidebarOpen(false);
    // דוחף מצב "נקי" להיסטוריה כדי שה-URL יחזור להיות רגיל בלי ה-#
    window.history.pushState(null, '', window.location.pathname);
  };

  const apps = [
    { id: 'examed', name: 'ExaMed', url: 'https://elikomed.web.app/', imageSrc: '/ExaMed.png' },
    { id: 'algorithmed', name: 'AlgorithMed', url: 'https://algorith-med.vercel.app/', imageSrc: '/AlgorithMed.png' },
    { id: 'teamed', name: 'TeaMed', url: 'https://tea-med.vercel.app/', imageSrc: '/TeaMed.png' }
  ];

  // תצוגת האפליקציה במסך מלא עם הסרגל המרחף
  if (activeApp) {
    return (
      <div className="fixed inset-0 z-[100000] bg-white dark:bg-[#0B1120] overflow-hidden">
        
        {/* לשונית צדדית (ידית) שמרחפת באמצע הגבול של המסך */}
        <button 
          onClick={() => setIsSidebarOpen(true)} 
          className={`absolute top-1/2 -translate-y-1/2 ${
            sidebarSide === 'right' ? 'right-0 rounded-l-xl border-l border-y' : 'left-0 rounded-r-xl border-r border-y'
          } z-[100001] bg-slate-900/30 hover:bg-slate-900/70 dark:bg-white/10 dark:hover:bg-white/30 text-white backdrop-blur-md px-1.5 py-6 shadow-lg flex items-center justify-center transition-all duration-300 border-white/20 ${
            isSidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          title="פתח תפריט"
        >
          {sidebarSide === 'right' ? (
            <ArrowLeft className="w-5 h-5 opacity-80" />
          ) : (
            <ArrowRight className="w-5 h-5 opacity-80" />
          )}
        </button>

        {/* רקע כהה בלחיצה שסוגר את הסרגל */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm z-[100002] transition-opacity"
          />
        )}

        {/* הסרגל הצדדי (Sidebar) מופיע מעל הכל */}
        <aside className={`absolute top-0 bottom-0 ${
          sidebarSide === 'right' ? 'right-0 border-l' : 'left-0 border-r'
        } w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-slate-200 dark:border-slate-800 z-[100003] p-6 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : (sidebarSide === 'right' ? 'translate-x-full' : '-translate-x-full')
        }`}>
          
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-black text-lg tracking-tight text-slate-800 dark:text-white" dir="ltr">
              Eliko<span className="text-blue-600">Med</span>
            </h3>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-white transition"
            >
              {sidebarSide === 'right' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex-grow py-6 flex flex-col gap-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">ניווט מהיר</p>
            
            {/* כפתור חזרה למסך הראשי */}
            <button 
              onClick={goHome} // <--- השינוי נמצא כאן
              className="flex items-center gap-3 w-full p-3.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold text-sm transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/50"
            >
              <Home className="w-5 h-5" />
              <span>חזרה למסך הבית</span>
            </button>

            <div className="my-3 border-t border-slate-100 dark:border-slate-800" />
            
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">מעבר ישיר ליישום</p>
            {apps.map(app => (
              app.id !== activeApp.id && (
                <button
                  key={app.id}
                  onClick={() => openApp(app.id, app.url, app.name)}
                  className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-sm transition-colors"
                >
                  <Layers className="w-4 h-4 text-slate-400" />
                  <span>{app.name}</span>
                </button>
              )
            ))}
          </div>

          {/* הגדרות בתחתית */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setSidebarSide(sidebarSide === 'right' ? 'left' : 'right')}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 transition"
            >
              העבר לשמאל / ימין
            </button>
            <button 
              onClick={toggleDarkMode} 
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-amber-400 hover:scale-105 transition"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </aside>

        <iframe 
          src={activeApp.url} 
          className="w-full h-full border-none"
          title={activeApp.id}
          allow="fullscreen"
        />
      </div>
    );
  }

  // מסך הבית
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 flex flex-col relative" dir="rtl">
      
      {splashState !== "hidden" && <SplashScreen fading={splashState === "fading"} />}

      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 px-5 sm:px-8 py-3.5 flex justify-between items-center h-[72px] shrink-0">
        <div className="flex items-center gap-4 w-1/3">
           <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200/50 dark:border-slate-700/50">
             <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
             <span>מחזור ט״ו צמרת👑</span>
           </span>
        </div>

        <div className="flex justify-center w-1/3">
          <h1 className="text-2xl font-black tracking-tight flex" dir="ltr">
            <span className="text-slate-800 dark:text-white">Eliko</span>
            <span className="text-indigo-500 dark:text-indigo-400">M</span>
            <span className="text-blue-600 dark:text-blue-500">ed</span>
          </h1>
        </div>

        <div className="flex items-center justify-end w-1/3">
          <button 
            onClick={toggleDarkMode} 
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-amber-400 hover:scale-110 transition-all border border-slate-200/50 dark:border-slate-700/50" 
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-6 w-full animate-in fade-in zoom-in-95 duration-1000">
        <div className="grid grid-cols-2 gap-8 md:gap-12 max-w-sm mx-auto mt-[-8vh] justify-items-center">
          {apps.map((app) => (
            <button 
              key={app.id}
              onClick={() => openApp(app.id, app.url, app.name)}
              className="group flex flex-col items-center gap-3 w-[100px] md:w-[120px] active:scale-95 transition-transform duration-200"
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-[1.4rem] md:rounded-[1.7rem] bg-white dark:bg-slate-800 flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-slate-100 dark:border-slate-700">
                <img src={app.imageSrc} alt={app.name} className="w-full h-full object-cover" />
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none"></div>
              </div>
              <span className="text-slate-700 dark:text-slate-200 font-bold text-sm md:text-base tracking-wide text-center" dir="ltr">
                {app.name}
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}