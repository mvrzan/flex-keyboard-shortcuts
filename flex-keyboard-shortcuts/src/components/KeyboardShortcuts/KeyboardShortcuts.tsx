import { useEffect, useState } from 'react';

import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@twilio-paste/core/tabs';
import { useUID } from '@twilio-paste/core/uid-library';
import { Heading, Box, Tooltip, Text } from '@twilio-paste/core';
import { Table, THead, Tr, Th, Td, TBody } from '@twilio-paste/core';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shortcut, setShortcut] = useState('');
  const [action, setAction] = useState('');
  const selectedId = useUID();

  const openModalHandler = (shortcut: string, action: string) => {
    setIsModalOpen(true);
    setShortcut(shortcut);
    setAction(action);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
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
      {isModalOpen && (
        <ModalWindow
          isModalOpen={isModalOpen}
          closeModalHandler={closeModalHandler}
          shortcut={shortcut}
          action={action}
          setShortcuts={setShortcuts}
        />
      )}
    </Box>
  );
};

export default KeyboardShortcuts;
