import { Footer } from "@/components/footer";
import { LandingPageHeader } from "@/components/landing-page-header";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#B5D7E9]">
      <LandingPageHeader
        items={[
          { title: "Home", href: "/" },
          { title: "Why 360", href: "/#why-360" },
          { title: "Storage", href: "/#services" },
          { title: "Units", href: "/units" },
          { title: "Size guide", href: "/size-guide" },
          { title: "Tennant Insurance", href: "/tennant-insurance" },
          { title: "Reviews", href: "/#reviews" },
          { title: "FAQ", href: "/#faq" },
          { title: "Contact", href: "/#contact" },
        ]}
        compact
      />
      <main className="flex-1 bg-[#B5D7E9]">{props.children}</main>
      <Footer />
    </div>
  );
}
