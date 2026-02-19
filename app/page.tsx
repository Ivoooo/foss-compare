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
import {
  MonitorPlay,
  Shield,
  LayoutDashboard,
  Database,
  ArrowRight,
} from "lucide-react";
import { useRef } from "react";

export default function Home() {
  const categoriesRef = useRef<HTMLElement>(null);

  const categories = [
    {
      id: "streamers",
      title: "TV & Movie Streamers",
      description:
        "Jellyfin, Plex, Emby, and more. Compare transcoding, platform support, and features.",
      icon: MonitorPlay,
      count: 3,
      status: "Active",
    },
    {
      id: "password-managers",
      title: "Password Managers",
      description:
        "Bitwarden, Vaultwarden, Keepass, and others. Security features, sync, and clients.",
      icon: Shield,
      count: 0,
      status: "Coming Soon",
    },
    {
      id: "dashboards",
      title: "Dashboards",
      description:
        "Homepage, Dashy, Homarr. Customizable start pages for your services.",
      icon: LayoutDashboard,
      count: 0,
      status: "Coming Soon",
    },
    {
      id: "databases",
      title: "Databases",
      description:
        "Postgres, MySQL, MariaDB, SQLite. Performance, replication, and features.",
      icon: Database,
      count: 0,
      status: "Coming Soon",
    },
  ];

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 bg-gradient-to-b from-background to-muted/50">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Badge variant="secondary" className="rounded-2xl px-4 py-1.5 text-sm">
            Open Source & Self-Hosted
          </Badge>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Compare Self-Hosted Software Solutions
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Make informed decisions for your homelab. Detailed feature comparisons
            for open source and popular proprietary alternatives.
          </p>
          <div className="space-x-4">
            <Button size="lg" onClick={scrollToCategories} className="gap-2">
              Explore Categories <ArrowRight className="h-4 w-4" />
            </Button>
            <Link
              href="https://github.com/Ivoooo/foss-compare"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline" size="lg">
                Contribute on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section
        id="categories"
        ref={categoriesRef}
        className="container py-8 md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl font-bold">
            Categories
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Select a category to view detailed comparison tables.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-8 mt-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={
                  category.status === "Active"
                    ? `/comparison/${category.id}`
                    : "#"
                }
                className={category.status !== "Active" ? "cursor-default" : ""}
                onClick={(e) => {
                  if (category.status !== "Active") e.preventDefault();
                }}
              >
                <Card
                  className={`h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    category.status !== "Active"
                      ? "opacity-60"
                      : "hover:bg-accent/50 hover:border-primary/50"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      {category.status !== "Active" && (
                        <Badge variant="secondary" className="text-xs">
                          Soon
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="mt-4">{category.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-medium text-muted-foreground">
                      {category.count} {category.count === 1 ? "Tool" : "Tools"}
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
