import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as Flex from '@twilio/flex-ui';
import { useUID } from '@twilio-paste/core/uid-library';

import { ModalHeading, ModalFooterActions } from '@twilio-paste/core';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@twilio-paste/core';
import { Table, THead, Tr, Th, Td, TBody, Stack } from '@twilio-paste/core';
import { Box, Button, Label, Input, Separator } from '@twilio-paste/core';
import { Grid, Column, HelpText } from '@twilio-paste/core';

import { getShortcuts } from '../../utils/keyboardShortcutsUtil';
import KeyCommand from './KeyCommand';
import { defaultActions } from '@twilio/flex-ui';

interface ShortcutsObject {
  key: string;
  actionName: string;
  throttle?: number;
}

interface ModalProps {
  isEditModalOpen: boolean;
  selectedShortcutKey: string;
  selectedActionName: string;
  selectedThrottle?: number;
  isThrottleEnabled: boolean;
  closeModalHandler: () => void;
  setShortcuts: Dispatch<SetStateAction<ShortcutsObject[]>>;
  toasterSuccessNotification: (
    actionName: string,
    oldShortcut: string,
    newShortcut: string
  ) => void;
}

const ModalWindow = ({
  isEditModalOpen,
  isThrottleEnabled,
  closeModalHandler,
  selectedShortcutKey,
  selectedActionName,
  selectedThrottle,
  setShortcuts,
  toasterSuccessNotification,
}: ModalProps) => {
  const [throttleValue, setThrottleValue] = useState('');
  const [newShortcut, setNewShortcut] = useState('');
  const [isSaveButtonVisible, setIsSaveButtonVisible] = useState(true);

  const modalHeadingID = useUID();
  const titleInputID = useUID();

  const saveHandler = () => {
    const lowerCamelCase = selectedActionName
      .toLowerCase()
      .split(' ')
      .map((word, index) => {
        if (index === 0) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join('');

    Flex.KeyboardShortcutManager.remapShortcut(
      selectedShortcutKey,
      typeof newShortcut === 'string' ? newShortcut.toUpperCase() : newShortcut,
      {
        action:
          Flex.defaultActions[lowerCamelCase as keyof typeof defaultActions],
        name: selectedActionName,
        throttle: +throttleValue,
      }
    );
    closeModalHandler();
    setShortcuts(getShortcuts());
    toasterSuccessNotification(
      selectedActionName,
      selectedShortcutKey,
      newShortcut
    );
  };

  useEffect(() => {
    if (newShortcut === '') {
      setIsSaveButtonVisible(false);
    }
    if (newShortcut !== '') {
      setIsSaveButtonVisible(true);
    }

    if (isNaN(+throttleValue)) {
      setIsSaveButtonVisible(false);
    }
  }, [newShortcut, throttleValue]);

  return (
    <Modal
      ariaLabelledby={modalHeadingID}
      size="default"
      isOpen={isEditModalOpen}
      onDismiss={closeModalHandler}
    >
      <ModalHeader>
        <ModalHeading as="h3" id={modalHeadingID}>
          Modify a keyboard shortcut
        </ModalHeading>
      </ModalHeader>
      <ModalBody>
        <Grid gutter="space50">
          <Column>
            <Box marginBottom="space50">
              <Stack orientation="vertical" spacing="space30">
                <ModalHeading as="h6" id={modalHeadingID}>
                  Current configuration
                </ModalHeading>
                <Table>
                  <THead>
                    <Tr>
                      <Th>Action name</Th>
                      <Th>Current shortcut</Th>
                      {isThrottleEnabled && <Th>Throttle (ms)</Th>}
                    </Tr>
                  </THead>
                  <TBody>
                    <Tr>
                      <Td>{selectedActionName}</Td>
                      <Td>
                        <KeyCommand keyCommand={selectedShortcutKey} />
                      </Td>
                      {isThrottleEnabled && (
                        <Td>
                          {selectedThrottle
                            ? selectedThrottle
                            : 'Not configured'}
                        </Td>
                      )}
                    </Tr>
                  </TBody>
                </Table>
              </Stack>
            </Box>
          </Column>
        </Grid>
        <Separator orientation="horizontal" />
        <Grid gutter="space50" marginTop="space30">
          <Column>
            <Box marginBottom="space50">
              <Stack orientation="vertical" spacing="space30">
                <ModalHeading as="h6" id={modalHeadingID}>
                  New configuration
                </ModalHeading>
                <Stack orientation="horizontal" spacing="space200">
                  <Stack orientation="vertical" spacing="space30">
                    <Label htmlFor="new-shortcut" required>
                      New keyboard shortcut
                    </Label>
                    <Input
                      required
                      onChange={e => setNewShortcut(e.currentTarget.value)}
                      id={titleInputID}
                      type="text"
                      value={newShortcut}
                      maxLength={1}
                      placeholder="Single character"
                    />
                    <HelpText>Enter your new keyboard shortcut</HelpText>
                  </Stack>
                  {isThrottleEnabled && (
                    <Stack orientation="vertical" spacing="space30">
                      <Label htmlFor="throttle">Throttle</Label>
                      <Input
                        id={titleInputID}
                        type="number"
                        onChange={e => setThrottleValue(e.currentTarget.value)}
                        hasError={isNaN(+throttleValue)}
                        placeholder="Number in milliseconds"
                        maxLength={5}
                      />
                      <HelpText>Enter the shortcut throttle</HelpText>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </Box>
          </Column>
        </Grid>
      </ModalBody>
      <ModalFooter>
        <ModalFooterActions>
          <Button variant="secondary" onClick={closeModalHandler}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={saveHandler}
            disabled={!isSaveButtonVisible}
          >
            Save changes
          </Button>
        </ModalFooterActions>
      </ModalFooter>
    </Modal>
  );
};

export default ModalWindow;
