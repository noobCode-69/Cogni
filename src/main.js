import { app, BrowserWindow } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { ipcMain } from "electron";

import { getBrowserWindowOptions } from "./electron/electronUtils";
import { EVENT_CONSTANTS } from "./electron/renderUtils";

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
  mainWindow.webContents.openDevTools({ mode: "detach" }); // or 'undocked', 'bottom', 'right'
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
  console.log("Saving settings:", direction);
});
