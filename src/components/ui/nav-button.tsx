'user client'

import { ALL_ICONS, type LIIconName, type IconProps } from '@/services/icons';
import { ActionButton } from '@react-spectrum/s2';
import Text from './text';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };

const Icon: React.FC<{ icon: LIIconName }> = ({ icon }) => {
  //const { default: IconComponent } = await import(`@react-spectrum/s2/icons/${icon}`);
  const IconComponent = ALL_ICONS[icon];
  return <IconComponent size={24} variant="Broken" />;
};

const NavButton = ({ icon, label }:{ icon: LIIconName, label?: string }) => {

  return (
    <ActionButton isQuiet size='L' styles={style({
      width: 'full',
      justifySelf: 'start'
    })} UNSAFE_style={{ justifyContent: 'start', cursor: 'pointer' }}>
      <Icon icon={icon} />
      {label && <Text variant="navigation">{label}</Text>}
    </ActionButton>
  )
}

export default NavButton;
