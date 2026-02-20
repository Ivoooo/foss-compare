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
    openGraph: {
      title: `${categoryConfig.title} Comparison - foss.compare`,
      description: categoryConfig.description,
    },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { category: categoryId } = await params;
  const categoryConfig = getCategory(categoryId);

  if (!categoryConfig) {
    return notFound();
  }

  if (categoryConfig.status === "Coming Soon" && categoryConfig.data.length === 0) {
      return (
        <div className="container py-10">
          <div className="mb-8 flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Categories</span>
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">{categoryConfig.title}</h1>
          </div>
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
             <p className="text-muted-foreground">This comparison category is currently being worked on.</p>
          </div>
        </div>
      );
  }

  return (
    <div className="container py-4 h-full flex flex-col overflow-hidden">
      <div className="mb-4 shrink-0 flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Categories</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{categoryConfig.title}</h1>
      </div>
      <div className="flex-1 overflow-hidden">
        <ComparisonTable data={categoryConfig.data} sections={categoryConfig.sections} />
      </div>
    </div>
  );
}
