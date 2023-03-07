import * as Flex from '@twilio/flex-ui';

interface ShortcutsObject {
  key: string;
  actionName: string;
  throttle?: number;
}

export const getShortcuts = (): ShortcutsObject[] => {
  const shortcutValues = Object.entries(
    Flex.KeyboardShortcutManager.keyboardShortcuts
  ).map(item => {
    return {
      key: item[0],
      actionName: item[1].name,
      throttle: item[1]?.throttle,
    };
  });

  return shortcutValues;
};
