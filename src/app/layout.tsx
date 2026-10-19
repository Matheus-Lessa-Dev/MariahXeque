import type { Metadata } from "next";
import { site } from "@/config/site";
import "./globals.css";
import { PageEffects } from "@/components/page-effects";

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.description,
  // Base local explícita de revisão; não é uma URL canônica de publicação.
  metadataBase: new URL(site.seo.siteUrl || "http://localhost:3000"),
  alternates: site.seo.siteUrl ? { canonical: site.seo.siteUrl } : undefined,
  robots: { index: site.seo.indexable, follow: site.seo.indexable },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.brand,
    title: site.seo.title,
    description: site.description,
    url: site.seo.siteUrl || undefined,
    images: [{ url: site.seo.shareImage, width: 1200, height: 630, alt: site.seo.shareImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.description,
    images: [{ url: site.seo.shareImage, alt: site.seo.shareImageAlt }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" data-scroll-behavior="smooth"><body><a className="skip-link" href="#conteudo">Pular para o conteúdo</a>{children}<PageEffects /><noscript><style>{`.courses-arrow, .combo-arrow, .carousel-mobile-controls, .courses-footer, .combo-bottom, .atelier-orders__controls, .atelier-orders__catalog-footer { display: none !important; } .courses-track, .combo-track, .atelier-orders__viewport { scrollbar-width: auto; }`}</style></noscript></body></html>;
}
