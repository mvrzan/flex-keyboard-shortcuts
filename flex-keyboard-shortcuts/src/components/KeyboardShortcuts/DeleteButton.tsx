import { Dispatch, SetStateAction } from 'react';

import * as Flex from '@twilio/flex-ui';
import { Button } from '@twilio-paste/core';
import { DeleteIcon } from '@twilio-paste/icons/esm/DeleteIcon';
import { ShortcutsObject } from '../../types/types';

interface DeleteButtonProps {
  shortcutKey: string;
  actionName: string;
  shortcuts: ShortcutsObject[];
  setShortcuts: Dispatch<SetStateAction<ShortcutsObject[]>>;
  toasterDeleteNotification: (actionName: string) => void;
}

const DeleteButton = ({
  shortcutKey,
  actionName,
  shortcuts,
  setShortcuts,
  toasterDeleteNotification,
}: DeleteButtonProps) => {
  const deleteShortcutHandler = () => {
    const updatedDefaultShortcuts = shortcuts.filter(
      shortcut => shortcut.key !== shortcutKey
    );
    setShortcuts(updatedDefaultShortcuts);

    Flex.KeyboardShortcutManager.deleteShortcuts([shortcutKey]);
    toasterDeleteNotification(actionName);
  };

  return (
    <Button variant="primary_icon" size="reset" onClick={deleteShortcutHandler}>
      <DeleteIcon decorative={false} title="Edit" />
    </Button>
  );
};

export default DeleteButton;
