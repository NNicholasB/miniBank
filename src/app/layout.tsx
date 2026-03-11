import type { Metadata } from "next";
import {  Geist_Mono,Lato } from "next/font/google";
import "./globals.css";


const LatoS=Lato({
  variable:"--font-lato-sans",
  subsets:["latin"],
  weight:"400"
})
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MiniBank",
  description: "Sistema de emprestimos e pagamentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${LatoS.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
