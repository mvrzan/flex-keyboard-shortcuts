import { createSlice } from '@reduxjs/toolkit';
import { getDefaultShortcuts } from '../utils/DefaultKeyboardShortcutsUtil';

const initialState = {
  defaultKeyboardShortcuts: getDefaultShortcuts(),
};

// Create your reducer and actions in one function call
// with the createSlice utility
export const defaultKeyboardShortcutsSlice = createSlice({
  name: 'defaultKeyboardShortcuts',
  initialState,
  reducers: {
    deleteKeyboardShortcut() {
      console.log('Deleted from Redux!');
    },
  },
});

// You can now export your reducer and actions
// with none of the old boilerplate
export const { deleteKeyboardShortcut } = defaultKeyboardShortcutsSlice.actions;
export default defaultKeyboardShortcutsSlice.reducer;
