import { app, ipcMain } from "electron";
import { MainWindowManager } from "./mainWindowManager.js";
import { ShortcutManager } from "./shortCutManager.js";
import { EVENT_CONSTANTS } from "../renderUtils.js";

export class AppManager {
  constructor() {
    this.mainWindowManager = new MainWindowManager();
    this.shortcutManager = new ShortcutManager(this.mainWindowManager);
    this.registerAppEvents();
    this.registerIpcEvents();
  }

  initialize() {
    this.mainWindowManager.createWindow(() => {
      this.shortcutManager.registerShortcuts();
    });
  }

  registerAppEvents() {
    app.on("activate", () => {
      if (this.mainWindowManager.isWindowClosed()) {
        this.mainWindowManager.createWindow(() => {
          this.shortcutManager.registerShortcuts();
        });
      }
    });

    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });
  }

  registerIpcEvents() {
    ipcMain.on(EVENT_CONSTANTS.TOGGLE_VISIBILITY, () => {
      this.mainWindowManager.toggleVisibility();
    });

    ipcMain.on(EVENT_CONSTANTS.TOGGLE_MOUSE_EVENTS, (_event, payload) => {
      this.mainWindowManager.toggleMouseEvents(payload);
    });
  }
}
