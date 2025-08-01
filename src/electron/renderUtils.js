export const EVENT_CONSTANTS = {
  SEND_KEYBOARD_SHORTCUT_TO_RENDERER: "SEND_KEYBOARD_SHORTCUT_TO_RENDERER",
  TOGGLE_VISIBILITY: "TOGGLE_VISIBILITY",
  MOUSE_FORWARDING: "MOUSE_FORWARDING",
  WINDOW_BLUR: "WINDOW_BLUR",
  QUIT_APPLICATION: "QUIT_APPLICATION",
  TOGGLE_INCOGNITO_MODE: "TOGGLE_INCOGNITO_MODE",
  TAKE_SCREENSHOT: "TAKE_SCREENSHOT",
  SAVE_API_KEY: "SAVE_API_KEY",
  LOAD_API_KEY: "LOAD_API_KEY",
  CHECK_SCREEN_PERMISSION: "CHECK_SCREEN_PERMISSION",
};

export const keyboardShortcuts = [
  {
    accelerator: "Command+\\",
    action: "CMD_BACKSLASH",
    sendToRenderer: false,
    handler: ({ mainWindowManager }) => {
      mainWindowManager.toggleVisibility();
    },
  },
  {
    accelerator: "Command+Q",
    action: "CMD_QUIT",
    sendToRenderer: false,
    dynamic: true,
    handler: ({ app }) => {
      app.quit();
    },
  },
  {
    accelerator: "Command+Enter",
    action: "CMD_ENTER",
    sendToRenderer: true,
    dynamic: true,
    onBeforeSend: ({ mainWindowManager }) => {
      mainWindowManager.focus();
    },
  },
  {
    accelerator: "Command+Up",
    action: "CMD_UP_ARROW",
    sendToRenderer: true,
    dynamic: true,
  },
  {
    accelerator: "Command+Down",
    action: "CMD_DOWN_ARROW",
    sendToRenderer: true,
    dynamic: true,
  },
];
