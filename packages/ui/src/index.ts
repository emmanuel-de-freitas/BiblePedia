/**
 * @biblepedia/ui - React Spectrum S2 Component Library
 *
 * This package re-exports React Spectrum S2 components for use in the Livrea app.
 * It provides a centralized location for UI components and allows for custom
 * component extensions when needed.
 */

// Re-export all React Spectrum S2 components
export {
  // Provider
  Provider,

  // Buttons
  Button,
  ActionButton,
  LinkButton,
  ToggleButton,

  // Button Groups
  ActionButtonGroup,
  ButtonGroup,
  ToggleButtonGroup,

  // Forms
  Form,
  TextField,
  TextArea,
  SearchField,
  NumberField,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
  Switch,
  Slider,
  RangeSlider,
  Picker,
  PickerItem,
  PickerSection,
  ComboBox,
  ComboBoxItem,
  ComboBoxSection,

  // Date & Time
  DateField,
  DatePicker,
  DateRangePicker,
  TimeField,
  Calendar,
  RangeCalendar,

  // Color
  ColorArea,
  ColorField,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  ColorWheel,

  // Collections
  Menu,
  MenuItem,
  MenuSection,
  MenuTrigger,
  ActionMenu,
  SubmenuTrigger,
  TableView,
  TableHeader,
  TableBody,
  Column,
  Row,
  Cell,
  TreeView,
  TreeViewItem,
  CardView,
  Card,
  AssetCard,
  UserCard,
  ProductCard,
  CardPreview,
  TagGroup,
  Tag,
  ListView,
  ListViewItem,

  // Navigation
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Breadcrumbs,
  Link,
  SegmentedControl,
  SegmentedControlItem,

  // Overlays
  Dialog,
  DialogTrigger,
  DialogContainer,
  AlertDialog,
  CustomDialog,
  FullscreenDialog,
  Popover,
  Tooltip,
  TooltipTrigger,

  // Status
  ProgressBar,
  ProgressCircle,
  Meter,
  StatusLight,
  Badge,
  InlineAlert,

  // Content
  Avatar,
  AvatarGroup,
  Image,
  ImageCoordinator,
  Divider,
  Accordion,
  AccordionItem,
  AccordionItemHeader,
  AccordionItemPanel,
  AccordionItemTitle,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Heading,
  Header,
  Footer,
  Content,
  Text,
  Keyboard,
  IllustratedMessage,
  ContextualHelp,

  // Layout
  ActionBar,
  DropZone,
  Skeleton,
  CloseButton,

  // Collections helpers
  Collection,

  // Selection helpers
  SelectBoxGroup,
  SelectBox,

  // Toast
  ToastQueue,
  ToastContainer,
} from "@react-spectrum/s2";

// Re-export types
export type {
  // Provider
  ProviderProps,

  // Buttons
  ButtonProps,
  ActionButtonProps,
  LinkButtonProps,
  ToggleButtonProps,

  // Button Groups
  ActionButtonGroupProps,
  ButtonGroupProps,
  ToggleButtonGroupProps,

  // Forms
  FormProps,
  TextFieldProps,
  TextAreaProps,
  SearchFieldProps,

  CheckboxProps,
  CheckboxGroupProps,
  RadioGroupProps,
  RadioProps,
  SwitchProps,
  SliderProps,
  RangeSliderProps,
  PickerProps,
  PickerItemProps,
  PickerSectionProps,
  ComboBoxProps,
  ComboBoxItemProps,
  ComboBoxSectionProps,

  // Date & Time
  DateFieldProps,
  DatePickerProps,
  DateRangePickerProps,
  TimeFieldProps,
  CalendarProps,
  RangeCalendarProps,

  // Color
  ColorAreaProps,
  ColorFieldProps,
  ColorSliderProps,
  ColorSwatchProps,
  ColorSwatchPickerProps,
  ColorWheelProps,

  // Collections
  MenuProps,
  MenuItemProps,
  MenuSectionProps,
  MenuTriggerProps,
  ActionMenuProps,
  SubmenuTriggerProps,
  TableViewProps,
  CardViewProps,
  CardProps,
  AssetCardProps,
  UserCardProps,
  ProductCardProps,
  CardPreviewProps,
  TagGroupProps,
  TagProps,
  ListViewProps,
  ListViewItemProps,

  // Navigation
  TabsProps,
  TabListProps,
  TabProps,
  TabPanelProps,
  BreadcrumbsProps,
  BreadcrumbProps,
  LinkProps,
  SegmentedControlProps,
  SegmentedControlItemProps,

  // Overlays
  DialogProps,
  DialogTriggerProps,
  DialogContainerProps,
  AlertDialogProps,
  CustomDialogProps,
  FullscreenDialogProps,
  PopoverProps,
  TooltipProps,
  TooltipTriggerProps,

  // Status
  ProgressBarProps,
  ProgressCircleProps,
  MeterProps,
  StatusLightProps,
  BadgeProps,
  InlineAlertProps,

  // Content
  AvatarProps,
  AvatarGroupProps,
  ImageProps,
  ImageCoordinatorProps,
  DividerProps,
  AccordionProps,
  AccordionItemProps,
  AccordionItemHeaderProps,
  AccordionItemPanelProps,
  AccordionItemTitleProps,
  DisclosureProps,
  DisclosurePanelProps,
  ContextualHelpProps,

  // Layout
  ActionBarProps,
  DropZoneProps,
  SkeletonProps,
  CloseButtonProps,

  // Icons and Illustrations
  IconProps,
  IconContextValue,
  IllustrationProps,
  IllustrationContextValue,

  // Shared types from react-aria-components
  FileTriggerProps,
  TooltipTriggerProps as TooltipTriggerComponentProps,
  SortDescriptor,
  Color,
  Key,
  Selection,
} from "@react-spectrum/s2";

// Export custom components
export { ConfirmDialog, type ConfirmDialogProps } from "./components/dialog";

// Export utility types
export type {
  BaseComponentProps,
  DisableableProps,
  LoadingProps,
  Size,
  SizeProps,
  Variant,
  VariantProps,
  RequiredProps,
  OptionalProps,
  HTMLProps,
  AsProp,
  PolymorphicProps,
  Icon,
  IconProps as IconSaxProps,
  LIIconName
} from "./types";

export { ALL_ICONS } from "./types";
