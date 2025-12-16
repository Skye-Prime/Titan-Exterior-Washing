export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold">360 Storage Solutions</p>
          <p className="text-sm text-muted-foreground">
            Local and reliable self storage serving Middle Tennessee since 2016.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Call now for more information and to reserve your space.
          <br />
          <span className="text-foreground font-semibold">+1 (931) 209-4395</span>
        </p>
      </div>
    </footer>
  );
}
