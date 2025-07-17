export const EVENT_CONSTANTS = {
  SEND_KEYBOARD_SHORTCUT_TO_RENDERER: "SEND_KEYBOARD_SHORTCUT_TO_RENDERER",
  TOGGLE_VISIBILITY: "TOGGLE_VISIBILITY",
  TOGGLE_MOUSE_EVENTS: "TOGGLE_MOUSE_EVENTS",
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
