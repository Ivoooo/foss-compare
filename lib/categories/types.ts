import { LucideIcon } from "lucide-react";
import { CategorySection, SoftwareTool } from "@/lib/schemas";

export interface CategoryConfig {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    data: SoftwareTool[];
    sections: CategorySection[];
}
