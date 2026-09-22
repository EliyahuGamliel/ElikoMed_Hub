import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// הגדרות למובייל - חוסם זום כדי לתת תחושה של אפליקציה טבעית
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1120" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// הגדרות SEO ושם הפלטפורמה
export const metadata: Metadata = {
  title: "ElikoMed | רפואה העברית",
  description: "האתר הראשי לכלי העזר לסטודנט לרפואה מבית ElikoMed.",
  appleWebApp: {
    title: "ElikoMed",
    statusBarStyle: "default",
    capable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}