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
    if (!this.mainWindowManager.getWindow()) return;

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
            this.mainWindowManager.sendToRenderer(
              EVENT_CONSTANTS.SEND_KEYBOARD_SHORTCUT_TO_RENDERER,
              action
            );
          } else if (typeof handler === "function") {
            handler(context);
          }
        });
      }
    }

    this.mainWindowManager.onWindowEvent("show", () =>
      this.registerDynamicShortcuts()
    );
    this.mainWindowManager.onWindowEvent("hide", () =>
      this.unregisterDynamicShortcuts()
    );
    this.mainWindowManager.onWindowEvent("close", () =>
      this.unregisterDynamicShortcuts()
    );

    if (this.mainWindowManager.isVisible()) {
      this.registerDynamicShortcuts();
    }
  }

  registerDynamicShortcuts() {
    if (!this.mainWindowManager.getWindow()) return;

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
            this.mainWindowManager.sendToRenderer(
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
