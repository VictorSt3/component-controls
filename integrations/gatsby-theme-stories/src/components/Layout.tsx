/** @jsx jsx */
import { FC } from 'react';
import { jsx } from 'theme-ui';
import { AppContext } from '@component-controls/app';
import { store } from '@component-controls/store/controls-store';

import { GatsbyLink } from './GatsbyLink';

interface LayoutProps {
  docId?: string;
  storyId?: string;
  activeTab?: string;
}

export const Layout: FC<LayoutProps> = ({
  docId,
  storyId,
  children,
  activeTab,
}) => {
  return (
    <AppContext
      docId={docId}
      storyId={storyId}
      store={store}
      linkClass={GatsbyLink}
      activeTab={activeTab}
    >
      {children}
    </AppContext>
  );
};
