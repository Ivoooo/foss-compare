import { mediaServersConfig, StreamerTool } from "./config";
import { media_serversData } from "./data";
import { CategoryConfig } from "@/lib/types";

export const mediaServersCategory: CategoryConfig<StreamerTool> = {
    ...mediaServersConfig,
    data: media_serversData as StreamerTool[],
};
