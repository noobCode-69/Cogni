import { globalShortcut, app, BrowserWindow } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { ipcMain } from "electron";

import { getBrowserWindowOptions } from "./electron/electronUtils";
import { EVENT_CONSTANTS, keyboardShortcuts } from "./electron/renderUtils";

if (started) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  const browserWindowOptions = getBrowserWindowOptions();
  mainWindow = new BrowserWindow(browserWindowOptions);
  mainWindow.setHiddenInMissionControl(true);
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  mainWindow.setResizable(false);
  mainWindow.setIgnoreMouseEvents(true, { forward: true });
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }
  mainWindow.webContents.on("did-finish-load", () => {
    registerShortcuts();
  });

  // mainWindow.webContents.openDevTools({ mode: "detach" });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on(EVENT_CONSTANTS.REPOSITION_MAIN_WINDOW, (_event, direction) => {
  const [x, y] = mainWindow.getPosition();
  const step = 100;
  const newX = x + direction * step;
  mainWindow.setPosition(newX, y, true);
});

ipcMain.on(EVENT_CONSTANTS.HIDE_APP, (_event) => {
  if (mainWindow.isVisible() && !mainWindow.isMinimized()) {
    mainWindow.hide();
  }
});

ipcMain.on(EVENT_CONSTANTS.TOGGLE_MOUSE_EVENTS, (_event, payload) => {
  if (payload === "ENTER") {
    mainWindow.setIgnoreMouseEvents(false);
  } else {
    mainWindow.setIgnoreMouseEvents(true, { forward: true });
  }
});

function registerShortcuts() {
  const context = {
    window: mainWindow,
  };

  keyboardShortcuts.forEach(
    ({ accelerator, action, sendToRenderer, handler }) => {
      const success = globalShortcut.register(accelerator, () => {
        if (sendToRenderer) {
          mainWindow.webContents.send(
            EVENT_CONSTANTS.SEND_KEYBOARD_SHORTCUT_TO_RENDERER,
            action
          );
        } else {
          if (typeof handler === "function") {
            handler(context);
          }
        }
      });

      if (!success) {
        console.warn(`Failed to register shortcut: ${accelerator}`);
      }
    }
  );
}
