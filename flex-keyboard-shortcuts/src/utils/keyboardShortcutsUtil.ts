import * as Flex from '@twilio/flex-ui';

import { ShortcutsObject } from '../types/types';

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

const toggleDialpad = () => {
  Flex.Actions.invokeAction('ToggleOutboundDialer');
};

const toggleSidebar = () => {
  Flex.Actions.invokeAction('ToggleSidebar');
};

const navigateToTasks = () => {
  Flex.Actions.invokeAction('NavigateToView', {
    viewName: 'agent-desktop',
  });
};

const navigateToKeyboardShortcuts = () => {
  Flex.Actions.invokeAction('NavigateToView', {
    viewName: 'keyboard-shortcuts',
  });
};

const navigateToTeamsView = () => {
  Flex.Actions.invokeAction('NavigateToView', {
    viewName: 'teams',
  });
};

const navigateToQueuesView = () => {
  Flex.Actions.invokeAction('NavigateToView', {
    viewName: 'queues-stats',
  });
};

const debuggingHelper = () => {
  console.log(
    `This information is for debugging purposes only:
  accountSid: ${Flex.Manager.getInstance().workerClient?.accountSid}
  workerSid: ${Flex.Manager.getInstance().workerClient?.sid}
  workspaceSid: ${Flex.Manager.getInstance().workerClient?.workspaceSid}
  friendlyName: ${Flex.Manager.getInstance().workerClient?.friendlyName}
  attributes:`,
    Flex.Manager.getInstance().workerClient?.attributes
  );
};

export const iniCustomShortcuts = () => {
  const customShortcuts = {
    D: { action: toggleDialpad, name: 'Toggle dialpad', throttle: 100 },
    Q: { action: toggleSidebar, name: 'Toggle sidebar', throttle: 100 },
    K: { action: navigateToTasks, name: 'Navigate to tasks', throttle: 100 },
    9: {
      action: debuggingHelper,
      name: 'Debugging assistance',
      throttle: 3000,
    },
    L: {
      action: navigateToKeyboardShortcuts,
      name: 'Navigate to keyboard shortcuts',
      throttle: 100,
    },
    I: {
      action: navigateToTeamsView,
      name: 'Navigate to Teams View',
      throttle: 100,
    },
    O: {
      action: navigateToQueuesView,
      name: 'Navigate to Real-time Queues View',
      throttle: 100,
    },
  };
  const customShortcutsValue = Object.entries(customShortcuts).map(item => {
    return {
      key: item[0],
      actionName: item[1].name,
      throttle: item[1]?.throttle,
    };
  });

  Flex.KeyboardShortcutManager.addShortcuts(customShortcuts);

  return customShortcutsValue;
};

// export const getDefaultShortcuts = (): ShortcutsObject[] => {
//   const allShortcuts = getShortcuts();

//   const defaultShortcuts = Object.entries(Flex.defaultKeyboardShortcuts).map(
//     item => {
//       return {
//         key: item[0],
//         actionName: item[1].name,
//       };
//     }
//   );

//   const defaultShortcutsKeys = Object.values(defaultShortcuts).map(
//     item => item.actionName
//   );

//   const defaultShortcutValues = allShortcuts.filter(
//     item => defaultShortcutsKeys.indexOf(item.actionName) !== -1
//   );

//   return defaultShortcutValues;
// };

export const getDefaultShortcuts = (): ShortcutsObject[] => {
  const customShortcuts = iniCustomShortcuts();
  const allShortcuts = getAllShortcuts();

  const customShortcutsKeys = Object.values(customShortcuts).map(
    item => item.actionName
  );

  const defaultShortcutValues = allShortcuts.filter(
    item => customShortcutsKeys.indexOf(item.actionName) === -1
  );

  return defaultShortcutValues;
};

// export const getDefaultShortcuts = (): ShortcutsObject[] => {
//   const customShortcuts = getCustomShortcuts();
//   const allShortcuts = getShortcuts();

//   const customShortcutsKeys = Object.values(customShortcuts).map(
//     item => item.key
//   );

//   const defaultShortcutValues = allShortcuts.filter(
//     item => customShortcutsKeys.indexOf(item.key) === -1
//   );

//   return defaultShortcutValues;
// };

export const getCustomShortcuts = (): ShortcutsObject[] => {
  const customShortcuts = iniCustomShortcuts();
  const allShortcuts = getAllShortcuts();

  const customShortcutsKeys = Object.values(customShortcuts).map(
    item => item.actionName
  );

  const defaultShortcutValues = allShortcuts.filter(
    item => customShortcutsKeys.indexOf(item.actionName) !== -1
  );

  return defaultShortcutValues;
};

export const resetKeyboardShortcutsUtil = () => {
  Flex.KeyboardShortcutManager.disableShortcuts();
  Flex.KeyboardShortcutManager.init(Flex.defaultKeyboardShortcuts);
  iniCustomShortcuts();
};

export const getUserConfig = () => {
  const localConfig = localStorage.getItem('shortcutsConfig');

  if (localConfig) {
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
        };
      } else {
        return { ...systemItem, oldKey: systemItem.key };
      }
    });

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
    });
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
