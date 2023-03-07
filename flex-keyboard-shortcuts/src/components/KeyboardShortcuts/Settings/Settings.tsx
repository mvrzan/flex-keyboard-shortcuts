import * as Flex from '@twilio/flex-ui';
import { Button, Heading, Stack, Paragraph, Card } from '@twilio-paste/core';

interface MyProps {
  setShortcuts: ([]) => void;
}

const Settings = (props: MyProps) => {
  const clickHandler = () => {
    Flex.KeyboardShortcutManager.disableShortcuts();
    props.setShortcuts([]);
  };

  return (
    <>
      <Heading as="h3" variant="heading30">
        Keyboard shortcuts settings
      </Heading>
      <Stack orientation="vertical" spacing="space60">
        <Card>
          <Heading as="h5" variant="heading50">
            Disable all shortcuts
          </Heading>
          <Paragraph>
            Disable all keyboard shortcuts, including the custom ones.
          </Paragraph>
          <Button variant="destructive" onClick={clickHandler}>
            Disable all shortcuts
          </Button>
        </Card>
      </Stack>
    </>
  );
};

export default Settings;
