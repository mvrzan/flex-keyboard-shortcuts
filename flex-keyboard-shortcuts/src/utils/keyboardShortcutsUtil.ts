import * as Flex from '@twilio/flex-ui';

import { ShortcutsObject } from '../types/types';
import {
  initCustomShortcuts,
  presetCustomShortcuts,
} from './CustomKeyboardShortcuts';

export const getAllShortcuts = (): ShortcutsObject[] => {
  const shortcutValues = Object.entries(
    Flex.KeyboardShortcutManager.keyboardShortcuts
  ).map(item => {
    return {
      key: item[0],
      actionName: item[1].name,
      throttle: item[1]?.throttle,
      action: item[1].action,
    };
  });

  return shortcutValues;
};

export const getDefaultShortcuts = (): ShortcutsObject[] => {
  const customShortcuts = initCustomShortcuts();
  const allShortcuts = getAllShortcuts();

  const customShortcutsKeys = Object.values(customShortcuts).map(
    item => item.actionName
  );

  const defaultShortcutValues = allShortcuts.filter(
    item => customShortcutsKeys.indexOf(item.actionName) === -1
  );

  return defaultShortcutValues;
};

export const getCustomShortcuts = (): ShortcutsObject[] => {
  if (localStorage.getItem('shortcutsConfig') === (undefined || null)) {
    Flex.KeyboardShortcutManager.addShortcuts(presetCustomShortcuts);
  }

  const customShortcuts = initCustomShortcuts();
  const allShortcuts = getAllShortcuts();

  const customShortcutsKeys = Object.values(customShortcuts).map(
    item => item.actionName
  );

  const customShortcutValues = allShortcuts.filter(
    item => customShortcutsKeys.indexOf(item.actionName) !== -1
  );

  return customShortcutValues;
};

export const resetKeyboardShortcutsUtil = () => {
  Flex.KeyboardShortcutManager.disableShortcuts();
  Flex.KeyboardShortcutManager.init(Flex.defaultKeyboardShortcuts);
};

export const getUserConfig = () => {
  const localConfig = localStorage.getItem('shortcutsConfig');

  if (localConfig) {
    Flex.KeyboardShortcutManager.addShortcuts(presetCustomShortcuts);
    const userLocalConfig: ShortcutsObject = JSON.parse(localConfig);
    const systemConfig = Flex.KeyboardShortcutManager.keyboardShortcuts;

    const userLocalConfigArray = Object.entries(userLocalConfig).map(item => {
      return {
        key: item[0],
        actionName: item[1].name,
        throttle: item[1]?.throttle,
      };
    });

    const systemConfigArray = Object.entries(systemConfig).map(item => {
      return {
        key: item[0],
        actionName: item[1].name,
        throttle: item[1]?.throttle,
        action: item[1].action,
      };
    });

    const userConfig = systemConfigArray.map(systemItem => {
      const foundItem = userLocalConfigArray.find(
        userItem => userItem.actionName === systemItem.actionName
      );
      if (foundItem) {
        return {
          ...foundItem,
          action: systemItem.action,
          oldKey: systemItem.key,
          delete: false,
        };
      } else {
        return { ...systemItem, oldKey: systemItem.key, delete: true };
      }
    });

    Flex.KeyboardShortcutManager.disableShortcuts();

    userConfig.forEach(shortcut => {
      Flex.KeyboardShortcutManager.remapShortcut(
        shortcut.oldKey,
        shortcut.key,
        {
          action: shortcut.action,
          name: shortcut.actionName,
          throttle: shortcut.throttle,
        }
      );

      if (shortcut.delete === true) {
        Flex.KeyboardShortcutManager.deleteShortcuts([shortcut.key]);
      }
    });

    Flex.KeyboardShortcutManager.init(
      Flex.KeyboardShortcutManager.keyboardShortcuts
    );
  }
};

export const getCamelCase = (input: string) =>
  input
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index === 0) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');

export const getAllActions = () => {
  const allShortcuts = getAllShortcuts();

  const allActions = allShortcuts.map(item => {
    return {
      [getCamelCase(item.actionName)]: item.action,
    };
  });

  return Object.assign({}, ...allActions);
};
