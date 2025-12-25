import { ActionButton } from "@react-spectrum/s2";
import type { FocusableRefValue } from "@react-types/shared";
import { ALL_ICONS, type IconProps, type LIIconName } from "../services/icons";

type IconButtonBase = {
  onPress?: () => void;
  variant?: IconProps['variant'];
  isLoading?: boolean;
  style?: React.CSSProperties;
  buttonRef?: React.Ref<FocusableRefValue<HTMLButtonElement>>;
  size?: 'S' | 'M' | 'L' | 'XL';
  isQuiet?: boolean;
  isDisabled?: boolean;
  ariaLabel?: string;
};

type IconButtonWithChildren = IconButtonBase & {
  children: React.ReactNode;
  icon?: never;
};

type IconButtonWithIcon = IconButtonBase & {
  icon: LIIconName;
  children?: never;
};

type IconButtonProps = IconButtonWithChildren | IconButtonWithIcon;

const IconButton = ({
  icon,
  onPress,
  variant = 'Outline',
  isLoading = false,
  children,
  style,
  buttonRef,
  size = 'M',
  isQuiet = true,
  isDisabled = false,
  ariaLabel
}: IconButtonProps) => {
  const Icon = icon ? ALL_ICONS[icon] : null;

  return (
    <ActionButton
      ref={buttonRef}
      aria-label={ariaLabel || (icon ? `${icon} button` : "Action button")}
      isPending={isLoading}
      isQuiet={isQuiet}
      isDisabled={isDisabled}
      onPress={onPress}
      size={size}
      UNSAFE_style={{
        cursor: isDisabled ? 'default' : 'pointer',
        borderRadius: '100%',
        width: 40,
        height: 40,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'inline-flex',
        ...style
      }}
    >
      {children ? children : Icon && <Icon size={24} variant={variant} />}
    </ActionButton>
  );
};

export default IconButton;
