import { contextBridge, ipcRenderer } from "electron";
import { EVENT_CONSTANTS } from "./renderUtils";

contextBridge.exposeInMainWorld("electronAPI", {
  repositionMainWindow: (direction) => {
    ipcRenderer.send(EVENT_CONSTANTS.REPOSITION_MAIN_WINDOW, direction);
  },
});
