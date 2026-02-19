import { notFound } from "next/navigation";
import { ComparisonTable } from "@/components/comparison/comparison-table";
import streamersData from "@/data/streamers.json";
import { SoftwareTool } from "@/types/software";
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
    <div className="container max-w-[100rem] py-8 md:py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Link>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">TV & Movie Streamers</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Compare features, platform support, and capabilities of top self-hosted media servers.
          </p>
        </div>
      </div>
      <ComparisonTable data={streamers} />
    </div>
  );
}
