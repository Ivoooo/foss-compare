import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export function SiteHeader() {
  return (
    <header className="z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 transition-opacity hover:opacity-80">
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              foss.compare
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-1">
            <Link
              href="https://github.com/Ivoooo/foss-compare"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
