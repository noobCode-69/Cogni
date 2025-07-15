import { contextBridge, ipcRenderer } from "electron";
import { EVENT_CONSTANTS } from "./renderUtils";

contextBridge.exposeInMainWorld("electronAPI", {
  repositionMainWindow: (direction) => {
    ipcRenderer.send(EVENT_CONSTANTS.REPOSITION_MAIN_WINDOW, direction);
  },
  onKeyBoardShortcut: (callback) =>
    ipcRenderer.on(EVENT_CONSTANTS.SEND_KEYBOARD_SHORTCUT_TO_RENDERER, (_, data) =>
      callback(data)
    ),
});
