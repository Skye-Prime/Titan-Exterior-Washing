import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

export function Hero(props: {
  capsuleText: string;
  capsuleLink: string;
  title: string;
  subtitle: string;
  credits?: React.ReactNode;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
  imagePriority?: boolean;
  }) {
  return (
    <section className="py-32 md:py-40 lg:py-48">
      <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl">
            {props.title}
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {props.subtitle}
          </p>
          <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
            <Link
              href={props.primaryCtaLink}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              {props.primaryCtaText}
            </Link>

            <Link
              href={props.secondaryCtaLink}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              {props.secondaryCtaText}
            </Link>
          </div>

          {props.credits && (
            <p className="text-sm text-muted-foreground mt-2">
              {props.credits}
            </p>
          )}
        </div>

        {props.imageSrc && (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border bg-muted shadow-xl">
            <Image
              src={props.imageSrc}
              alt={props.imageAlt ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={props.imagePriority}
            />
          </div>
        )}
      </div>
    </section>
  );
}
