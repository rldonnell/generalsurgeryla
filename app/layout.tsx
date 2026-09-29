import type { Metadata, Viewport } from 'next';
import { Newsreader, Public_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CallBar from '@/components/CallBar';
import JsonLd from '@/components/JsonLd';
import { getProcedures, settings as s } from '@/lib/content';
import { siteGraph } from '@/lib/schema';

const newsreader = Newsreader({ subsets: ['latin'], weight: ['400', '500'], style: ['normal'], variable: '--font-newsreader', display: 'swap', adjustFontFallback: false });
const publicSans = Public_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-public', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(s.baseUrl),
  title: { default: `General Surgeon in Los Angeles | ${s.doctor.name}`, template: `%s` },
  description: 'Minimally invasive hernia, gallbladder, reflux and appendix surgery in Century City, Los Angeles with board-certified general surgeon Dr. Babak Moein, MD, FACS.',
  openGraph: { siteName: s.siteName, locale: 'en_US', type: 'website', images: [{ url: s.doctor.photo, width: 500, height: 496, alt: s.doctor.name }] },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  verification: { google: 'QNO_Z-mMu49skem2v5GjTHk-1YIVJ0hmgDjm-o4_yvg' },
  icons: { icon: '/icon.svg' },
};

export const viewport: Viewport = { themeColor: '#123f3b', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${newsreader.variable} ${publicSans.variable}`}>
      <head>
        <JsonLd data={siteGraph(getProcedures())} />
      </head>
      <body>
        {s.gtmId && (
          <>
            <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${s.gtmId}');`}</Script>
            <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${s.gtmId}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} /></noscript>
          </>
        )}
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CallBar />
      </body>
    </html>
  );
}
