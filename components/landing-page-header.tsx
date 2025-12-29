"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import * as React from "react";
import { Logo } from "./logo";
import { Button, buttonVariants } from "./ui/button";

const PHONE_DISPLAY = "+1 (931) 209-4395";
const PHONE_LINK = "tel:+19312094395";

interface NavProps {
  heroId?: string;
  compact?: boolean;
  items?: {
    title: string;
    href: string;
    disabled?: boolean;
    external?: boolean;
  }[];
}

function MobileItems(props: NavProps & { showPayInHeader?: boolean }) {
  return (
    <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {props.items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
            >
              {item.title}
            </Link>
          ))}

          <div className="flex flex-col gap-2 mt-4">
            <Link
              href="/pay"
              className={cn(
                buttonVariants({ size: "lg" }),
                "transition-all duration-300 overflow-hidden",
                props.showPayInHeader
                  ? "opacity-100 translate-y-0 max-w-[260px] px-5"
                  : "opacity-0 -translate-y-2 pointer-events-none max-w-[0px] px-0"
              )}
            >
              Pay Online
            </Link>
            <Link
              href={PHONE_LINK}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {PHONE_DISPLAY}
            </Link>
          </div>

        </nav>
      </div>
    </div>
  );
}

function DesktopItems(props: NavProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="hidden gap-6 md:flex">
      {props.items?.map((item, index) => (
        <Link
          key={index}
          href={item.disabled ? "#" : item.href}
          className={cn(
            "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
            item.href.startsWith(`/${segment}`)
              ? "text-foreground"
              : "text-foreground/60",
            item.disabled && "cursor-not-allowed opacity-80"
          )}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export function LandingPageHeader(props: NavProps) {
  const headerRef = React.useRef<HTMLElement | null>(null);
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  const [showPayInHeader, setShowPayInHeader] = React.useState<boolean>(!props.heroId);

  React.useEffect(() => {
    if (!props.heroId) {
      setShowPayInHeader(true);
      return;
    }

    const heroId = props.heroId.replace(/^#/, "");
    const heroEl = document.getElementById(heroId);

    if (!heroEl) {
      setShowPayInHeader(true);
      return;
    }

    let frame = 0;
    const update = () => {
      const rect = heroEl.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const heroTop = rect.top + scrollY;
      const heroBottom = heroTop + rect.height;
      const currentHeaderHeight =
        headerRef.current?.getBoundingClientRect().height ?? 0;
      const viewportOffset = currentHeaderHeight + 8;
      const scrollThreshold = heroBottom - currentHeaderHeight - 8;
      const isPastByViewport = rect.bottom <= viewportOffset;
      const isPastByScroll = scrollY >= scrollThreshold;
      const isPastHero = isPastByViewport || isPastByScroll;
      setShowPayInHeader(isPastHero);
    };

    const recalcAndUpdate = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", recalcAndUpdate, { passive: true });
    window.addEventListener("resize", recalcAndUpdate);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", recalcAndUpdate);
      window.removeEventListener("resize", recalcAndUpdate);
    };
  }, [props.heroId]);

  return (
    <header
      ref={headerRef}
      className="fixed w-full z-40 bg-slate-100/60 px-4 md:px-8 backdrop-blur"
      style={{ top: "var(--promo-banner-offset, 0px)" }}
    >
      <div
        className={cn(
          "flex items-center justify-between py-2 md:py-2 min-h-[90px]",
          props.compact && "py-1 md:py-1 min-h-[72px]"
        )}
      >
        <div className="flex items-center gap-4 md:gap-10">
          <Logo className="hidden md:flex" variant="horizontal" />

          {props.items?.length ? <DesktopItems items={props.items} /> : null}

          <Button
            className="space-x-2 md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

          <Logo className="md:hidden" variant="mark" />

          {showMobileMenu && props.items && (
            <MobileItems items={props.items} showPayInHeader={showPayInHeader} />
          )}
        </div>

        <div className="flex gap-4 items-center">
          <Link
            href="/pay"
            className={cn(
              buttonVariants({
                size: "lg",
                className: "transition-all duration-300 overflow-hidden",
              }),
              showPayInHeader
                ? "opacity-100 translate-y-0 max-w-[260px] px-5"
                : "opacity-0 -translate-y-2 pointer-events-none max-w-[0px] px-0"
            )}
          >
            Pay Online
          </Link>
          <Link
            href={PHONE_LINK}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Call us
          </Link>
        </div>
      </div>
    </header>
  );
}
