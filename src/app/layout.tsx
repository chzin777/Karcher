import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Hydrate from "./_components/Hydrate/Hydrate";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next"

// Importando Montserrat como fonte global
const montserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Conheça os Produtos da Karcher",
  description: "Criado por R3 Tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserratSans.variable} font-sans antialiased bg-background text-foreground`}>
        <Hydrate>
          {children}
          <Toaster />
        </Hydrate>
      </body>
    </html>
  );
}
