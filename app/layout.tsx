import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Provider } from "./provider";

export const metadata: Metadata = {
  title: {
    default: "Self Storage in Cookeville, TN | Climate-Controlled & Drive-Up Units",
    template: "%s | 360 Storage Solutions",
  },
  description:
    "Secure, local self storage in Cookeville, TN with climate-controlled and drive-up units, gated access, and friendly Middle Tennessee service.",
  keywords: [
    "Cookeville self storage",
    "Middle Tennessee storage units",
    "climate controlled storage Cookeville",
    "drive up storage units",
    "gated storage facility",
    "360 Storage Solutions",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Self Storage in Cookeville, TN | Climate-Controlled & Drive-Up Units",
    description:
      "Climate-controlled and drive-up storage units with gated access, 24/7 surveillance, and local support in Cookeville, Tennessee.",
    siteName: "360 Storage Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Self Storage in Cookeville, TN | Climate-Controlled & Drive-Up Units",
    description:
      "Reserve storage units online with secure access, cameras, and local support from 360 Storage Solutions in Cookeville, TN.",
  },
  category: "Real Estate",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17881731708"
          strategy="afterInteractive"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-17881731708');`}
        </Script>
      </head>
      <body className="font-sans">
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
