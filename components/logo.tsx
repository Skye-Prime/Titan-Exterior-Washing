import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import logoHorizontal from "@/assets/360 logo - Horizontal.png";
import logoVertical from "@/assets/360 logo - Vertical.png";
import logoMark from "@/assets/360 logo.png";

type LogoProps = {
  className?: string;
  link?: string;
  variant?: "horizontal" | "vertical" | "mark";
};

export function Logo({ className, link, variant = "horizontal" }: LogoProps) {
  const src =
    variant === "vertical"
      ? logoVertical
      : variant === "mark"
        ? logoMark
        : logoHorizontal;

  const dimensions =
    variant === "vertical"
      ? { width: 200, height: 300 }
      : variant === "mark"
        ? { width: 180, height: 180 }
        : { width: 300, height: 200 };

  return (
    <Link
      href={link ?? "/"}
      className={cn("flex items-center", className)}
      aria-label="360 Storage Solutions"
    >
      <Image
        src={src}
        alt="360 Storage Solutions logo"
        {...dimensions}
        priority
        className="h-16 w-auto md:h-20 drop-shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
        sizes="(max-width: 768px) 200px, 260px"
      />
      <span className="sr-only">360 Storage Solutions</span>
    </Link>
  );
}
