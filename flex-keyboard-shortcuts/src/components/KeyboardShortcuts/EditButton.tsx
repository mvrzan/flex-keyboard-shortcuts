import { Button } from '@twilio-paste/core';
import { EditIcon } from '@twilio-paste/icons/esm/EditIcon';

interface EditButtonProps {
  shortcutKey: string;
  actionName: string;
  throttle: number | undefined;
  action: Function;
  openModalHandler: (
    shortcutKey: string,
    actionName: string,
    throttle: number | undefined
  ) => void;
}

const EditButton = ({
  shortcutKey,
  actionName,
  throttle,
  openModalHandler,
}: EditButtonProps) => {
  const clickHandler = (
    shortcutKey: string,
    actionName: string,
    throttle?: number
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
