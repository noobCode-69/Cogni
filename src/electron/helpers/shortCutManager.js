import { globalShortcut } from "electron";
import { keyboardShortcuts, EVENT_CONSTANTS } from "../renderUtils";

export class ShortcutManager {
  constructor(mainWindowManager, appInstance) {
    this.mainWindowManager = mainWindowManager;
    this.app = appInstance;
  }

  getContext() {
    return {
      mainWindowManager: this.mainWindowManager,
      app: this.app,
    };
  }

  registerShortcuts() {
    const window = this.mainWindowManager.getWindow();
    if (!window) return;

    const context = this.getContext();
    for (const shortcut of keyboardShortcuts) {
      const {
        accelerator,
        action,
        sendToRenderer,
        handler,
        dynamic,
        onBeforeSend,
      } = shortcut;

      if (dynamic) continue;
      if (!globalShortcut.isRegistered(accelerator)) {
        globalShortcut.register(accelerator, () => {
          if (typeof onBeforeSend === "function") {
            onBeforeSend(context);
          }
          if (sendToRenderer) {
            window.webContents.send(
              EVENT_CONSTANTS.SEND_KEYBOARD_SHORTCUT_TO_RENDERER,
              action
            );
          } else if (typeof handler === "function") {
            handler(context);
          }
        });
      }
    }

    window.on("show", () => this.registerDynamicShortcuts());
    window.on("hide", () => this.unregisterDynamicShortcuts());
    window.on("close", () => this.unregisterDynamicShortcuts());

    if (window.isVisible()) {
      this.registerDynamicShortcuts();
    }
  }

  registerDynamicShortcuts() {
    const window = this.mainWindowManager.getWindow();
    if (!window) return;
    const context = this.getContext();
    for (const shortcut of keyboardShortcuts) {
      const {
        accelerator,
        action,
        sendToRenderer,
        dynamic,
        onBeforeSend,
        handler,
      } = shortcut;
      if (!dynamic) continue;

      if (!globalShortcut.isRegistered(accelerator)) {
        globalShortcut.register(accelerator, () => {
          if (typeof onBeforeSend === "function") {
            onBeforeSend(context);
          }
          if (sendToRenderer) {
            window.webContents.send(
              EVENT_CONSTANTS.SEND_KEYBOARD_SHORTCUT_TO_RENDERER,
              action
            );
          } else if (typeof handler === "function") {
            handler(context);
          }
        });
      }
    }
  }

  unregisterDynamicShortcuts() {
    for (const shortcut of keyboardShortcuts) {
      const { accelerator, dynamic } = shortcut;
      if (!dynamic) continue;

      if (globalShortcut.isRegistered(accelerator)) {
        globalShortcut.unregister(accelerator);
      }
    }
  }
}
