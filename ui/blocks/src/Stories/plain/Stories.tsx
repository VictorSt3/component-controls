import React, { FC } from 'react';
import {
  useStoryContext,
  StoryInputProps,
  useBlockContext,
} from '../../context';
import { Playground, PlaygroundProps } from '../../Playground';
import { Story } from '../../Story/plain';

export type StoriesProps = StoryInputProps & PlaygroundProps;

export const Stories: FC<StoriesProps> = ({ id, name, ...rest }) => {
  const { store } = useBlockContext();
  const { story: selected, kind } = useStoryContext({
    id,
    name,
  });
  const stories =
    store &&
    kind?.stories
      ?.map(id => store.stories[id])
      .filter(story => !selected || selected.id !== story.id);
  if (!stories || !stories.length) {
    return null;
  }
  return (
    <div>
      {stories.map(story => (
        <Playground key={story.id} {...rest}>
          <Story id={story.id} />
        </Playground>
      ))}
    </div>
  );
};