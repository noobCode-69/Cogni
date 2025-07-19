import { app, ipcMain } from "electron";
import { MainWindowManager } from "./mainWindowManager.js";
import { ShortcutManager } from "./shortCutManager.js";
import { EVENT_CONSTANTS } from "../renderUtils.js";
import { globalShortcut } from "electron";

export class AppManager {
  constructor() {
    this.mainWindowManager = new MainWindowManager();
    this.shortcutManager = new ShortcutManager(this.mainWindowManager, app);
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

    appInstance.on("will-quit", () => {
      globalShortcut.unregisterAll();
    });
  }

  registerIpcEvents() {
    ipcMain.on(EVENT_CONSTANTS.TOGGLE_VISIBILITY, () => {
      this.mainWindowManager.toggleVisibility();
    });

    ipcMain.on(EVENT_CONSTANTS.MOUSE_FORWARDING, (_event, payload) => {
      this.mainWindowManager.toggleMouseEvents(payload);
    });

    ipcMain.on(EVENT_CONSTANTS.QUIT_APPLICATION, (_event, payload) => {
      app.quit();
    });

    ipcMain.on(EVENT_CONSTANTS.TOGGLE_INCOGNITO_MODE, (_event, payload) => {
      this.mainWindowManager.toggleIncognitoMode(payload);
    });
  }
}
