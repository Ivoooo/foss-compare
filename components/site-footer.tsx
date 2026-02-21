import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="py-6 md:py-0 border-t border-border/40 bg-muted/20">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with care. The source code is available on{" "}
          <Link
            href="https://github.com/Ivoooo/foss-compare"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
          >
            GitHub
          </Link>
          .
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="#" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
