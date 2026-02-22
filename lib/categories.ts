import { CategoryConfig } from "./categories/types";
import { mediaServersCategory } from "./categories/media-servers";
import { passwordManagersCategory } from "./categories/password-managers";
import { musicStreamingCategory } from "./categories/music-streaming";
import { fileSyncStorageCategory } from "./categories/file-sync-storage";

export type { CategoryConfig };

export const categories: CategoryConfig[] = [
  mediaServersCategory,
  musicStreamingCategory,
  passwordManagersCategory,
  fileSyncStorageCategory,
];

export function getCategory(id: string): CategoryConfig | undefined {
  return categories.find((c) => c.id === id);
}
