import { fileSyncStorageConfig, FileSyncStorageTool } from "./config";
import { fileSyncStorageData } from "./data";
import { CategoryConfig } from "@/lib/types";

export const fileSyncStorageCategory: CategoryConfig<FileSyncStorageTool> = {
    ...fileSyncStorageConfig,
    data: fileSyncStorageData as FileSyncStorageTool[],
};
