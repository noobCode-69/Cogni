export const EVENT_CONSTANTS = {
  SEND_KEYBOARD_SHORTCUT_TO_RENDERER: "SEND_KEYBOARD_SHORTCUT_TO_RENDERER",
  TOGGLE_VISIBILITY: "TOGGLE_VISIBILITY",
  MOUSE_FORWARDING: "MOUSE_FORWARDING",
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
];
