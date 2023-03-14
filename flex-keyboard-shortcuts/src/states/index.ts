import { combineReducers } from '@reduxjs/toolkit';
import { deleteKeyboardShortcut } from './keyboardShortcutState';

export const namespace = 'keyboardShortcuts';

// It can be helpful to create a map of all actions
export const actions = {
  defaultShortcuts: {
    deleteKeyboardShortcut,
  },
};

// Combine any number of reducers to support the needs of your plugin
export const reducers = combineReducers({
  defaultShortcuts: deleteKeyboardShortcut,
});
