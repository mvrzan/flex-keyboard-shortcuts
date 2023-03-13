import { Dispatch, SetStateAction } from 'react';

import * as Flex from '@twilio/flex-ui';
import { Button } from '@twilio-paste/core';
import { DeleteIcon } from '@twilio-paste/icons/esm/DeleteIcon';
import { getShortcuts } from '../../utils/keyboardShortcutsUtil';

interface ShortcutsObject {
  key: string;
  actionName: string;
  throttle?: number;
}

interface DeleteButtonProps {
  shortcutKey: string;
  actionName: string;
  setShortcuts: Dispatch<SetStateAction<ShortcutsObject[]>>;
  toasterDeleteNotification: (actionName: string) => void;
}

const DeleteButton = ({
  shortcutKey,
  actionName,
  setShortcuts,
  toasterDeleteNotification,
}: DeleteButtonProps) => {
  const deleteShortcutHandler = () => {
    console.log(`I am deleting ${shortcutKey}, ${actionName}`);
    Flex.KeyboardShortcutManager.deleteShortcuts([shortcutKey]);
    setShortcuts(getShortcuts());
    toasterDeleteNotification(actionName);
  };

  return (
    <Button variant="primary_icon" size="reset" onClick={deleteShortcutHandler}>
      <DeleteIcon decorative={false} title="Edit" />
    </Button>
  );
};

export default DeleteButton;
