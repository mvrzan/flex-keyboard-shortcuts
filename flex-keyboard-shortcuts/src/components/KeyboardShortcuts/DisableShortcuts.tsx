import * as Flex from '@twilio/flex-ui';
import { Button } from '@twilio-paste/core';

interface MyProps {
  getShortcuts: () => void;
}

const DisableShortcuts = ({ getShortcuts }: MyProps) => {
  const clickHandler = () => {
    Flex.KeyboardShortcutManager.disableShortcuts();
    getShortcuts();
  };
  return (
    <Button variant="destructive" onClick={clickHandler}>
      Disable all shortcuts
    </Button>
  );
};

export default DisableShortcuts;
