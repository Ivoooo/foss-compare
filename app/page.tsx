import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, LayoutDashboard, MonitorPlay, Shield, Database } from "lucide-react";

export default function Home() {
  const categories = [
    {
      id: "streamers",
      title: "TV & Movie Streamers",
      description: "Jellyfin, Plex, Emby, and more. Compare transcoding, platform support, and features.",
      icon: MonitorPlay,
      count: 3,
      status: "Active",
    },
    {
      id: "password-managers",
      title: "Password Managers",
      description: "Bitwarden, Vaultwarden, Keepass, and others. Security features, sync, and clients.",
      icon: Shield,
      count: 0,
      status: "Coming Soon",
    },
    {
      id: "dashboards",
      title: "Dashboards",
      description: "Homepage, Dashy, Homarr. Customizable start pages for your services.",
      icon: LayoutDashboard,
      count: 0,
      status: "Coming Soon",
    },
     {
      id: "databases",
      title: "Databases",
      description: "Postgres, MySQL, MariaDB, SQLite. Performance, replication, and features.",
      icon: Database,
      count: 0,
      status: "Coming Soon",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold inline-block">foss.compare</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center">
              <Link href="https://github.com/jules/foss-compare" target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <Badge variant="secondary" className="rounded-2xl">
              Open Source & Self-Hosted
            </Badge>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Compare Self-Hosted Software Solutions
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Make informed decisions for your homelab. Detailed feature comparisons for open source and popular proprietary alternatives.
            </p>
            <div className="space-x-4">
              <Link href="#categories">
                <Button size="lg">Explore Categories</Button>
              </Link>
              <Link href="https://github.com/jules/foss-compare" target="_blank" rel="noreferrer">
                <Button variant="outline" size="lg">Contribute on GitHub</Button>
              </Link>
            </div>
          </div>
        </section>
        <section id="categories" className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
              Categories
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Select a category to view detailed comparison tables.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-8 mt-8">
            {categories.map((category) => {
              const Icon = category.icon
              return (
              <Link key={category.id} href={category.status === "Active" ? `/comparison/${category.id}` : "#"}>
                <Card className={`h-full transition-all hover:bg-accent/50 ${category.status !== "Active" ? "opacity-60 cursor-not-allowed" : ""}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                        <Icon className="h-8 w-8 mb-2" />
                        {category.status !== "Active" && <Badge variant="outline">Soon</Badge>}
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      {category.count} {category.count === 1 ? "Tool" : "Tools"}
                    </div>
                  </CardContent>
                </Card>
              </Link>
              )
            })}
          </div>
        </section>
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by <span className="font-medium underline underline-offset-4">Jules</span>. The source code is available on{" "}
            <a
              href="https://github.com/jules/foss-compare"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
