import { LucideIcon } from "lucide-react";
import { ZodSchema } from "zod";
import { CategorySection, BaseSoftwareTool } from "@/lib/base-schemas";

export interface CategoryConfig<T extends BaseSoftwareTool = BaseSoftwareTool> {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    data: T[];
    sections: CategorySection[];
    schema: ZodSchema<T>;
}
