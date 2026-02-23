import { passwordManagersConfig, PasswordManagerTool } from "./config";
import { password_managersData } from "./data";
import { CategoryConfig } from "@/lib/types";

export const passwordManagersCategory: CategoryConfig<PasswordManagerTool> = {
    ...passwordManagersConfig,
    data: password_managersData as PasswordManagerTool[],
};
