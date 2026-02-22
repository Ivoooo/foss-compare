import { FileSyncStorageTool } from "@/lib/schemas";
import nextcloud from "./nextcloud.json";
import owncloudOcis from "./owncloud-ocis.json";
import seafile from "./seafile.json";
import pydioCells from "./pydio-cells.json";
import syncthing from "./syncthing.json";
import filebrowser from "./filebrowser.json";

export const fileSyncStorageData: FileSyncStorageTool[] = [
  nextcloud as unknown as FileSyncStorageTool,
  owncloudOcis as unknown as FileSyncStorageTool,
  seafile as unknown as FileSyncStorageTool,
  pydioCells as unknown as FileSyncStorageTool,
  syncthing as unknown as FileSyncStorageTool,
  filebrowser as unknown as FileSyncStorageTool,
];
