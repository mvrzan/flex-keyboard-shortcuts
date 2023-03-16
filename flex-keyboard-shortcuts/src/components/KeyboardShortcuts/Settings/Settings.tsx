import * as Flex from '@twilio/flex-ui';
import { useState, Dispatch, SetStateAction, useEffect } from 'react';

import { Button, Heading, Stack } from '@twilio-paste/core';
import { Card, Paragraph, Switch } from '@twilio-paste/core';
import { useToaster, Toaster } from '@twilio-paste/core/toast';
import { resetKeyboardShortcutsUtil } from '../../../utils/KeyboardShortcutsUtil';

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

  const localDeleteSetting = localStorage.getItem('deleteShortcuts');
  const localThrottlingSetting = localStorage.getItem('enableThrottling');
  const localRemoveAllSetting = localStorage.getItem('removeAllShortcuts');

  const toasterShortcutsDisabledNotification = () => {
    toaster.push({
      message: `All keyboard shortcuts have been disabled.`,
      variant: 'error',
      dismissAfter: 4000,
    });
  };

  const toasterResetNotification = () => {
    toaster.push({
      message: `All keyboard shortcuts have been reset to the default values!`,
      variant: 'warning',
      dismissAfter: 4000,
    });
  };

  const throttlingHandler = () => {
    setThrottling(!throttling);
    setIsThrottleEnabled(!throttling);
    localStorage.setItem(
      'enableThrottling',
      localStorage.getItem('enableThrottling') === 'true' ? 'false' : 'true'
    );
  };

  const deleteShortcutsHandler = () => {
    setCanDeleteShortcuts(!deleteShortcut);
    setDeleteShortcut(!deleteShortcut);
    localStorage.setItem(
      'deleteShortcuts',
      localStorage.getItem('deleteShortcuts') === 'true' ? 'false' : 'true'
    );
  };

  const removeAllShortcutsHandler = () => {
    Flex.KeyboardShortcutManager.disableShortcuts();
    setNoShortcuts(true);
    setDisabledShortcuts(false);
    toasterShortcutsDisabledNotification();
    localStorage.setItem(
      'removeAllShortcuts',
      localStorage.getItem('removeAllShortcuts') === 'true' ? 'false' : 'true'
    );
  };

  const resetShortcutsHandler = () => {
    localStorage.removeItem('deleteShortcuts');
    setDeleteShortcut(false);
    localStorage.removeItem('enableThrottling');
    setThrottling(false);
    localStorage.removeItem('removeAllShortcuts');
    toasterResetNotification();
    setNoShortcuts(false);
    setResetShortcuts(false);

    resetKeyboardShortcutsUtil();
  };

  useEffect(() => {
    if (localDeleteSetting === 'true') {
      setDeleteShortcut(true);
      setCanDeleteShortcuts(true);
    }
    if (localThrottlingSetting === 'true') {
      setThrottling(true);
      setIsThrottleEnabled(true);
    }
    if (localRemoveAllSetting === 'true') {
      setDisabledShortcuts(false);
      setNoShortcuts(true);
      Flex.KeyboardShortcutManager.disableShortcuts();
    }
  }, []);

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
              <Button variant="destructive" onClick={removeAllShortcutsHandler}>
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
          {resetShortcuts ? (
            <Stack orientation="horizontal" spacing="space30">
              <Button
                variant="secondary"
                onClick={() => setResetShortcuts(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={resetShortcutsHandler}>
                Save
              </Button>
            </Stack>
          ) : (
            <Button
              variant="destructive"
              onClick={() => {
                setResetShortcuts(true);
              }}
            >
              Reset keyboard shortcuts
            </Button>
          )}
        </Card>
      </Stack>
    </>
  );
};

export default Settings;
