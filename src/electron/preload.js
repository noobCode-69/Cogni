import { contextBridge, ipcRenderer } from "electron";
import { EVENT_CONSTANTS } from "./renderUtils";

contextBridge.exposeInMainWorld("electronAPI", {
  sendRendererEvent: (event, payload) => {
    ipcRenderer.send(event, payload);
  },
  onKeyBoardShortcut: (callback) =>
    ipcRenderer.on(
      EVENT_CONSTANTS.SEND_KEYBOARD_SHORTCUT_TO_RENDERER,
      (_, data) => callback(data)
    ),
  onWindowBlur: (callback) => {
    ipcRenderer.on(EVENT_CONSTANTS.WINDOW_BLUR, (_, data) => callback(data));
  },
});
