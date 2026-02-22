import { CategoryConfig } from "./categories/types";
import { mediaServersCategory } from "./categories/media-servers";
import { passwordManagersCategory } from "./categories/password-managers";
import { musicStreamingCategory } from "./categories/music-streaming";

import { StreamerTool } from "./categories/media-servers/config";
import { PasswordManagerTool } from "./categories/password-managers/config";
import { MusicStreamingTool } from "./categories/music-streaming/config";

export type { CategoryConfig };

export type SoftwareTool = StreamerTool | PasswordManagerTool | MusicStreamingTool;

export const categories: CategoryConfig<SoftwareTool>[] = [
  mediaServersCategory,
  musicStreamingCategory,
  passwordManagersCategory,
];

export function getCategory(id: string): CategoryConfig<SoftwareTool> | undefined {
  return categories.find((c) => c.id === id);
}
