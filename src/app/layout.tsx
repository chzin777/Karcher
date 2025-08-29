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
  title: "Higiene profissional | R3 Suprimentos",
  description: "Soluções de limpeza profissional para supermercados, centros logísticos e indústrias com equipamentos de alta performance.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    type: "website",
    url: "https://www.karcher-r3.com.br/",
    title: "Higiene profissional | R3 Suprimentos",
    description: "Soluções de limpeza profissional para supermercados, centros logísticos e indústrias com equipamentos de alta performance.",
    images: [
      {
        url: "https://metatags.io/images/meta-tags.png", // Substitua por uma imagem sua depois
        width: 1200,
        height: 630,
        alt: "Higiene profissional - R3 Suprimentos"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Higiene profissional | R3 Suprimentos",
    description: "Soluções de limpeza profissional para supermercados, centros logísticos e indústrias com equipamentos de alta performance.",
    images: ["https://metatags.io/images/meta-tags.png"] // Substitua por uma imagem sua depois
  }
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
