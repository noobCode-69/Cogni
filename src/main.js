import { app } from "electron";
import started from "electron-squirrel-startup";
import { AppManager } from "./electron/helpers/appManager";

if (started) {
  app.quit();
}

const appManager = new AppManager();

app.whenReady().then(() => {
  appManager.initialize();
});
