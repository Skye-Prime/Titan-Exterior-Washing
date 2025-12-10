import { Footer } from "@/components/footer";
import { LandingPageHeader } from "@/components/landing-page-header";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingPageHeader
        items={[
          { title: "Home", href: "/" },
          { title: "Why 360", href: "/#why-360" },
          { title: "Units", href: "/units" },
          { title: "Contact", href: "/#contact" },
        ]}
      />
      <main className="flex-1">{props.children}</main>
      <Footer />
    </div>
  );
}
