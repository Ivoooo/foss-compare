import { fileSyncStorageConfig, FileSyncStorageTool } from "./config";
import { fileSyncStorageData } from "@/data/file-sync-storage";
import { CategoryConfig } from "../types";

export const fileSyncStorageCategory: CategoryConfig<FileSyncStorageTool> = {
    ...fileSyncStorageConfig,
    data: fileSyncStorageData as FileSyncStorageTool[],
};
