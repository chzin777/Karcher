import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Hydrate from "./_components/Hydrate/Hydrate";
import { Toaster } from "@/components/ui/sonner";
import GoogleAnalytics from "./_components/GoogleAnalytics";

// Importando Montserrat como fonte global
const montserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Limpeza Profissional | R3 Suprimentos",
  description: "Soluções de limpeza profissional para supermercados, centros logísticos e indústrias com equipamentos de alta performance.",
  keywords: ["limpeza profissional", "equipamentos de limpeza", "limpeza industrial", "suprimentos para limpeza", "R3 Suprimentos"],
  robots: "index, follow",
  authors: [{ name: "R3 Suprimentos", url: "https://r3suprimentos.com.br" }],
  openGraph: {
    title: "R3 Suprimentos | Limpeza Profissional de Alta Performance",
    description: "A R3 Suprimentos oferece soluções de limpeza profissional com economia e tecnologia para empresas.",
    url: "https://karcher-r3.com.br",
    siteName: "R3 Suprimentos",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Imagem de limpeza profissional"
      }
    ],
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserratSans.variable} font-sans antialiased text-foreground`}>
        <GoogleAnalytics />  {/* <<< Google Analytics inserido corretamente */}
        <Hydrate>
          {children}
          <Toaster />
        </Hydrate>
      </body>
    </html>
  );
}
