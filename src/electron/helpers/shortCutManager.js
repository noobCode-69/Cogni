import { globalShortcut } from "electron";
import { keyboardShortcuts, EVENT_CONSTANTS } from "../renderUtils";

export class ShortcutManager {
  constructor(mainWindowManager) {
    this.mainWindowManager = mainWindowManager;
  }

  registerShortcuts() {
    const window = this.mainWindowManager.getWindow();
    if (!window) return;

    const context = {
      mainWindowManager: this.mainWindowManager,
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

        if (!success) {
          console.warn(`Failed to register shortcut: ${accelerator}`);
        }
      }
    );
  }
}
