import { ALL_ICONS, type IconProps, type LIIconName } from "@/services/icons";
import { ActionButton, type ActionButtonProps } from "@react-spectrum/s2";
import type{ FocusableRefValue } from "@react-types/shared";

type TIconButtonBase = {
  onPress?: () => void;
  variant?: IconProps['variant'];
  isLoading?: boolean;
  style?: React.CSSProperties;
  buttonRef?: React.Ref<FocusableRefValue<HTMLButtonElement>>;
};

type TIconButtonWithChildren = TIconButtonBase & {
  children: React.ReactNode;
  icon?: never;
};

type TIconButtonWithIcon = TIconButtonBase & {
  icon: LIIconName;
  children?: never;
};

type TIconButtonProps = TIconButtonWithChildren | TIconButtonWithIcon;

const IconButton = ({ icon, onPress, variant = 'Outline', isLoading = false, children, style, buttonRef }: TIconButtonProps) => {
  const Icon = icon ? ALL_ICONS[icon] : null;

  return (
    <ActionButton
      //  ref={buttonRef}
      aria-label="Action for event"
      isPending={isLoading}
      isQuiet
      onPress={onPress}
      size="M"
      UNSAFE_style={{
        ...style,
        cursor: 'pointer',
        borderRadius: '100%',
        width: 40,
        height: 40,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'inline-flex'
      }}
    >
      {children ? children : Icon && <Icon size={24} variant={variant} />}
    </ActionButton>
  );
};

export default IconButton;
