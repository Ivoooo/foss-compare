import { notFound } from "next/navigation";
import { ComparisonTable } from "@/components/comparison/comparison-table";
import { getCategory, categories } from "@/lib/categories";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

export default async function ComparisonPage({ params }: PageProps) {
  const { category: categoryId } = await params;
  const categoryConfig = getCategory(categoryId);

  if (!categoryConfig) {
    return notFound();
  }

  if (categoryConfig.status === "Coming Soon" && categoryConfig.data.length === 0) {
      return (
        <div className="container py-10">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4 pl-0 hover:pl-0 hover:bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Categories
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{categoryConfig.title}</h1>
            <p className="text-muted-foreground">{categoryConfig.description}</p>
          </div>
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
             <p className="text-muted-foreground">This comparison category is currently being worked on.</p>
          </div>
        </div>
      );
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">{categoryConfig.title}</h1>
        <p className="text-muted-foreground">
          {categoryConfig.description}
        </p>
      </div>
      <ComparisonTable data={categoryConfig.data} sections={categoryConfig.sections} />
    </div>
  );
}
