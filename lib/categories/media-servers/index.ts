import { mediaServersConfig, StreamerTool } from "./config";
import { media_serversData } from "@/data/media-servers";
import { CategoryConfig } from "../types";

export const mediaServersCategory: CategoryConfig<StreamerTool> = {
    ...mediaServersConfig,
    data: media_serversData as StreamerTool[],
};
