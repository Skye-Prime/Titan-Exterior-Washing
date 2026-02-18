import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Provider } from "./provider";

export const metadata: Metadata = {
  title: {
    default: "Exterior Washing in Cookeville, TN | Homes, Driveways, and Commercial Properties",
    template: "%s | Titan Exterior Washing",
  },
  description:
    "Professional exterior washing in Cookeville, TN with dependable scheduling, surface-safe methods, and protection-first service.",
  keywords: [
    "Cookeville exterior washing",
    "house washing Cookeville TN",
    "driveway cleaning Cookeville",
    "commercial exterior cleaning",
    "property protection cleaning",
    "Titan Exterior Washing",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Exterior Washing in Cookeville, TN | Homes, Driveways, and Commercial Properties",
    description:
      "Get exterior washing service built around your schedule, your standards, and your property priorities in Cookeville, Tennessee.",
    siteName: "Titan Exterior Washing",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exterior Washing in Cookeville, TN | Homes, Driveways, and Commercial Properties",
    description:
      "Book exterior washing with local professionals focused on clean results, protected surfaces, and clear communication.",
  },
  category: "Home Services",
  icons: {
    icon: "/icon.png",
  },
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.titanexteriorwashing.com";
const ENABLE_ANALYTICS = process.env.NODE_ENV === "production";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Titan Exterior Washing",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: new URL("/icon.png", SITE_URL).toString(),
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Titan Exterior Washing",
  url: SITE_URL,
  author: {
    "@type": "Organization",
    name: "Titan Exterior Washing",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "Titan Exterior Washing",
    url: SITE_URL,
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
        <script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        {ENABLE_ANALYTICS ? (
          <>
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
          </>
        ) : null}
      </head>
      <body className="font-sans">
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
