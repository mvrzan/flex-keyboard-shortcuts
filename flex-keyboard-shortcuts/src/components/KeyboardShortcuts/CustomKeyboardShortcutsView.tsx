import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import * as Flex from '@twilio/flex-ui';

import { Table, THead, Tr, Th, Td, TBody } from '@twilio-paste/core';
import { Tooltip, Text, Stack, Box, Button } from '@twilio-paste/core';
import { InformationIcon } from '@twilio-paste/icons/esm/InformationIcon';
import { DeleteIcon } from '@twilio-paste/icons/esm/DeleteIcon';
import { EditIcon } from '@twilio-paste/icons/esm/EditIcon';
import KeyCommand from './KeyCommand';
import { getCustomShortcuts } from '../../utils/keyboardShortcutsUtil';

import { ShortcutsObject } from '../../types/types';

import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

interface CustomKeyboardShortcutsViewProps {
  isThrottleEnabled: boolean;
  canDeleteShortcuts: boolean;
  openModalHandler: (
    shortcutKey: string,
    actionName: string,
    throttle?: number
  ) => void;
  toasterDeleteNotification: (actionName: string) => void;
}

const CustomKeyboardShortcutsView = ({
  isThrottleEnabled,
  canDeleteShortcuts,
  openModalHandler,
  toasterDeleteNotification,
}: CustomKeyboardShortcutsViewProps) => {
  const [customShortcuts, setCustomShortcuts] = useState<ShortcutsObject[]>([]);

  const deleteShortcutHandler = (shortcutKey: string, actionName: string) => {
    const newArray = customShortcuts.filter(
      shortcut => shortcut.key !== shortcutKey
    );

    setCustomShortcuts(newArray);
    Flex.KeyboardShortcutManager.deleteShortcuts([shortcutKey]);
    toasterDeleteNotification(actionName);
  };

  // const editShortcutHandler = (
  //   shortcutKey: string,
  //   actionName: string,
  //   throttle: number
  // ) => {
  //   openModalHandler(shortcutKey, actionName, throttle);
  // };

  useEffect(() => {
    setCustomShortcuts(getCustomShortcuts());
  }, []);

  return (
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
                  <Td>{item.throttle ? item.throttle : 'Not configured'}</Td>
                )}
                <Td>
                  <Stack orientation="horizontal" spacing="space30">
                    {/* <Button
                      variant="primary_icon"
                      size="reset"
                      onClick={() => {
                        const throttle = item.throttle
                          ? item.throttle
                          : 'Not configured';
                        editShortcutHandler(
                          item.key,
                          item.actionName,
                          +throttle
                        );
                      }}
                    >
                      <EditIcon decorative={false} title="Edit" />
                    </Button> */}
                    <EditButton
                      shortcutKey={item.key}
                      actionName={item.actionName}
                      throttle={item.throttle}
                      setCustomShortcuts={setCustomShortcuts}
                      openModalHandler={openModalHandler}
                    />
                    {canDeleteShortcuts && (
                      <Button
                        variant="primary_icon"
                        size="reset"
                        onClick={() => {
                          deleteShortcutHandler(item.key, item.actionName);
                        }}
                      >
                        <DeleteIcon decorative={false} title="Edit" />
                      </Button>
                    )}
                  </Stack>
                </Td>
              </Tr>
            );
          })}
        </TBody>
      </Table>
    </Box>
  );
};

export default CustomKeyboardShortcutsView;

// export const MemoizedCustomShortcuts = React.memo(CustomKeyboardShortcutsView);
