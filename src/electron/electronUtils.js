import { screen } from "electron";
import path from "path";

export function getBrowserWindowOptions() {
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
      preload: path.join(__dirname, "preload.js"),
    },
  };
}
