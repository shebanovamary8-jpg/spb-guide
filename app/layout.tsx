import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const nkDuyMono = localFont({
  src: "./font/NKDuyMono-Regular.woff2",
  weight: "400",
  variable: "--font-main",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Смотреть Питер — подборка мест",
  description:
    "Личная подборка мест в Санкт-Петербурге от Маруси: поесть, выпить, посмотреть и расслабиться.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${nkDuyMono.variable} h-full antialiased`}>
      <body className={`${nkDuyMono.className} flex min-h-full flex-col`}>
        {children}
      </body>
    </html>
  );
}
