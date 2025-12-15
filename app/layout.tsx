import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "360 Storage Solutions | Secure Self Storage in Cookeville, TN",
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
    title: "360 Storage Solutions | Secure Self Storage in Cookeville, TN",
    description:
      "Climate-controlled and drive-up storage units with gated access, 24/7 surveillance, and local support in Cookeville, Tennessee.",
    siteName: "360 Storage Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "360 Storage Solutions | Secure Self Storage in Cookeville, TN",
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
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
