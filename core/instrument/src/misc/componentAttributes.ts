import {
  Story,
  StoriesKind,
  StoryParameters,
} from '@component-controls/specification';

export const componentsFromParams = (
  element: StoriesKind | Story | StoryParameters,
): string[] => {
  const result = [];
  let { component } = element;
  if (!component && element.parameters) {
    ({ component } = element.parameters);
  }
  if (typeof component === 'string') {
    result.push(component);
  }
  let { subcomponents } = element;
  if (!subcomponents && element.parameters) {
    ({ subcomponents } = element.parameters);
  }
  if (typeof subcomponents === 'string') {
    result.push(subcomponents);
  }
  if (typeof subcomponents === 'object') {
    Object.keys(subcomponents).forEach(key => result.push(subcomponents[key]));
  }
  return result;
};
