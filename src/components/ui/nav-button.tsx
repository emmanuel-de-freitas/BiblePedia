'user client'

import { ALL_ICONS, type LIIconName, type IconProps } from '@/services/icons';
import { ButtonRenderProps } from '@react-spectrum/s2';
import Text from './text';
import { baseColor, focusRing, lightDark, style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router';

const Icon: React.FC<{ icon: LIIconName }> = ({ icon }) => {
  //const { default: IconComponent } = await import(`@react-spectrum/s2/icons/${icon}`);
  const IconComponent = ALL_ICONS[icon];
  return <IconComponent size={24} variant="Broken" />;
};

export const btnStyles = style({
  ...focusRing(),
  display: 'grid',
  justifyContent: 'center',
  flexShrink: {
    default: 1,
    isInGroup: 0
  },
  flexGrow: {
    isJustified: 1
  },
  flexBasis: {
    isJustified: 0
  },
  fontWeight: 'medium',
  width: 'fit',
  userSelect: 'none',
  transition: 'default',
  forcedColorAdjust: 'none',
  position: 'relative',
  gridTemplateAreas: {
    default: ['icon text'],
    [iconOnly]: ['icon'],
    [textOnly]: ['text']
  },
  gridTemplateColumns: {
    default: ['auto', 'auto'],
    [iconOnly]: ['auto'],
    [textOnly]: ['auto']
  },
  backgroundColor: {
    default: {
      ...baseColor('gray-100'),
      default: {
        default: 'gray-100',
        isQuiet: 'transparent'
      }
    },
    isSelected: {
      default: baseColor('neutral'),
      isEmphasized: {
        default: lightDark('accent-900', 'accent-700'),
        isHovered: lightDark('accent-1000', 'accent-600'),
        isPressed: lightDark('accent-1000', 'accent-600'),
        isFocusVisible: lightDark('accent-1000', 'accent-600')
      },
      isDisabled: {
        default: 'gray-100',
        isQuiet: 'transparent'
      }
    },
    isStaticColor: {
      ...baseColor('transparent-overlay-100'),
      default: {
        default: 'transparent-overlay-100',
        isQuiet: 'transparent'
      },
      isSelected: {
        default: baseColor('transparent-overlay-800'),
        isDisabled: {
          default: 'transparent-overlay-100',
          isQuiet: 'transparent'
        }
      }
    },
    forcedColors: {
      default: 'ButtonFace',
      isSelected: {
        default: 'Highlight',
        isDisabled: 'ButtonFace'
      }
    }
  },
  color: {
    default: baseColor('neutral'),
    isSelected: {
      default: 'gray-25',
      isEmphasized: 'white'
    },
    isDisabled: 'disabled',
    isStaticColor: {
      default: baseColor('transparent-overlay-800'),
      isSelected: 'auto',
      isDisabled: 'transparent-overlay-400'
    },
    forcedColors: {
      default: 'ButtonText',
      isSelected: 'HighlightText',
      isDisabled: {
        default: 'GrayText'
      }
    }
  },
  '--iconPrimary': {
    type: 'fill',
    value: 'currentColor'
  },
  outlineColor: {
    default: 'focus-ring',
    isStaticColor: 'transparent-overlay-1000',
    forcedColors: 'Highlight'
  },
  borderStyle: 'none',
  borderTopStartRadius: {
    default: controlStyle.borderRadius,
    density: {
      compact: {
        default: 'none',
        ':first-child': controlStyle.borderRadius
      }
    }
  },
  borderTopEndRadius: {
    default: controlStyle.borderRadius,
    density: {
      compact: {
        default: 'none',
        orientation: {
          horizontal: {
            ':last-child': controlStyle.borderRadius
          },
          vertical: {
            ':first-child': controlStyle.borderRadius
          }
        }
      }
    }
  },
  borderBottomStartRadius: {
    default: controlStyle.borderRadius,
    density: {
      compact: {
        default: 'none',
        orientation: {
          horizontal: {
            ':first-child': controlStyle.borderRadius
          },
          vertical: {
            ':last-child': controlStyle.borderRadius
          }
        }
      }
    }
  },
  borderBottomEndRadius: {
    default: controlStyle.borderRadius,
    density: {
      compact: {
        default: 'none',
        ':last-child': controlStyle.borderRadius
      }
    }
  },
  zIndex: {
    isFocusVisible: 2
  },
  disableTapHighlight: true,
  '--badgeTop': {
    type: 'top',
    value: {
      default: 'calc(self(height)/2 - var(--iconWidth)/2)',
      [textOnly]: 0
    }
  },
  '--iconWidth': {
    type: 'width',
    value: fontRelative(20)
  },
  '--badgePosition': {
    type: 'width',
    value: {
      default: '--iconWidth',
      [textOnly]: 'full'
    }
  },
  paddingX: {
    default: controlStyle.paddingX,
    [avatarOnly]: 0
  },
  // `control` sets this, but we need to override it for avatar only buttons.
  '--iconMargin': {
    type: 'marginStart',
    value: {
      default: fontRelative(-2),
      [iconOnly]: 0,
      [avatarOnly]: 0
    }
  }
}, getAllowedOverrides());


const MotionText = motion.create(Text, { forwardMotionProps: true });

const NavButton = ({ icon, label, route }:{ icon: LIIconName, label?: string, route: string }) => {

  const showLabel = useMemo(() => label !== undefined, [label]);
  const navigate = useNavigate();

  const handleOnPress = () => {
    // Handle navigation or any other action here
    navigate(`/${route}`);
  }

  return (

    <NavLink
        to={`/${route}`}
       // onPress={handleOnPress}
      //size={"L"}
      className={
        bt
        style({
        width: 'full',
        justifySelf: 'start',
        cursor: 'pointer',
        justifyContent: 'start',
        alignItems: 'center',
        display: 'inline-flex'
      })}
     >
      <Icon icon={icon} />
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
      </NavLink>

  )
}

export default NavButton;
