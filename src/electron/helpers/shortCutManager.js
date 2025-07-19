import { globalShortcut } from "electron";
import { keyboardShortcuts, EVENT_CONSTANTS } from "../renderUtils";

export class ShortcutManager {
  constructor(mainWindowManager, appInstance) {
    this.mainWindowManager = mainWindowManager;
    this.app = appInstance;
  }

  registerShortcuts() {
    const window = this.mainWindowManager.getWindow();
    if (!window) return;

    const context = {
      mainWindowManager: this.mainWindowManager,
      app: this.app,
    };

    keyboardShortcuts.forEach(
      ({ accelerator, action, sendToRenderer, handler }) => {
        const success = globalShortcut.register(accelerator, () => {
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
    );
  }
}
