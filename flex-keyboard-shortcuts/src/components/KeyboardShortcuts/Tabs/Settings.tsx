import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { Button, Heading, Stack } from '@twilio-paste/core';
import { Card, Paragraph, Switch } from '@twilio-paste/core';
import { useToaster, Toaster } from '@twilio-paste/core/toast';
import { writeToLocalStorage } from '../../../utils/LocalStorageUtil';
import { readFromLocalStorage } from '../../../utils/LocalStorageUtil';
import { resetKeyboardShortcutsUtil } from '../../../utils/KeyboardShortcutsUtil';
import { disableKeyboardShortcutsUtil } from '../../../utils/KeyboardShortcutsUtil';

interface SettingsProps {
  setReset: Dispatch<SetStateAction<boolean>>;
  setDisableShortcuts: Dispatch<SetStateAction<boolean>>;
  setIsThrottleEnabled: Dispatch<SetStateAction<boolean>>;
  setIsDeleteShortcutsEnabled: Dispatch<SetStateAction<boolean>>;
}

const Settings = ({
  setReset,
  setDisableShortcuts,
  setIsThrottleEnabled,
  setIsDeleteShortcutsEnabled,
}: SettingsProps) => {
  const [throttlingToggle, setThrottlingToggle] = useState<boolean>(false);
  const [deleteToggle, setDeleteToggle] = useState<boolean>(false);
  const [disableAllSetting, setDisableAllSetting] = useState<boolean>(false);
  const [resetSetting, setResetSetting] = useState<boolean>(false);
  const toaster = useToaster();

  const localDeleteSetting = readFromLocalStorage('deleteShortcuts');
  const localThrottlingSetting = readFromLocalStorage('enableThrottling');
  const localRemoveAllSetting = readFromLocalStorage('removeAllShortcuts');

  const toasterShortcutsDisabledNotification = (): void => {
    toaster.push({
      message: `All keyboard shortcuts have been disabled.`,
      variant: 'success',
      dismissAfter: 4000,
    });
  };

  const toasterResetNotification = (): void => {
    toaster.push({
      message: `All keyboard shortcuts have been reset to the default values!`,
      variant: 'success',
      dismissAfter: 4000,
    });
  };

  const throttlingHandler = (): void => {
    setThrottlingToggle(!throttlingToggle);
    setIsThrottleEnabled(!throttlingToggle);
    writeToLocalStorage(
      'enableThrottling',
      readFromLocalStorage('enableThrottling') === 'true' ? 'false' : 'true'
    );
  };

  const deleteShortcutsHandler = (): void => {
    setIsDeleteShortcutsEnabled(!deleteToggle);
    setDeleteToggle(!deleteToggle);
    writeToLocalStorage(
      'deleteShortcuts',
      readFromLocalStorage('deleteShortcuts') === 'true' ? 'false' : 'true'
    );
  };

  const removeAllShortcutsHandler = (): void => {
    disableKeyboardShortcutsUtil();
    setDisableShortcuts(true);
    setDisableAllSetting(false);
    toasterShortcutsDisabledNotification();
    writeToLocalStorage(
      'removeAllShortcuts',
      readFromLocalStorage('removeAllShortcuts') === 'true' ? 'false' : 'true'
    );
  };

  const resetShortcutsHandler = (): void => {
    setDeleteToggle(false);
    setIsDeleteShortcutsEnabled(false);

    setThrottlingToggle(false);
    setIsThrottleEnabled(false);

    setDisableShortcuts(false);
    setResetSetting(false);

    setReset(true);

    toasterResetNotification();
    resetKeyboardShortcutsUtil();
  };

  useEffect(() => {
    if (localDeleteSetting === 'true') {
      setDeleteToggle(true);
      setIsDeleteShortcutsEnabled(true);
    }
    if (localThrottlingSetting === 'true') {
      setThrottlingToggle(true);
      setIsThrottleEnabled(true);
    }
    if (localRemoveAllSetting === 'true') {
      setDisableAllSetting(false);
      setDisableShortcuts(true);
      disableKeyboardShortcutsUtil();
    }
  }, [
    localDeleteSetting,
    localThrottlingSetting,
    localRemoveAllSetting,
    setIsDeleteShortcutsEnabled,
    setIsThrottleEnabled,
    setDisableShortcuts,
  ]);

  return (
    <>
      {/* Toaster notifications based on setting actions*/}
      <Toaster {...toaster} />
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
            checked={throttlingToggle}
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
            checked={deleteToggle}
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
            Remove and disable all keyboard shortcuts, including the custom
            ones; your shortcuts will no longer work. Please keep in mind that
            this is an irreversible action and you will have to reconfigure all
            of your keyboard shortcuts.
          </Paragraph>
          {/* Once the setting is clicked, display the Save and Cancel buttons */}
          {disableAllSetting ? (
            <Stack orientation="horizontal" spacing="space30">
              <Button
                variant="secondary"
                onClick={() => setDisableAllSetting(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={removeAllShortcutsHandler}>
                Save
              </Button>
            </Stack>
          ) : (
            <>
              {/* Default button presented to the user  */}
              <Button
                variant="destructive"
                onClick={() => setDisableAllSetting(true)}
                disabled={
                  readFromLocalStorage('removeAllShortcuts') === 'true'
                    ? true
                    : false
                }
              >
                Remove all shortcuts
              </Button>
            </>
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
          {/* Once the setting is clicked, display the Save and Cancel buttons */}
          {resetSetting ? (
            <Stack orientation="horizontal" spacing="space30">
              <Button
                variant="secondary"
                onClick={() => setResetSetting(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={resetShortcutsHandler}>
                Save
              </Button>
            </Stack>
          ) : (
            <>
              {/* Default button presented to the user  */}
              <Button
                variant="destructive"
                onClick={() => {
                  setResetSetting(true);
                }}
              >
                Reset keyboard shortcuts
              </Button>
            </>
          )}
        </Card>
      </Stack>
    </>
  );
};

export default Settings;
