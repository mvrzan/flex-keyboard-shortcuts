import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Paragraph } from '@twilio-paste/core';
import { Table, THead, Tr, Th, Td, TBody } from '@twilio-paste/core';
import { Box, Tooltip, Text, Heading, Stack, Card } from '@twilio-paste/core';
import { InformationIcon } from '@twilio-paste/icons/esm/InformationIcon';
import { WarningIcon } from '@twilio-paste/icons/esm/WarningIcon';

import KeyCommand from '../KeyCommand';
import EditButton from '../EditButton';
import DeleteButton from '../DeleteButton';
import ModalWindow from '../ModalWindow';
import { ShortcutsObject } from '../../../types/types';
import { getDefaultShortcuts } from '../../../utils/DefaultKeyboardShortcutsUtil';

interface DefaultKeyboardShortcutsViewProps {
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

const DefaultKeyboardShortcuts = ({
  noShortcuts,
  isThrottleEnabled,
  canDeleteShortcuts,
  toasterDeleteNotification,
  toasterSuccessNotification,
}: DefaultKeyboardShortcutsViewProps) => {
  const [defaultShortcuts, setDefaultShortcuts] = useState<ShortcutsObject[]>(
    []
  );
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
    setDefaultShortcuts(getDefaultShortcuts());
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
                            setShortcuts={setDefaultShortcuts}
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
            shortcuts={defaultShortcuts}
            setShortcuts={setDefaultShortcuts}
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

export default DefaultKeyboardShortcuts;
