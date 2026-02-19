import { notFound } from "next/navigation";
import { DataTable } from "@/components/comparison/data-table";
import { columns } from "@/components/comparison/columns";
import streamersData from "@/data/streamers.json";
import { SoftwareTool } from "@/types/software";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// This is necessary because the JSON import might not match the interface exactly due to optional fields
const streamers = streamersData as unknown as SoftwareTool[];

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return [{ category: "streamers" }];
}

export default async function ComparisonPage({ params }: PageProps) {
  const { category } = await params;

  if (category !== "streamers") {
    return notFound();
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="mb-4 pl-0 hover:pl-0 hover:bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-2">TV & Movie Streamers</h1>
        <p className="text-muted-foreground">
          Compare features, platform support, and capabilities of top self-hosted media servers.
        </p>
      </div>
      <DataTable columns={columns} data={streamers} />
    </div>
  );
}
