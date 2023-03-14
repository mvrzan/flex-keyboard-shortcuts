import { useEffect, useState } from 'react';
import { useUID } from '@twilio-paste/core/uid-library';

import { Paragraph } from '@twilio-paste/core';
import { useToaster, Toaster } from '@twilio-paste/core/toast';
import { Table, THead, Tr, Th, Td, TBody } from '@twilio-paste/core';
import { Tab, Tabs, TabList, TabPanel, TabPanels } from '@twilio-paste/core';
import { Box, Tooltip, Text, Heading, Stack, Card } from '@twilio-paste/core';
import { InformationIcon } from '@twilio-paste/icons/esm/InformationIcon';
import { WarningIcon } from '@twilio-paste/icons/esm/WarningIcon';

import KeyCommand from './KeyCommand';
import EditButton from './EditButton';
import ModalWindow from './ModalWindow';
import Settings from './Settings/Settings';
import { getDefaultShortcuts } from '../../utils/DefaultKeyboardShortcutsUtil';

import DeleteButton from './DeleteButton';
import CustomKeyboardShortcutsView from './CustomKeyboardShortcutsView';

import { ShortcutsObject } from '../../types/types';
import { Dispatch, SetStateAction } from 'react';

const KeyboardShortcuts = () => {
  const [defaultShortcuts, setDefaultShortcuts] = useState<ShortcutsObject[]>(
    []
  );
  const [noShortcuts, setNoShortcuts] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [canDeleteShortcuts, setCanDeleteShortcuts] = useState(false);
  const [selectedShortcutKey, setSelectedShortcutKey] = useState('');
  const [selectedActionName, setSelectedActionName] = useState('');
  const [selectedThrottle, setSelectedThrottle] = useState<number | undefined>(
    0
  );
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

  const openModalHandler = (
    shortcut: string,
    action: string,
    throttle?: number,
    setCustomShortcuts?: Dispatch<SetStateAction<ShortcutsObject[]>>
  ) => {
    setIsEditModalOpen(true);
    setSelectedShortcutKey(shortcut);
    setSelectedActionName(action);
    setSelectedThrottle(throttle);
  };

  const closeModalHandler = () => {
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    const initialShortcuts = getDefaultShortcuts();
    if (initialShortcuts.length === 0) {
      setNoShortcuts(true);
      setDefaultShortcuts([]);
    }
    setDefaultShortcuts(initialShortcuts);
  }, []);

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
            {noShortcuts ? (
              <Card>
                <Heading as="h5" variant="heading50">
                  <Stack orientation="horizontal" spacing="space20">
                    <WarningIcon
                      decorative={false}
                      title="Description of icon"
                    />
                    Re-enable Keyboard Shortcuts
                  </Stack>
                </Heading>
                <Paragraph>
                  There are no configured keyboard shortcuts. Please reset your
                  keyboard settings to enable keyboard shortcut customization.
                </Paragraph>
              </Card>
            ) : (
              <Box overflowY="auto" maxHeight="1000px">
                <Table>
                  <THead stickyHeader top={0}>
                    <Tr>
                      <Th>
                        <Stack orientation="horizontal" spacing="space30">
                          <Tooltip text="Ctrl and Shift are the default modifiers that cannot be changed.">
                            <Text as="span">Modifiers</Text>
                          </Tooltip>
                          <InformationIcon
                            decorative={false}
                            title="modifiers"
                          />
                        </Stack>
                      </Th>
                      <Th>
                        <Text as="span">Shortcuts</Text>
                      </Th>
                      <Th>
                        <Text as="span">Actions</Text>
                      </Th>
                      {isThrottleEnabled && (
                        <Th>
                          <Text as="span">Throttle (ms)</Text>
                        </Th>
                      )}
                      <Th>
                        <Text as="span">Edit</Text>
                      </Th>
                    </Tr>
                  </THead>
                  <TBody>
                    {defaultShortcuts.map(item => {
                      return (
                        <Tr key={item.key}>
                          <Td>
                            <KeyCommand keyCommand="Ctrl" /> +{' '}
                            <KeyCommand keyCommand="Shift" />
                          </Td>
                          <Td>
                            <KeyCommand keyCommand={item.key} />{' '}
                          </Td>
                          <Td>{item.actionName}</Td>
                          {isThrottleEnabled && (
                            <Td>
                              {item.throttle ? item.throttle : 'Not configured'}
                            </Td>
                          )}
                          <Td>
                            <Stack orientation="horizontal" spacing="space30">
                              <EditButton
                                shortcutKey={item.key}
                                actionName={item.actionName}
                                throttle={item.throttle}
                                openModalHandler={openModalHandler}
                              />
                              {canDeleteShortcuts && (
                                <DeleteButton
                                  shortcutKey={item.key}
                                  actionName={item.actionName}
                                  shortcuts={defaultShortcuts}
                                  setDefaultShortcuts={setDefaultShortcuts}
                                  toasterDeleteNotification={
                                    toasterDeleteNotification
                                  }
                                />
                              )}
                            </Stack>
                          </Td>
                        </Tr>
                      );
                    })}
                  </TBody>
                </Table>
              </Box>
            )}
          </TabPanel>
          <TabPanel>
            <Heading as="h3" variant="heading30">
              Custom keyboard shortcuts options
            </Heading>
            <CustomKeyboardShortcutsView
              isThrottleEnabled={isThrottleEnabled}
              canDeleteShortcuts={canDeleteShortcuts}
              toasterDeleteNotification={toasterDeleteNotification}
              openModalHandler={openModalHandler}
            />
          </TabPanel>
          <TabPanel>
            <Settings
              setShortcuts={setDefaultShortcuts}
              setNoShortcuts={setNoShortcuts}
              setIsThrottleEnabled={setIsThrottleEnabled}
              setCanDeleteShortcuts={setCanDeleteShortcuts}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ModalWindow
        shortcuts={defaultShortcuts}
        setDefaultShortcuts={setDefaultShortcuts}
        isEditModalOpen={isEditModalOpen}
        closeModalHandler={closeModalHandler}
        selectedShortcutKey={selectedShortcutKey}
        selectedActionName={selectedActionName}
        selectedThrottle={selectedThrottle}
        toasterSuccessNotification={toasterSuccessNotification}
        isThrottleEnabled={isThrottleEnabled}
      />
    </Box>
  );
};

export default KeyboardShortcuts;
