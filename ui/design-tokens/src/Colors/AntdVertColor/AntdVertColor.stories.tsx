import React from 'react';
import { ControlTypes } from '@component-controls/core';
import { AntdVertColor, AntdVertColorPalette } from './AntdVertColor';
import { ColorProps } from '../../types';

export default {
  title: 'Design Tokens/Colors/AntdVertColor',
  component: AntdVertColor,
};

export const overview = ({ name, color }: ColorProps) => (
  <AntdVertColor name={name} color={color} />
);

overview.controls = {
  name: { type: ControlTypes.TEXT },
  color: { type: ControlTypes.COLOR, value: '#cf1322' },
};

export const name = () => <AntdVertColor name="brand" color="#e95b54" />;

export const rgb = () => <AntdVertColor name="text" color="rgb(0, 0, 0)" />;

export const rgba = () => (
  <AntdVertColor name="shadow" color="rgba(0, 0, 0, 0.5)" />
);

export const hsl = () => (
  <AntdVertColor name="accent" color="hsl(12, 10%, 50%)" />
);

export const hsla = () => (
  <AntdVertColor name="accent" color="hsl(12, 10%, 50%, .6)" />
);

export const palette = () => (
  <AntdVertColorPalette
    palette={{
      'green-1': '#f6ffed',
      'green-2': '#d9f7be',
      'green-3': '#b7eb8f',
      'green-4': '#95de64',
      'green-5': '#73d13d',
      'green-6': '#52c41a',
      'green-7': '#389e0d',
      'green-8': '#237804',
      'green-9': '#135200',
      'green-10': '#092b00',
    }}
  />
);
