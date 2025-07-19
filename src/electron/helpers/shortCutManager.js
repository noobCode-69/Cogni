import { globalShortcut } from "electron";
import { keyboardShortcuts, EVENT_CONSTANTS } from "../renderUtils";

export class ShortcutManager {
  constructor(mainWindowManager, appInstance) {
    this.mainWindowManager = mainWindowManager;
    this.app = appInstance;
    this.dynamicShortcuts = new Map();
  }

  registerShortcuts() {
    const window = this.mainWindowManager.getWindow();
    if (!window) return;

    const context = {
      mainWindowManager: this.mainWindowManager,
      app: this.app,
    };

    keyboardShortcuts.forEach(
      ({ accelerator, action, sendToRenderer, handler, dynamic }) => {
        if (dynamic) {
          this.dynamicShortcuts.set(accelerator, {
            action,
            sendToRenderer,
          });
          return;
        }
        globalShortcut.register(accelerator, () => {
          if (sendToRenderer) {
            window.webContents.send(
              EVENT_CONSTANTS.SEND_KEYBOARD_SHORTCUT_TO_RENDERER,
              action
            );
          } else if (typeof handler === "function") {
            handler(context);
          }
        });

        window.on("show", () => this.registerDynamicShortcuts());
        window.on("hide", () => this.unregisterDynamicShortcuts());
        window.on("close", () => this.unregisterDynamicShortcuts());
      }
    );
  }

  registerDynamicShortcuts() {
    const window = this.mainWindowManager.getWindow();
    if (!window) return;

    for (const [
      accelerator,
      { action, sendToRenderer },
    ] of this.dynamicShortcuts.entries()) {
      if (!globalShortcut.isRegistered(accelerator)) {
        globalShortcut.register(accelerator, () => {
          if (sendToRenderer) {
            window.webContents.send(
              EVENT_CONSTANTS.SEND_KEYBOARD_SHORTCUT_TO_RENDERER,
              action
            );
          }
        });
      }
    }
  }

  unregisterDynamicShortcuts() {
    for (const accelerator of this.dynamicShortcuts.keys()) {
      if (globalShortcut.isRegistered(accelerator)) {
        globalShortcut.unregister(accelerator);
      }
    }
  }
}
