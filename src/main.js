import { app } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";

import { getBrowserWindowOptions } from "./electron/utils";
import CustomBrowserWindow from "./electron/helpers/BrowserHelper";

if (started) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  const browserWindowOptions = getBrowserWindowOptions();
  mainWindow = new CustomBrowserWindow(browserWindowOptions);

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
