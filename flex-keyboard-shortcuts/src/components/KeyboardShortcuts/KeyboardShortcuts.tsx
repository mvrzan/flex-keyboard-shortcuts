import { useState } from 'react';
import { useUID } from '@twilio-paste/core/uid-library';

import { Tab, Tabs, TabList, TabPanel, TabPanels } from '@twilio-paste/core';
import { useToaster, Toaster } from '@twilio-paste/core/toast';
import { Box, Heading } from '@twilio-paste/core';

import CustomKeyboardShortcutsView from './Tabs/CustomKeyboardShortcutsView';
import DefaultKeyboardShortcutsView from './Tabs/DefaultKeyboardShortcuts';
import Settings from './Settings/Settings';

const KeyboardShortcuts = () => {
  const [noShortcuts, setNoShortcuts] = useState(false);
  const [canDeleteShortcuts, setCanDeleteShortcuts] = useState(false);
  const [isThrottleEnabled, setIsThrottleEnabled] = useState(false);
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
              noShortcuts={noShortcuts}
              isThrottleEnabled={isThrottleEnabled}
              canDeleteShortcuts={canDeleteShortcuts}
              toasterDeleteNotification={toasterDeleteNotification}
              toasterSuccessNotification={toasterSuccessNotification}
            />
          </TabPanel>
          <TabPanel>
            <Heading as="h3" variant="heading30">
              Custom keyboard shortcuts options
            </Heading>
            <CustomKeyboardShortcutsView
              noShortcuts={noShortcuts}
              isThrottleEnabled={isThrottleEnabled}
              canDeleteShortcuts={canDeleteShortcuts}
              toasterDeleteNotification={toasterDeleteNotification}
              toasterSuccessNotification={toasterSuccessNotification}
            />
          </TabPanel>
          <TabPanel>
            <Settings
              setNoShortcuts={setNoShortcuts}
              setIsThrottleEnabled={setIsThrottleEnabled}
              setCanDeleteShortcuts={setCanDeleteShortcuts}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default KeyboardShortcuts;
