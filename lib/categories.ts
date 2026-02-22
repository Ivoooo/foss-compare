import { CategoryConfig } from "./categories/types";
import { mediaServersCategory } from "./categories/media-servers";
import { passwordManagersCategory } from "./categories/password-managers";
import { musicStreamingCategory } from "./categories/music-streaming";
import { fileSyncStorageCategory } from "./categories/file-sync-storage";

import { StreamerTool } from "./categories/media-servers/config";
import { PasswordManagerTool } from "./categories/password-managers/config";
import { MusicStreamingTool } from "./categories/music-streaming/config";
import { FileSyncStorageTool } from "./categories/file-sync-storage/config";

export type { CategoryConfig };

export type SoftwareTool = 
  | StreamerTool 
  | PasswordManagerTool 
  | MusicStreamingTool 
  | FileSyncStorageTool;

export const categories: CategoryConfig<SoftwareTool>[] = [
  mediaServersCategory,
  musicStreamingCategory,
  passwordManagersCategory,
  fileSyncStorageCategory,
];

export function getCategory(id: string): CategoryConfig<SoftwareTool> | undefined {
  return categories.find((c) => c.id === id);
}
