import { BrowserWindow, screen } from "electron";
import path from "node:path";

export class MainWindowManager {
  constructor() {
    this.mainWindow = null;
  }

  getBrowserWindowOptions() {
    const { width: screenWidth, height: screenHeight } =
      screen.getPrimaryDisplay().bounds;
    const x = 0;
    const y = 0;

    return {
      type: "panel",
      width: screenWidth,
      height: screenHeight,
      x,
      y,
      frame: false,
      transparent: true,
      backgroundColor: "#00000000",
      hasShadow: false,
      webPreferences: {
        preload: path.join(__dirname, "../preload.js"),
      },
    };
  }

  createWindow(onReady) {
    const options = this.getBrowserWindowOptions();
    this.mainWindow = new BrowserWindow(options);

    this.mainWindow.setHiddenInMissionControl(true);
    this.mainWindow.setVisibleOnAllWorkspaces(true, {
      visibleOnFullScreen: true,
    });
    this.mainWindow.setResizable(false);
    this.mainWindow.setIgnoreMouseEvents(true, { forward: true });

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      this.mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
      this.mainWindow.loadFile(
        path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
      );
    }

    this.mainWindow.webContents.on("did-finish-load", onReady);
    this.mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  getWindow() {
    return this.mainWindow;
  }

  isWindowClosed() {
    return !BrowserWindow.getAllWindows().length;
  }

  toggleMouseEvents(payload) {
    if (!this.mainWindow) return;
    if (payload === "ENTER") {
      this.mainWindow.setIgnoreMouseEvents(false);
    } else {
      this.mainWindow.setIgnoreMouseEvents(true, { forward: true });
    }
  }

  toggleVisibility() {
    if (!this.mainWindow) return;

    if (this.mainWindow.isVisible() && !this.mainWindow.isMinimized()) {
      this.mainWindow.hide();
    } else {
      this.mainWindow.show();
      this.mainWindow.focus();
    }
  }
}
