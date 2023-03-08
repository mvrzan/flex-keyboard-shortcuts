import { Dispatch, SetStateAction, useState } from 'react';
import * as Flex from '@twilio/flex-ui';
import { useUID } from '@twilio-paste/core/uid-library';

import { ModalHeading, ModalFooterActions } from '@twilio-paste/core';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@twilio-paste/core';
import { Table, THead, Tr, Th, Td, TBody, Stack } from '@twilio-paste/core';
import { Box, Button, Label, Input, Separator } from '@twilio-paste/core';
import { Grid, Column } from '@twilio-paste/core';

import { getShortcuts } from '../../utils/keyboardShortcutsUtil';

interface ShortcutsObject {
  key: string;
  actionName: string;
  throttle?: number;
}

interface ModalProps {
  isEditModalOpen: boolean;
  selectedShortcutKey: string;
  selectedActionName: string;
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
  closeModalHandler,
  selectedShortcutKey,
  selectedActionName,
  setShortcuts,
  toasterSuccessNotification,
}: ModalProps) => {
  const [actionName, setActionName] = useState('');
  const [newShortcut, setNewShortcut] = useState('');

  const modalHeadingID = useUID();
  const titleInputID = useUID();

  const saveHandler = () => {
    Flex.KeyboardShortcutManager.remapShortcut(
      selectedShortcutKey,
      newShortcut
    );
    closeModalHandler();
    setShortcuts(getShortcuts());
    toasterSuccessNotification(
      selectedActionName,
      selectedShortcutKey,
      newShortcut
    );
  };

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
                  Current settings
                </ModalHeading>
                <Table>
                  <THead>
                    <Tr>
                      <Th>Current shortcut</Th>
                      <Th>Action name</Th>
                      <Th>Throttle</Th>
                    </Tr>
                  </THead>
                  <TBody>
                    <Tr>
                      <Td>{selectedActionName}</Td>
                      <Td>{selectedShortcutKey}</Td>
                      <Td>Nothing</Td>
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
                  New settings
                </ModalHeading>
                <Stack orientation="horizontal" spacing="space30">
                  <Stack orientation="vertical" spacing="space30">
                    <Label htmlFor="test">New keyboard shortcut</Label>
                    <Input
                      onChange={e => setNewShortcut(e.currentTarget.value)}
                      id={titleInputID}
                      type="text"
                      value={newShortcut}
                    />
                  </Stack>
                  {/* <Stack orientation="vertical" spacing="space30">
                    <Label htmlFor="test">Action name</Label>
                    <Input
                      onChange={e => setActionName(e.currentTarget.value)}
                      id={titleInputID}
                      type="text"
                      value={actionName}
                    />
                  </Stack> */}
                  <Stack orientation="vertical" spacing="space30">
                    <Label htmlFor="test">Throttle</Label>
                    <Input
                      onChange={e => setActionName(e.currentTarget.value)}
                      id={titleInputID}
                      type="text"
                      value={actionName}
                    />
                  </Stack>
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
          <Button variant="primary" onClick={saveHandler}>
            Save changes
          </Button>
        </ModalFooterActions>
      </ModalFooter>
    </Modal>
  );
};

export default ModalWindow;
