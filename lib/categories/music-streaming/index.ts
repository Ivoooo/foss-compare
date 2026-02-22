import { musicStreamingConfig, MusicStreamingTool } from "./config";
import { musicStreamingData } from "@/data/music-streaming";
import { CategoryConfig } from "../types";

export const musicStreamingCategory: CategoryConfig<MusicStreamingTool> = {
    ...musicStreamingConfig,
    data: musicStreamingData as MusicStreamingTool[],
};
