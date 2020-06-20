/** @jsx jsx */
import { jsx, useColorMode, Box } from 'theme-ui';
import Octicon, { SunIcon, MoonIcon } from '@primer/octicons-react';

import { FC } from 'react';
import { Toggle, ToggleProps } from '../Toggle';

/**
 * dark/light mode toggle for theme-ui themes
 */
export const ColorMode: FC<Omit<
  ToggleProps,
  'checked' | 'onChange'
>> = props => {
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`;
  const toggleColorMode = (checked: boolean) => {
    setColorMode(checked ? `dark` : `light`);
  };

  return (
    <Box variant="colormode.container">
      <Toggle
        aria-label="Toggle dark mode"
        uncheckedIcon={
          <Box variant="colormode.outericon">
            <Box variant="colormode.innericon">
              <Octicon icon={SunIcon} />
            </Box>
          </Box>
        }
        checkedIcon={
          <Box variant="colormode.outericon">
            <Box variant="colormode.innericon">
              <Octicon icon={MoonIcon} />
            </Box>
          </Box>
        }
        checked={isDark}
        onChange={toggleColorMode}
        onColor="#333"
        offColor="#ddd"
        {...props}
      />
    </Box>
  );
};
