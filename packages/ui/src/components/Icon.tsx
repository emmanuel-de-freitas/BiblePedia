import { ALL_ICONS, type IconProps, type LIIconName } from "../services/icons";

interface IconComponentProps {
  icon: LIIconName;
  variant?: IconProps['variant'];
  size?: number;
  color?: string;
  className?: string;
}

const Icon = ({
  icon,
  variant = 'Outline',
  size = 24,
  color,
  className
}: IconComponentProps) => {
  const Component = ALL_ICONS[icon];

  if (!Component) {
    console.warn(`Icon "${icon}" not found in icon library`);
    return null;
  }

  return (
    <Component
      size={size}
      variant={variant}
      color={color}
      className={className}
    />
  );
};

export default Icon;
