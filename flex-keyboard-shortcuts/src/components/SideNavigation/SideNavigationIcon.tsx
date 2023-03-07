import { SideLink, Actions } from '@twilio/flex-ui';
import { BsKeyboard, BsKeyboardFill } from 'react-icons/bs';

interface OwnProps {
  activeView?: string;
  viewName: string;
}

const SideNavigationIcon = (props: OwnProps) => {
  const navigateHandler = () => {
    Actions.invokeAction('NavigateToView', {
      viewName: props.viewName,
    });
  };

  return (
    <SideLink
      showLabel={true}
      icon={<BsKeyboard />}
      iconActive={<BsKeyboardFill />}
      onClick={navigateHandler}
      isActive={props.activeView === props.viewName}
      key="KeyboardShortcuts"
    >
      Keyboard Shortcuts
    </SideLink>
  );
};

export default SideNavigationIcon;
