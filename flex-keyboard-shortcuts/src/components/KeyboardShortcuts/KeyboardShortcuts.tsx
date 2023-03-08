import { useEffect, useState } from 'react';
import { useUID } from '@twilio-paste/core/uid-library';

import { Tab, Tabs, TabList, TabPanel, TabPanels } from '@twilio-paste/core';
import { Table, THead, Tr, Th, Td, TBody } from '@twilio-paste/core';
import { Box, Tooltip, Text, Heading, Stack } from '@twilio-paste/core';
import { useToaster, Toaster } from '@twilio-paste/core/toast';
import { InformationIcon } from '@twilio-paste/icons/esm/InformationIcon';

import EditButton from './EditButton';
import ModalWindow from './ModalWindow';
import Settings from './Settings/Settings';
import { getShortcuts } from '../../utils/keyboardShortcutsUtil';

interface ShortcutsObject {
  key: string;
  actionName: string;
  throttle?: number;
}

const KeyboardShortcuts = () => {
  const [shortcuts, setShortcuts] = useState<ShortcutsObject[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedShortcutKey, setSelectedShortcutKey] = useState('');
  const [selectedActionName, setSelectedActionName] = useState('');
  const randomComponentId = useUID();
  const toaster = useToaster();

  const toasterSuccessNotification = (
    actionName: string,
    oldShortcut: string,
    newShortcut: string
  ) => {
    toaster.push({
      message: `Keyboard action ${actionName} modified successfully from ${oldShortcut} to ${newShortcut}!
      Your new keyboard shortcut is: Ctrl + Shift + ${newShortcut}`,
      variant: 'success',
      dismissAfter: 3000,
    });
  };

  const openModalHandler = (shortcut: string, action: string) => {
    setIsEditModalOpen(true);
    setSelectedShortcutKey(shortcut);
    setSelectedActionName(action);
  };

  const closeModalHandler = () => {
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    const shortcutValues = getShortcuts();
    setShortcuts(shortcutValues);
  }, []);

  return (
    <Box overflow="auto" padding="space80" width="100%">
      <Heading as="h1" variant="heading10">
        My Shortcut Settings
      </Heading>
      <Tabs selectedId={randomComponentId} baseId="vertical-tabs-example">
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
            <Table>
              <THead>
                <Tr>
                  <Th>
                    <Stack orientation="horizontal" spacing="space30">
                      <Tooltip text="Ctrl and Shift are the default modifiers that cannot be changed.">
                        <Text as="span">Modifiers</Text>
                      </Tooltip>
                      <InformationIcon decorative={false} title="modifiers" />
                    </Stack>
                  </Th>
                  <Th>Shortcuts</Th>
                  <Th>Actions</Th>
                  <Th>Edit</Th>
                </Tr>
              </THead>
              <TBody>
                {shortcuts.map(item => {
                  return (
                    <Tr key={item.key}>
                      <Td>Ctrl + Shift</Td>
                      <Td>{item.key}</Td>
                      <Td>{item.actionName}</Td>
                      <Td>
                        <EditButton
                          shortcutKey={item.key}
                          actionName={item.actionName}
                          openModalHandler={openModalHandler}
                        />
                      </Td>
                    </Tr>
                  );
                })}
              </TBody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Heading as="h3" variant="heading30">
              Custom keyboard shortcuts options
            </Heading>
          </TabPanel>
          <TabPanel>
            <Settings setShortcuts={setShortcuts} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {isEditModalOpen && (
        <ModalWindow
          isEditModalOpen={isEditModalOpen}
          closeModalHandler={closeModalHandler}
          selectedShortcutKey={selectedShortcutKey}
          selectedActionName={selectedActionName}
          setShortcuts={setShortcuts}
          toasterSuccessNotification={toasterSuccessNotification}
        />
      )}
    </Box>
  );
};

export default KeyboardShortcuts;
