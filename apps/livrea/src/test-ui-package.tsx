import React from 'react';
import {
  Heading,
  Text,
  Icon,
  IconButton,
  NavButton,
  Button,
  Provider,
  styleUtils,
  type HeadingLevel
} from '@philagora/ui';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };

// Test component that uses all the exported components from @philagora/ui
const TestUIPackage = () => {
  const handleButtonPress = () => {
    console.log('Button pressed!');
  };

  const containerStyle = style({
    padding: 32,
    backgroundColor: 'gray-100',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  });

  const sectionStyle = style({
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 'default',
    boxShadow: 'elevated'
  });

  return (
    <Provider>
      <div className={containerStyle}>
        {/* Test Heading component */}
        <section className={sectionStyle}>
          <Heading level={1}>Testing @philagora/ui Package</Heading>
          <Heading level={2}>All Components Working</Heading>
          <Heading level={3}>Level 3 Heading</Heading>
          <Heading level={4}>Level 4 Heading</Heading>
          <Heading level={5}>Level 5 Heading</Heading>
        </section>

        {/* Test Text component */}
        <section className={sectionStyle}>
          <Heading level={2}>Text Variants</Heading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Text variant="label">Label Text Variant</Text>
            <Text variant="caption">Caption Text Variant</Text>
            <Text variant="description">Description Text Variant</Text>
            <Text variant="navigation">Navigation Text Variant</Text>
            <Text>Default Text (no variant)</Text>
          </div>
        </section>

        {/* Test Icon component */}
        <section className={sectionStyle}>
          <Heading level={2}>Icons</Heading>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Icon icon="Home" variant="Outline" />
            <Icon icon="Book1" variant="Bold" />
            <Icon icon="People" variant="Bulk" />
            <Icon icon="Setting" variant="Linear" size={32} />
            <Icon icon="Heart" variant="Bold" color="red" />
          </div>
        </section>

        {/* Test IconButton component */}
        <section className={sectionStyle}>
          <Heading level={2}>Icon Buttons</Heading>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <IconButton
              icon="Home"
              onPress={handleButtonPress}
              ariaLabel="Go to home"
            />
            <IconButton
              icon="Setting"
              variant="Bold"
              onPress={handleButtonPress}
              ariaLabel="Settings"
            />
            <IconButton
              icon="Heart"
              variant="Bold"
              isLoading={true}
              ariaLabel="Like"
            />
            <IconButton
              icon="Trash"
              isDisabled={true}
              ariaLabel="Delete"
            />
            <IconButton onPress={handleButtonPress} ariaLabel="Custom content">
              <span>🎨</span>
            </IconButton>
          </div>
        </section>

        {/* Test NavButton component */}
        <section className={sectionStyle}>
          <Heading level={2}>Navigation Buttons</Heading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 200 }}>
            <NavButton icon="Home" label="Home" route="/" />
            <NavButton icon="Book1" label="Library" route="/library" />
            <NavButton icon="People" label="Community" route="/community" />
            <NavButton icon="Setting" route="/settings" />
          </div>
        </section>

        {/* Test React Spectrum Button */}
        <section className={sectionStyle}>
          <Heading level={2}>React Spectrum Button</Heading>
          <div style={{ display: 'flex', gap: 16 }}>
            <Button variant="primary" onPress={handleButtonPress}>
              Primary Button
            </Button>
            <Button variant="secondary" onPress={handleButtonPress}>
              Secondary Button
            </Button>
            <Button variant="negative" onPress={handleButtonPress}>
              Negative Button
            </Button>
          </div>
        </section>

        {/* Test style utilities */}
        <section className={sectionStyle}>
          <Heading level={2}>Style Utilities</Heading>
          <div style={styleUtils.center}>
            <Text>Centered content using styleUtils.center</Text>
          </div>
          <div style={{ ...styleUtils.flexRow, gap: 16, marginTop: 16 }}>
            <div style={{ ...styleUtils.truncate, width: 100 }}>
              <Text>This is a very long text that will be truncated</Text>
            </div>
            <Text>Normal text</Text>
          </div>
        </section>
      </div>
    </Provider>
  );
};

export default TestUIPackage;
