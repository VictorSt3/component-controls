/** @jsx jsx */
import { FC } from 'react';
import { jsx } from 'theme-ui';
import { CopyContainer } from '@component-controls/components';
import tinycolor from 'tinycolor2';
import { colorToStr } from '../utils';
import { ColorBlockProps } from '../../types';
import { GridContainerProps, GridContainer } from '../../components';

const ContrastTest: FC<{
  bg: string;
  color: string;
  size: 'small' | 'large';
}> = ({ bg, color, size }) => {
  const pass = tinycolor.isReadable(bg, color, {
    level: 'AA',
    size,
  }); //false
  return (
    <div
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <span sx={{ color, fontSize: size === 'large' ? '18px' : '14px' }}>
        A
      </span>
      <span
        sx={{
          bg: 'black',
          color: 'white',
          fontSize: '10px',
          borderRadius: '10px',
          px: 1,
        }}
      >
        {pass ? 'PASS' : 'FAIL'}
      </span>
    </div>
  );
};
/**
 * Color item displaying the color as a block with [AA](https://www.w3.org/TR/WCAG/) color contrast tests.
 * Design inspired from [Atlassian Design System](https://atlassian.design/foundations/color).
 */
export const AtlassianColor: FC<ColorBlockProps> = ({ name, color }) => {
  const colorValue = typeof color === 'string' ? color : color.value;
  const { hex, rgba } = colorToStr(colorValue);
  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 180,
        maxWidth: 450,
      }}
    >
      <CopyContainer value={hex} name={name}>
        <div
          sx={{
            bg: colorValue,
            height: 90,
            position: 'relative',
          }}
        >
          <div
            sx={{
              position: 'absolute',
              left: 10,
              bottom: 0,
              right: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <ContrastTest bg={colorValue} color="#000" size="large" />
            <ContrastTest bg={colorValue} color="#000" size="small" />
            <ContrastTest bg={colorValue} color="#fff" size="large" />
            <ContrastTest bg={colorValue} color="#fff" size="small" />
          </div>
        </div>
      </CopyContainer>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          lineHeight: '16px',
          bg: 'muted',
          p: 3,
          fontSize: 1,
        }}
      >
        <div
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div>NAME</div>
          <div sx={{ pt: 1, pb: 3 }}>
            {`${typeof color !== 'string' ? `${color.name} - ` : ''} ${name ||
              hex}`}
          </div>
        </div>
        <div
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <div sx={{ display: 'flex', flexDirection: 'column' }}>
            <div>HEX</div>
            <div>{hex}</div>
          </div>
          <div sx={{ display: 'flex', flexDirection: 'column' }}>
            <div>RGB</div>
            <div>{`${rgba.r}, ${rgba.g}, ${rgba.b}${
              rgba.a !== 1 ? `, ${rgba.a}` : ''
            }`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 *
 * palette displayed with AtlassianColor items
 * using a css grid for the dsplay
 */
export const AtlassianColorPalette: FC<Omit<
  GridContainerProps,
  'children'
>> = props => (
  <GridContainer {...props}>
    {({ name, value }) => (
      <AtlassianColor key={`color_item_${name}}`} name={name} color={value} />
    )}
  </GridContainer>
);
