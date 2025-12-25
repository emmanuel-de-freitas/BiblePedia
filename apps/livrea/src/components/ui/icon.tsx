import { ALL_ICONS, type IconProps, type LIIconName } from "@/services/icons";

const Icon = ({ icon, variant }: { icon: LIIconName, variant: IconProps['variant'] }) => {
  const Component = ALL_ICONS[icon];
  return <Component name={icon} size={24} variant={variant} />;
};

export default Icon;
