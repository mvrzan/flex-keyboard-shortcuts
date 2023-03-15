import React, { useEffect, useState } from 'react';

import { Table, THead, Tr, Th, Td, TBody } from '@twilio-paste/core';
import { Tooltip, Text, Stack, Box } from '@twilio-paste/core';
import { Heading, Paragraph, Card } from '@twilio-paste/core';
import { WarningIcon } from '@twilio-paste/icons/esm/WarningIcon';
import { InformationIcon } from '@twilio-paste/icons/esm/InformationIcon';

import EditButton from '../EditButton';
import KeyCommand from '../KeyCommand';
import ModalWindow from '../ModalWindow';
import DeleteButton from '../DeleteButton';
import { ShortcutsObject } from '../../../types/types';
import { getCustomShortcuts } from '../../../utils/keyboardShortcutsUtil';

interface CustomKeyboardShortcutsViewProps {
  noShortcuts: boolean;
  isThrottleEnabled: boolean;
  canDeleteShortcuts: boolean;
  toasterDeleteNotification: (actionName: string) => void;
  toasterSuccessNotification: (
    actionName: string,
    oldShortcut: string,
    newShortcut: string
  ) => void;
}

const CustomKeyboardShortcutsView = ({
  noShortcuts,
  isThrottleEnabled,
  canDeleteShortcuts,
  toasterDeleteNotification,
  toasterSuccessNotification,
}: CustomKeyboardShortcutsViewProps) => {
  const [customShortcuts, setCustomShortcuts] = useState<ShortcutsObject[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedShortcutKey, setSelectedShortcutKey] = useState('');
  const [selectedActionName, setSelectedActionName] = useState('');
  const [selectedThrottle, setSelectedThrottle] = useState<number | undefined>(
    0
  );

  const openModalHandler = (
    shortcut: string,
    action: string,
    throttle?: number
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
    setCustomShortcuts(getCustomShortcuts());
  }, []);

  return (
    <>
      {noShortcuts ? (
        <Card>
          <Heading as="h5" variant="heading50">
            <Stack orientation="horizontal" spacing="space20">
              <WarningIcon decorative={false} title="Description of icon" />
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
                    <InformationIcon decorative={false} title="modifiers" />
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
              {customShortcuts.map(item => {
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
                            shortcuts={customShortcuts}
                            setShortcuts={setCustomShortcuts}
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
          <ModalWindow
            shortcuts={customShortcuts}
            setShortcuts={setCustomShortcuts}
            isEditModalOpen={isEditModalOpen}
            closeModalHandler={closeModalHandler}
            selectedShortcutKey={selectedShortcutKey}
            selectedActionName={selectedActionName}
            selectedThrottle={selectedThrottle}
            toasterSuccessNotification={toasterSuccessNotification}
            isThrottleEnabled={isThrottleEnabled}
          />
        </Box>
      )}
    </>
  );
};

export default CustomKeyboardShortcutsView;
