import { useEffect, useState } from 'react';

import { Tab, Tabs, TabList, TabPanel, TabPanels } from '@twilio-paste/core';
import { Table, THead, Tr, Th, Td, TBody } from '@twilio-paste/core';
import { Box, Tooltip, Text, Heading } from '@twilio-paste/core';
import { useToaster, Toaster } from '@twilio-paste/core/toast';
import { useUID } from '@twilio-paste/core/uid-library';

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
  const [selectedShortcut, setSelectedShortcut] = useState('');
  const [action, setAction] = useState('');
  const selectedId = useUID();
  const toaster = useToaster();

  const toasterClickHandler = () => {
    toaster.push({
      message:
        'Keyboard shortcut Toggle Activity Menu modified successfully from S to 5!',
      variant: 'success',
      dismissAfter: 2000,
    });
  };

  const openModalHandler = (shortcut: string, action: string) => {
    setIsEditModalOpen(true);
    setSelectedShortcut(shortcut);
    setAction(action);
  };

  const closeModalHandler = () => {
    setIsEditModalOpen(false);
    getShortcuts();
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
      <Tabs selectedId={selectedId} baseId="vertical-tabs-example">
        <TabList aria-label="Vertical product tabs">
          <Tab id={selectedId}>Default keyboard shortcuts</Tab>
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
                    <Tooltip text="Ctrl and Shift are the default modifiers that cannot be changed.">
                      <Text as="p">Modifiers</Text>
                    </Tooltip>
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
                          shortcut={item.actionName}
                          action={item.key}
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
          selectedShortcut={selectedShortcut}
          action={action}
          setShortcuts={setShortcuts}
          toasterClickHandler={toasterClickHandler}
        />
      )}
    </Box>
  );
};

export default KeyboardShortcuts;
