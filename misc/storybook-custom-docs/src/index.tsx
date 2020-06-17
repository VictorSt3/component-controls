import * as React from 'react';
import addons from '@storybook/addons';
import { SET_CURRENT_STORY } from '@storybook/core-events';
import { ConfigApi } from '@storybook/client-api';
export * from './types';

/**
 * function returning the global options
 * parameters and decorators
 */
export const getGlobalOptions = (): any => {
  const store =
    window &&
    //@ts-ignore
    window.__STORYBOOK_CLIENT_API__ &&
    //@ts-ignore
    window.__STORYBOOK_CLIENT_API__.store();
  //@ts-ignore
  return store._globalMetadata;
};

/**
 * function returning the current story id
 */
export const getCurrentStoryId = (): string | undefined => {
  const store =
    window &&
    //@ts-ignore
    window.__STORYBOOK_CLIENT_API__ &&
    //@ts-ignore
    window.__STORYBOOK_CLIENT_API__.store();

  const selection = store.getSelection();
  //@ts-ignore
  return selection ? selection.storyId : undefined;
};

/**
 * React hook hook that tracks the changes to the current story and returns it's id
 * @param defaultId initial story value, if not provided will return the current story
 * @returns a story id as a React hook, when the the current story changes, will call back
 */
export const useStoryId = () => {
  const [storyId, setStoryId] = React.useState<string>(
    getCurrentStoryId() || '.',
  );
  const channel = React.useMemo(() => addons.getChannel(), []);
  React.useEffect(() => {
    const onStoryChange = ({ storyId: id }: { storyId: string }) => {
      setStoryId(id);
    };
    channel.on(SET_CURRENT_STORY, onStoryChange);

    return () => {
      channel.off(SET_CURRENT_STORY, onStoryChange);
    };
  }, [channel]);
  return storyId;
};

/**
 * React hook - returns a context similar (but not identical) that can be used as an input attribute to `<DocsContainer />`
 */
export const useContext = () => {
  const channel = addons.getChannel();
  const storyId = useStoryId();
  //@ts-ignore
  const clientApi = window.__STORYBOOK_CLIENT_API__;
  const storyStore = clientApi._storyStore;
  //@ts-ignore
  const configApi = new ConfigApi({
    storyStore,
    //@ts-ignore
    channel: addons.getChannel(),
  });
  const context = {
    configApi,
    storyStore,
    channel,
    clientApi,
  };

  const data = storyStore.fromId(storyId);

  const { kind, name, parameters = {} } = data || {};

  return {
    ...context,
    ...data,
    selectedKind: kind,
    selectedStory: name,
    parameters,
    storyId,
  };
};
