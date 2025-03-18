import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import './globalsResponsive.css'
import 'weather-icons/css/weather-icons.css'
import Menu from "@/components/Menu";
import PlayerWrapper from "@/components/PlayerWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Music-Weather",
  description: "날씨에 맞는 음악 추천",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Menu/>
        <main id="main">
          {children}
          <PlayerWrapper/>
        </main>
      </body>
    </html>
  );
}
