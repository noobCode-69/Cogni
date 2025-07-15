import { app, BrowserWindow } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";

import { getBrowserWindowOptions } from "./electron/utils";

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
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }
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
