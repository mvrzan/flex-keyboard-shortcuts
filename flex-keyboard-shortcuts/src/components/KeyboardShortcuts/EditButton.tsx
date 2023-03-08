import { Button } from '@twilio-paste/core';
import { EditIcon } from '@twilio-paste/icons/esm/EditIcon';

interface EditButtonProps {
  shortcutKey: string;
  actionName: string;
  openModalHandler: (shortcutKey: string, actionName: string) => void;
}

const EditButton = ({
  shortcutKey,
  actionName,
  openModalHandler,
}: EditButtonProps) => {
  const clickHandler = (shortcutKey: string, actionName: string): void => {
    openModalHandler(shortcutKey, actionName);
  };

  return (
    <Button
      variant="primary_icon"
      size="reset"
      onClick={() => {
        clickHandler(shortcutKey, actionName);
      }}
    >
      <EditIcon decorative={false} title="Edit" />
    </Button>
  );
};

export default EditButton;
