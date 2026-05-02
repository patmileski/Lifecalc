// pages/_document.jsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />

        {/* Favicon — replace with your actual favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* 
          ════════════════════════════════════════════════════
          GOOGLE ADSENSE — ACTIVATION INSTRUCTIONS:
          1. Replace 'ca-pub-3628048404116197' below with your real Publisher ID
          2. Uncomment the <script> tag
          3. Also update components/ads/AdSlot.jsx with your Publisher ID and slot IDs
          4. Submit your site for review at https://adsense.google.com
          ════════════════════════════════════════════════════
        */}
        {/* 
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3628048404116197"
          crossOrigin="anonymous"
        />
        */}

        {/* Google Analytics — replace G-XXXXXXXXXX with your Measurement ID */}
        {/* 
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `
        }} />
        */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
