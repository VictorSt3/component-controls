import React, { FC } from 'react';
import {
  BlockContainer,
  BlockContainerProps,
} from '@component-controls/components';
import {
  useStoryContext,
  StoryInputProps,
  StoryContextProps,
} from '../../context';
import { CURRENT_STORY, getStoryBlockTitle } from '../../utils';

export type StoryBlockContainerProps = {
  children: (
    context: StoryContextProps,
    props: any,
  ) => React.ReactElement | null;
  [key: string]: any;
} & StoryInputProps &
  Omit<BlockContainerProps, 'id'>;

export const StoryBlockContainer: FC<StoryBlockContainerProps> = ({
  id,
  name,
  collapsible,
  title: userTitle,
  children,
  ...rest
}) => {
  const context = useStoryContext({
    id,
    name,
  });
  const { component, kind, story } = context;
  const title = getStoryBlockTitle({
    kind,
    component,
    title: userTitle,
  });
  const block = children(context, rest);
  return (
    <BlockContainer
      title={title}
      collapsible={collapsible}
      id={userTitle == CURRENT_STORY && story ? story.id : undefined}
    >
      {block}
    </BlockContainer>
  );
};
