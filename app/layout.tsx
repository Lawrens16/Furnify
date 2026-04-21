import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Furnify - Modern Furniture",
  description: "Discover your perfect space with Furnify.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interSans.variable} font-sans antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#e8e7e3] text-gray-900">{children}</body>
    </html>
  );
}
