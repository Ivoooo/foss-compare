"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { categories } from "@/lib/categories";
import { Input } from "@/components/ui/input";

export default function Home() {
  const categoriesRef = useRef<HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredCategories = categories.filter((category) => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    const titleMatch = category.title.toLowerCase().includes(lowerQuery);
    const toolMatch = category.data.some((tool) =>
      tool.name.toLowerCase().includes(lowerQuery)
    );
    return titleMatch || toolMatch;
  });

  return (
    <>
      <section className="relative overflow-hidden bg-background pt-16 md:pt-20 lg:pt-32 pb-16 md:pb-24 lg:pb-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50" />
        <div className="container flex flex-col items-center text-center gap-6 md:gap-8">
          <Badge variant="outline" className="rounded-full px-4 py-1.5 text-sm font-medium border-primary/20 bg-primary/5 text-primary backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Open Source & Self-Hosted
          </Badge>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            Find the Perfect <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Self-Hosted Solution
            </span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Stop guessing. Compare features, platform support, and capabilities of top open source software side-by-side.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Button size="lg" onClick={scrollToCategories} className="gap-2 h-12 px-8 text-base">
              Explore Categories <ArrowRight className="h-4 w-4" />
            </Button>
            <Link
              href="https://github.com/Ivoooo/foss-compare"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                Contribute on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section
        id="categories"
        ref={categoriesRef}
        className="container py-16 md:py-24 lg:py-32"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-16">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl font-bold">
            Explore Categories
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Select a category to view detailed comparison tables. We track everything from GitHub stats to specific feature support.
          </p>
          <div className="relative w-full max-w-md mt-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for apps (e.g. Jellyfin) or categories..."
              className="pl-10 pr-10 h-10 bg-background/50 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            const count = category.data.length;

            return (
              <Link
                key={category.id}
                href={`/comparison/${category.id}`}
                className="group block h-full"
              >
                <Card className="h-full overflow-hidden border-muted transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 dark:hover:border-primary/40 dark:hover:bg-muted/10">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" className="group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {count} {count === 1 ? "Tool" : "Tools"}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{category.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2 text-base">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-6 flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      View Comparison <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
