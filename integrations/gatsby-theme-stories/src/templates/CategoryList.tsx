import React, { FC } from 'react';

import { DocType } from '@component-controls/core';
import { CategoryList } from '@component-controls/app';
import { Layout } from '../components/Layout';

interface CategoryListProps {
  pathContext: {
    type: DocType;
    docId: string;
  };
}

const CategroryListTemplate: FC<CategoryListProps> = ({
  pathContext: { type, docId },
}) => {
  return (
    <Layout type={type} docId={docId}>
      <CategoryList type={type} />
    </Layout>
  );
};

export default CategroryListTemplate;
