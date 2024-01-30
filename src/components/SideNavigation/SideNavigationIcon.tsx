import { SideLink, Actions } from "@twilio/flex-ui";
import { useEffect } from "react";
import { KeyboardIcon, KeyboardIconFilled } from "../../utils/KeyboardIcons";
import { getCustomShortcuts } from "../../utils/KeyboardShortcutsUtil";
import { getDefaultShortcuts } from "../../utils/KeyboardShortcutsUtil";
interface SideNavigationProps {
  activeView?: string;
  viewName: string;
}

const SideNavigationIcon = ({ activeView, viewName }: SideNavigationProps) => {
  const navigateHandler = async () => {
    try {
      await Actions.invokeAction("NavigateToView", {
        viewName: viewName,
      });
    } catch (error) {
      console.error("Error navigating to view", error);
    }
  };

  useEffect(() => {
    getDefaultShortcuts();
    getCustomShortcuts();
  }, []);

  return (
    <SideLink
      showLabel={true}
      icon={<KeyboardIcon />}
      iconActive={<KeyboardIconFilled />}
      onClick={navigateHandler}
      isActive={activeView === viewName}
      key="KeyboardShortcuts"
    >
      Keyboard Shortcuts
    </SideLink>
  );
};

export default SideNavigationIcon;
