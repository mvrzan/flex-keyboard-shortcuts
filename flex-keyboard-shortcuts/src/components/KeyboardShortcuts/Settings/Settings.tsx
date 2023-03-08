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
            Enable key throttling
          </Heading>
          <Paragraph>
            The throttle time in milliseconds which can be set to prevent the
            shortcut from being triggered again within the set amount of time.
            Default value is 50ms to prevent Flex from being overloaded by
            repeated firings, and to provide a more seamless visual experience.
          </Paragraph>
          <Button
            variant="primary"
            onClick={() => {
              console.log(' Enable key throttling');
            }}
          >
            Enable key throttling
          </Button>
        </Card>
        <Card>
          <Heading as="h5" variant="heading50">
            Delete individual shortcuts
          </Heading>
          <Paragraph>
            This setting enables the Agent to delete individual keyboard
            shortcut mappings.
          </Paragraph>
          <Button
            variant="destructive"
            onClick={() => {
              console.log('Delete individual shortcuts');
            }}
          >
            Delete individual shortcuts
          </Button>
        </Card>
        <Card>
          <Heading as="h5" variant="heading50">
            Disable all shortcuts
          </Heading>
          <Paragraph>
            Disable all keyboard shortcuts, including the custom ones. Your
            shortcuts will no longer. Please keep in mind that this action
            cannot be reversed and you will have to reconfigure all of your
            keyboard shortcuts.
          </Paragraph>
          <Button variant="destructive" onClick={clickHandler}>
            Disable all shortcuts
          </Button>
        </Card>
        <Card>
          <Heading as="h5" variant="heading50">
            Reset keyboard shortcut settings
          </Heading>
          <Paragraph>
            Reset all of your keyboard shortcuts to the default values. This
            option will delete all of the custom shortcut mappings and revert
            the default keyboard shortcuts to its original values. This is an
            irreversible action.
          </Paragraph>
          <Button
            variant="destructive"
            onClick={() => {
              console.log(' Reset keyboard shortcuts');
            }}
          >
            Reset keyboard shortcuts
          </Button>
        </Card>
      </Stack>
    </>
  );
};

export default Settings;
