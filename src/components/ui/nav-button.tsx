'user client'

import type { LivIconName } from '@/services/icons';
import { ActionButton, type ActionButtonProps, type IconProps } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };

const NavButton = ({ children, ...props }: ActionButtonProps & { icon: React.ReactNode | LivIconName }) => {

  const Icon: React.FC<IconProps> = () => <>{props.icon}</>;


  return (
    <ActionButton {...props} isQuiet UNSAFE_style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', padding: 8, minHeight: 54, minWidth: 54, width: '100%' }}>
      <Icon />
      {children}
    </ActionButton>
  )
}

export default NavButton;
