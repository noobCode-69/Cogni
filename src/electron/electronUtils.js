import { screen } from "electron";
import path from "path";

export function getBrowserWindowOptions() {
  const { width: screenWidth } = screen.getPrimaryDisplay().bounds;
  const windowWidth = 224;
  const windowHeight = 42;
  const x = Math.round((screenWidth - windowWidth) / 2);
  const y = 45;

  return {
    type: "panel",
    width: windowWidth,
    height: windowHeight,
    x,
    y,
    frame: false,
    fullscreenable: false,
    transparent: true,
    backgroundColor: "#00000000",
    hasShadow: false,
    focusable: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  };
}
