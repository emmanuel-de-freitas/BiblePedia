'user client'

import { type LIIconName } from '@/services/icons';

import Text from './text';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';
import { useMatch, useNavigate } from 'react-router';
import { ActionButton } from '@react-spectrum/s2';
import Icon from './icon';

const MotionText = motion.create(Text, { forwardMotionProps: true });

const NavButton = ({ icon, label, route }:{ icon?: LIIconName, label?: string, route: string }) => {

  const showLabel = useMemo(() => label !== undefined, [label]);
  const navigate = useNavigate();
  const handleOnPress = () => {
    navigate(route, { relative: 'route', replace: true });
  };
  const isActive = !!useMatch({ path: route, end: true });

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
      {icon && <Icon icon={icon} variant={isActive ? 'Bold' : 'Outline'} />}
      <AnimatePresence>
        {showLabel ? <MotionText
          key={icon}
          textStyle={{ fontWeight: isActive ? 'bold' : 'normal' }}
          variant="navigation"
          layout="size"
          initial={{
           opacity: 0,
            width: 0
          }}
          animate={{
            opacity: 1,
            width: 'min-content',
            transition: {
              width: {
                delay: 0.1,
                duration: 0.2
              }
            }
          }}
          exit={{
            opacity: 0,
            width: 0,
            transition: {
              type: 'tween',
              width: {
                delay: 0.1,
                duration: 0.2
              }
            }
          }}>{label}</MotionText> : null}
      </AnimatePresence>
      </ActionButton>

  )
}

export default NavButton;
