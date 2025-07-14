import { BrowserWindow } from "electron";
class CustomBrowserWindow extends BrowserWindow {
  constructor(options) {
    super(options);
  }
}

export default CustomBrowserWindow;
