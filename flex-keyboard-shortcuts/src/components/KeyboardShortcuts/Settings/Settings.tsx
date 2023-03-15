import * as Flex from '@twilio/flex-ui';
import { useState, Dispatch, SetStateAction } from 'react';

import { Button, Heading, Stack } from '@twilio-paste/core';
import { Card, Paragraph, Switch } from '@twilio-paste/core';
import { useToaster, Toaster } from '@twilio-paste/core/toast';

interface SettingsProps {
  setIsThrottleEnabled: Dispatch<SetStateAction<boolean>>;
  setNoShortcuts: Dispatch<React.SetStateAction<boolean>>;
  setCanDeleteShortcuts: Dispatch<React.SetStateAction<boolean>>;
}

const Settings = ({
  setIsThrottleEnabled,
  setNoShortcuts,
  setCanDeleteShortcuts,
}: SettingsProps) => {
  const [throttling, setThrottling] = useState(false);
  const [deleteShortcut, setDeleteShortcut] = useState(false);
  const [disableShortcuts, setDisabledShortcuts] = useState(false);
  const [resetShortcuts, setResetShortcuts] = useState(false);
  const toaster = useToaster();

  const toasterShortcutsDisabledNotification = () => {
    toaster.push({
      message: `All keyboard shortcuts have been disabled.`,
      variant: 'error',
      dismissAfter: 3000,
    });
  };

  const throttlingHandler = () => {
    setThrottling(!throttling);
    setIsThrottleEnabled(!throttling);
  };

  const deleteShortcutsHandler = () => {
    setCanDeleteShortcuts(!deleteShortcut);
    setDeleteShortcut(!deleteShortcut);
  };

  const clickHandler = () => {
    Flex.KeyboardShortcutManager.disableShortcuts();
    setNoShortcuts(true);
    setDisabledShortcuts(false);
    toasterShortcutsDisabledNotification();
  };

  return (
    <>
      <Toaster {...toaster} />
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
          <Switch
            value="throttling"
            checked={throttling}
            onChange={throttlingHandler}
          >
            Enable key throttling
          </Switch>
        </Card>
        <Card>
          <Heading as="h5" variant="heading50">
            Delete individual shortcuts
          </Heading>
          <Paragraph>
            This setting enables the Agent to delete individual keyboard
            shortcut mappings.
          </Paragraph>
          <Switch
            value="delete"
            checked={deleteShortcut}
            onChange={deleteShortcutsHandler}
          >
            Delete individual shortcuts
          </Switch>
        </Card>
        <Card>
          <Heading as="h5" variant="heading50">
            Remove all shortcuts
          </Heading>
          <Paragraph>
            Remove all keyboard shortcuts, including the custom ones; your
            shortcuts will no longer work. Please keep in mind that this action
            cannot be reversed and you will have to reconfigure all of your
            keyboard shortcuts. This is an irreversible action
          </Paragraph>
          {disableShortcuts ? (
            <Stack orientation="horizontal" spacing="space30">
              <Button
                variant="secondary"
                onClick={() => setDisabledShortcuts(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={clickHandler}>
                Save
              </Button>
            </Stack>
          ) : (
            <Button
              variant="destructive"
              onClick={() => setDisabledShortcuts(true)}
            >
              Remove all shortcuts
            </Button>
          )}
        </Card>
        <Card>
          <Heading as="h5" variant="heading50">
            Reset keyboard shortcut settings
          </Heading>
          <Paragraph>
            Reset all of your keyboard shortcuts to the default values. This
            option will delete all of the custom shortcut mappings and revert
            them to their original values. This is an irreversible action.
          </Paragraph>
          <Button
            variant="destructive"
            onClick={() => {
              console.log('Reset keyboard shortcuts');
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
