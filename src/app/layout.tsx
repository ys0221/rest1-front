import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "사이트 A",
  description: "REST API 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
      // bg : 배경색 칠함, 빨간색
      // ! : 가장 우선적으로 적용(브라우저가 중요한 것이라고 판단)
        className={`${geistSans.variable} ${geistMono.variable} antialiased !bg-red-300`}
      >
        <header>
          <nav className="flex gap-4">
            <Link href="/">메인</Link>
            <Link href="/posts">글 목록</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>푸터</footer>
      </body>
    </html>
  );
}
