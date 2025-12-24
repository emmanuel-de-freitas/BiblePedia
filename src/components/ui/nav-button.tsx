'user client'

import { ALL_ICONS, type LIIconName } from '@/services/icons';

import Text from './text';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';
import { NavLink, parsePath, useLocation, useMatch, useNavigate } from 'react-router';
import { ActionButton } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro'};

const Icon: React.FC<{ icon: LIIconName }> = ({ icon }) => {
  //const { default: IconComponent } = await import(`@react-spectrum/s2/icons/${icon}`);
  const IconComponent = ALL_ICONS[icon];
  return <IconComponent size={24} variant="Broken" />;
};

const MotionText = motion.create(Text, { forwardMotionProps: true });

const NavButton = ({ icon, label, route }:{ icon?: LIIconName, label?: string, route: string }) => {

  const showLabel = useMemo(() => label !== undefined, [label]);
  const navigate = useNavigate();
  const handleOnPress = () => {
    navigate(route, { relative: 'route', replace: true });
  };
  const isActive = !!useMatch({ path: route, end: true });

  const linkStyles = style({
    justifyContent: {
      default: 'start',
      collapsed: 'center'
    }
  }, ['justifyContent'])

  return (
    <ActionButton
      aria-label={label}
      isQuiet={!isActive}
      onPress={handleOnPress}
      UNSAFE_style={{
        minHeight: 40,
        display: 'flex',
        width: showLabel ? 'auto' : "100%",
        gap: 12,
        justifyContent: showLabel ? 'start' : 'center',
        cursor: 'pointer',
        paddingTop: 8,
        paddingBottom: 8
      }}
    >
      {icon && <Icon icon={icon} />}
      <AnimatePresence initial={false}>
        {showLabel ? <MotionText
          key={icon}
          variant="navigation"
          layout
          initial={{
            opacity: 0,
            width: 0
          }}
          animate={{
            opacity: 1,
            width: 'auto',
            transition: {
              opacity: {
                delay: 0.1,
                duration: 0.1
              }
            }
          }}
          // transition={{
          //   damping: 5,
          //   stiffness: 200,
          //   type: 'spring'
          // }}
          exit={{
            opacity: 0,
            width: 0,
            transition: {
              width: {
                delay: 0.1,
                duration: 0.1
              }
            }
          }}>{label}</MotionText> : null}
      </AnimatePresence>
      </ActionButton>

  )
}

export default NavButton;
