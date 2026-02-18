import { Footer } from "@/components/footer";
import { LandingPageHeader } from "@/components/landing-page-header";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#B9CED6]">
      <LandingPageHeader
        items={[
          { title: "Home", href: "/" },
          { title: "Why Titan", href: "/#why-titan" },
          { title: "About Us", href: "/storage-units-cookeville-tn" },
          { title: "Services", href: "/units" },
          { title: "Protection", href: "/tenant-insurance" },
          { title: "Reviews", href: "/#reviews" },
          { title: "Contact", href: "/#contact" },
        ]}
        heroId="hero"
        compact
      />
      <main className="flex-1 bg-[#B9CED6]">{props.children}</main>
      <Footer />
    </div>
  );
}
