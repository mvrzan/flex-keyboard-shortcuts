import { Dispatch, SetStateAction, useState } from 'react';

import * as Flex from '@twilio/flex-ui';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalFooterActions,
  ModalHeader,
  ModalHeading,
} from '@twilio-paste/core/modal';
import { Table, THead, Tr, Th, Td, TBody, Stack } from '@twilio-paste/core';
import {
  Box,
  Button,
  Grid,
  Column,
  Label,
  Input,
  Separator,
} from '@twilio-paste/core';
import { useUID } from '@twilio-paste/core/uid-library';

import { getShortcuts } from '../../utils/keyboardShortcutsUtil';

interface ShortcutsObject {
  key: string;
  actionName: string;
  throttle?: number;
}

interface ModalProps {
  isEditModalOpen: boolean;
  selectedShortcut: string;
  action: string;
  closeModalHandler: () => void;
  setShortcuts: Dispatch<SetStateAction<ShortcutsObject[]>>;
  toasterClickHandler: () => void;
}

const ModalWindow = ({
  isEditModalOpen,
  closeModalHandler,
  selectedShortcut,
  action,
  setShortcuts,
  toasterClickHandler,
}: ModalProps) => {
  const [actionName, setActionName] = useState('');
  const [newShortcut, setNewShortcut] = useState('');

  const modalHeadingID = useUID();
  const titleInputID = useUID();

  const saveHandler = () => {
    Flex.KeyboardShortcutManager.remapShortcut(action, newShortcut);
    closeModalHandler();
    setShortcuts(getShortcuts());
    toasterClickHandler();
  };

  console.log('From Modal', 'shortcut', selectedShortcut, 'action', action);
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
                      <Td>{action}</Td>
                      <Td>{selectedShortcut}</Td>
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
                  <Stack orientation="vertical" spacing="space30">
                    <Label htmlFor="test">Action name</Label>
                    <Input
                      onChange={e => setActionName(e.currentTarget.value)}
                      id={titleInputID}
                      type="text"
                      value={actionName}
                    />
                  </Stack>
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
