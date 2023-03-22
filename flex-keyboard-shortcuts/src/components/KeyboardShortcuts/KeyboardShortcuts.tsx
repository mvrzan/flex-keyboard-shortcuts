import { useState } from 'react';
import { useUID } from '@twilio-paste/core/uid-library';

import { Tab, Tabs, TabList, TabPanel, TabPanels } from '@twilio-paste/core';
import { useToaster, Toaster } from '@twilio-paste/core/toast';
import { Box, Heading } from '@twilio-paste/core';

import CustomKeyboardShortcutsView from './Tabs/CustomKeyboardShortcutsView';
import DefaultKeyboardShortcutsView from './Tabs/DefaultKeyboardShortcuts';
import Settings from './Tabs/Settings';

const KeyboardShortcuts = () => {
  const [noShortcuts, setNoShortcuts] = useState(false);
  const [isDeleteShortcutsEnabled, setIsDeleteShortcutsEnabled] =
    useState(false);
  const [isThrottleEnabled, setIsThrottleEnabled] = useState(false);
  const [reset, setReset] = useState(false);
  const randomComponentId = useUID();
  const toaster = useToaster();

  const toasterSuccessNotification = (
    actionName: string,
    oldShortcut: string,
    newShortcut: string
  ) => {
    toaster.push({
      message: `Keyboard action ${actionName} modified successfully from ${oldShortcut} to ${newShortcut.toUpperCase()}!
      Your new keyboard shortcut is: Ctrl + Shift + ${newShortcut.toUpperCase()}`,
      variant: 'success',
      dismissAfter: 6000,
    });
  };

  const toasterDeleteNotification = (actionName: string) => {
    toaster.push({
      message: `Keyboard shortcut named ${actionName} has been successfully deleted.`,
      variant: 'warning',
      dismissAfter: 4000,
    });
  };

  return (
    <Box overflow="auto" padding="space80" width="100%">
      <Heading as="h1" variant="heading10">
        My Shortcut Settings
      </Heading>
      <Tabs
        selectedId={randomComponentId}
        baseId="vertical-tabs-example"
        orientation="vertical"
      >
        <TabList aria-label="Vertical product tabs">
          <Tab id={randomComponentId}>Default keyboard shortcuts</Tab>
          <Tab>Custom keyboard shortcuts</Tab>
          <Tab>Settings</Tab>
          <Toaster {...toaster} />
        </TabList>
        <TabPanels>
          <TabPanel>
            <Heading as="h3" variant="heading30">
              Default keyboard shortcuts
            </Heading>
            <DefaultKeyboardShortcutsView
              reset={reset}
              setReset={setReset}
              noShortcuts={noShortcuts}
              isThrottleEnabled={isThrottleEnabled}
              isDeleteShortcutsEnabled={isDeleteShortcutsEnabled}
              toasterDeleteNotification={toasterDeleteNotification}
              toasterSuccessNotification={toasterSuccessNotification}
            />
          </TabPanel>
          <TabPanel>
            <Heading as="h3" variant="heading30">
              Custom keyboard shortcuts
            </Heading>
            <CustomKeyboardShortcutsView
              reset={reset}
              noShortcuts={noShortcuts}
              isThrottleEnabled={isThrottleEnabled}
              isDeleteShortcutsEnabled={isDeleteShortcutsEnabled}
              toasterDeleteNotification={toasterDeleteNotification}
              toasterSuccessNotification={toasterSuccessNotification}
            />
          </TabPanel>
          <TabPanel>
            <Heading as="h3" variant="heading30">
              Keyboard shortcuts settings
            </Heading>
            <Settings
              setReset={setReset}
              setNoShortcuts={setNoShortcuts}
              setIsThrottleEnabled={setIsThrottleEnabled}
              setIsDeleteShortcutsEnabled={setIsDeleteShortcutsEnabled}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default KeyboardShortcuts;
