import { Button } from '@twilio-paste/core';
import { EditIcon } from '@twilio-paste/icons/esm/EditIcon';

import { Dispatch, SetStateAction } from 'react';
import { ShortcutsObject } from '../../types/types';

interface EditButtonProps {
  shortcutKey: string;
  actionName: string;
  throttle?: number;
  setCustomShortcuts?: Dispatch<SetStateAction<ShortcutsObject[]>>;
  openModalHandler: (
    shortcutKey: string,
    actionName: string,
    throttle?: number
  ) => void;
}

const EditButton = ({
  shortcutKey,
  actionName,
  throttle,
  openModalHandler,
  setCustomShortcuts,
}: EditButtonProps) => {
  const clickHandler = (
    shortcutKey: string,
    actionName: string,
    throttle?: number,
    setCustomShortcuts?: Dispatch<SetStateAction<ShortcutsObject[]>>
  ): void => {
    openModalHandler(shortcutKey, actionName, throttle);
  };

  return (
    <Button
      variant="primary_icon"
      size="reset"
      onClick={() => {
        clickHandler(shortcutKey, actionName, throttle);
      }}
    >
      <EditIcon decorative={false} title="Edit" />
    </Button>
  );
};

export default EditButton;
