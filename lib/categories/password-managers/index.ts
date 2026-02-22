import { passwordManagersConfig, PasswordManagerTool } from "./config";
import { password_managersData } from "@/data/password-managers";
import { CategoryConfig } from "../types";

export const passwordManagersCategory: CategoryConfig<PasswordManagerTool> = {
    ...passwordManagersConfig,
    data: password_managersData as PasswordManagerTool[],
};
