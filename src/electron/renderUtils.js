export const EVENT_CONSTANTS = {
  REPOSITION_MAIN_WINDOW: "REPOSITION_MAIN_WINDOW",
  SEND_KEYBOARD_SHORTCUT_TO_RENDERER: "SEND_KEYBOARD_SHORTCUT_TO_RENDERER",
  HIDE_APP: "HIDE_APP",
  TOGGLE_MOUSE_EVENTS: "TOGGLE_MOUSE_EVENTS"
};

export const keyboardShortcuts = [
  {
    accelerator: "Command+\\",
    action: "CMD_BACKSLASH",
    sendToRennpderer: false,
    handler: ({ window }) => {
      if (window.isVisible() && !window.isMinimized()) {
        window.hide();
      } else {
        window.show();
        window.focus();
      }
    },
  },
];
