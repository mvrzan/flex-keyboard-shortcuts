import { ShortcutsObject } from '../types/types';
import { getCustomShortcuts, getShortcuts } from './keyboardShortcutsUtil';

export const getDefaultShortcuts = (): ShortcutsObject[] => {
  const customShortcuts = getCustomShortcuts();
  const allShortcuts = getShortcuts();

  const customShortcutsKeys = Object.values(customShortcuts).map(
    item => item.key
  );

  const defaultShortcutValues = allShortcuts.filter(
    item => customShortcutsKeys.indexOf(item.key) === -1
  );

  return defaultShortcutValues;
};
