import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import { CustomizationProvider } from '@twilio-paste/core/customization';

import SideNavigationIcon from './components/SideNavigation/SideNavigationIcon';
import KeyboardShortcuts from './components/KeyboardShortcuts/KeyboardShortcuts';
import { View } from '@twilio/flex-ui';

const PLUGIN_NAME = 'KeyboardShortcutsPlugin';

export default class KeyboardShortcutsPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    flex.setProviders({
      PasteThemeProvider: CustomizationProvider,
    });

    flex.SideNav.Content.add(
      <SideNavigationIcon
        key="keyboard-shortcuts-side-nav"
        viewName="keyboard-shortcuts"
      />,
      {
        sortOrder: 100,
      }
    );

    flex.ViewCollection.Content.add(
      <View name="keyboard-shortcuts" key="keyboard-shortcuts-view">
        <KeyboardShortcuts key="keyboard-shortcuts-view-content" />
      </View>
    );
  }
}
