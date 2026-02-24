import { musicStreamingConfig, MusicStreamingTool } from "./config";
import { musicStreamingData } from "./data";
import { CategoryConfig } from "@/lib/types";

export const musicStreamingCategory: CategoryConfig<MusicStreamingTool> = {
    ...musicStreamingConfig,
    data: musicStreamingData as MusicStreamingTool[],
};
