import { notFound } from "next/navigation";
import { ComparisonTable } from "@/components/comparison/comparison-table";
import { getCategory, categories } from "@/lib/categories";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categoryId } = await params;
  const categoryConfig = getCategory(categoryId);

  if (!categoryConfig) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${categoryConfig.title} Comparison`,
    description: categoryConfig.description,
    alternates: {
      canonical: `/comparison/${categoryId}`,
    },
    openGraph: {
      title: `${categoryConfig.title} Comparison - foss.compare`,
      description: categoryConfig.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { category: categoryId } = await params;
  const categoryConfig = getCategory(categoryId);

  if (!categoryConfig) {
    return notFound();
  }

  return (
    <div className="container py-4 flex-1 flex flex-col overflow-hidden min-h-0">
      <div className="mb-4 shrink-0 flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Categories</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{categoryConfig.title}</h1>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        <ComparisonTable data={categoryConfig.data} sections={categoryConfig.sections} />
      </div>
    </div>
  );
}
