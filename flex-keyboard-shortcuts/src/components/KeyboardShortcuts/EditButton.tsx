import { Button } from '@twilio-paste/core';
import { EditIcon } from '@twilio-paste/icons/esm/EditIcon';

interface ButtonProps {
  shortcut: string;
  action: string;
  openModalHandler: (shortcut: string, action: string) => void;
}

const EditButton = ({ shortcut, action, openModalHandler }: ButtonProps) => {
  const clickHandler = (shortcut: string, action: string) => {
    openModalHandler(shortcut, action);
  };

  return (
    <Button
      variant="primary_icon"
      size="reset"
      onClick={() => {
        clickHandler(shortcut, action);
      }}
    >
      <EditIcon decorative={false} title="Edit" />
    </Button>
  );
};

export default EditButton;
