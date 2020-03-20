/** @jsx jsx */
import { jsx } from 'theme-ui';
import { FC } from 'react';
import { Heading, HeadingProps } from 'theme-ui';

interface TitleOwnProps {
  /**
   * text to be displayed in the component.
   */
  children?: string;
}

export type TitleProps = TitleOwnProps & Omit<HeadingProps, 'children'>;

export const Title: FC<TitleProps> = ({ children, ...rest }) => (
  <Heading
    as="h1"
    sx={{
      fontWeight: 900,
      paddingBottom: '25px',
    }}
    {...rest}
  >
    {children}
  </Heading>
);
