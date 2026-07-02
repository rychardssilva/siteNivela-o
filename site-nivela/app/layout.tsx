import type { Metadata } from "next";
import "./globals.css";

import "@/styles/header.css";
import "@/styles/footer.css";
import "@/styles/home.css";
import "@/styles/about.css";
import "@/styles/services.css";
import "@/styles/blog.css";
import "@/styles/contact.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nivela | Território & Patrimônio",
  description:
    "Agrimensura, cartografia, topografia e regularização fundiária com responsabilidade técnica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="site-wrapper">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
