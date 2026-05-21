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
  metadataBase: new URL("https://spb-guide.vercel.app"),
  title: "Смотреть Питер",
  description:
    "Личная подборка проверенных мест в Питере: поесть, выпить, посмотреть и немного выдохнуть.",
  openGraph: {
    title: "Смотреть Питер",
    description:
      "Личная подборка проверенных мест в Питере: поесть, выпить, посмотреть и немного выдохнуть.",
    url: "https://spb-guide.vercel.app",
    siteName: "Смотреть Питер",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Смотреть Питер",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Смотреть Питер",
    description:
      "Личная подборка проверенных мест в Питере: поесть, выпить, посмотреть и немного выдохнуть.",
    images: ["/opengraph-image.png"],
  },
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
