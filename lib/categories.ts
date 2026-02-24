import { CategoryConfig } from "./types";
import { mediaServersCategory } from "@/data/media-servers";
import { passwordManagersCategory } from "@/data/password-managers";
import { musicStreamingCategory } from "@/data/music-streaming";
import { fileSyncStorageCategory } from "@/data/file-sync-storage";

import { StreamerTool } from "@/data/media-servers/config";
import { PasswordManagerTool } from "@/data/password-managers/config";
import { MusicStreamingTool } from "@/data/music-streaming/config";
import { FileSyncStorageTool } from "@/data/file-sync-storage/config";

export type { CategoryConfig };

export type SoftwareTool = StreamerTool | PasswordManagerTool | MusicStreamingTool | FileSyncStorageTool;

export const categories: CategoryConfig<SoftwareTool>[] = [
  mediaServersCategory,
  musicStreamingCategory,
  passwordManagersCategory,
  fileSyncStorageCategory,
];

export function getCategory(id: string): CategoryConfig<SoftwareTool> | undefined {
  return categories.find((c) => c.id === id);
}
