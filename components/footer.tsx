import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold">Titan Exterior Washing</p>
          <p className="text-sm text-muted-foreground">
            Exterior cleaning and property protection for homes and businesses across Middle Tennessee.
          </p>
          <Link
            href="/storage-units-cookeville-tn"
            className="text-sm font-semibold text-primary underline underline-offset-4"
          >
            Cookeville service area
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          Tell us what you need cleaned and when.
          <br />
          <span className="text-foreground font-semibold">(931) 316-9839</span>
        </p>
      </div>
    </footer>
  );
}
