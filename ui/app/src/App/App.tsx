/** @jsx jsx */
import { FC, Fragment } from 'react';
import { jsx, Flex } from 'theme-ui';
import {
  SkipLinks,
  SkiLinksItemProps,
} from '@component-controls/app-components';
import { useStoryContext } from '@component-controls/blocks';
import { SEO } from '../SEO';
import { Header } from '../Header';
import { Footer } from '../Footer';

export interface AppProps {
  title?: string;
}
export const App: FC<AppProps> = ({ title, children }) => {
  const { doc } = useStoryContext({ id: '.' });
  const items: SkiLinksItemProps[] = [
    {
      target: 'content',
      text: 'skip to main content',
    },
  ];
  if (!doc || !doc.fullPage) {
    items.push({
      target: 'sidebar',
      text: 'skip to navigation sidebar',
    });
    items.push({
      target: 'contextbar',
      text: 'skip to context sidebar',
    });
  }

  return (
    <Fragment>
      <SEO title={title} />
      <SkipLinks items={items} />
      <Flex
        sx={{
          minHeight: '100vh',
          flexDirection: 'column',
        }}
      >
        <Header title={title}></Header>
        {children}
        <Footer />
      </Flex>
    </Fragment>
  );
};
