import * as fs from 'fs';
import * as chalk from 'chalk';
import { getOptions } from 'loader-utils';
import { loader } from 'webpack';

import {
  InstrumentOptions,
  parseStories,
} from '@component-controls/instrument';

import { addStoriesDoc, removeStoriesDoc } from './store';

module.exports = async function() {
  const context = (this as unknown) as loader.LoaderContext;
  const options: InstrumentOptions = getOptions(context) || {};
  const filePath = context.resource;
  const source = fs.readFileSync(filePath, 'utf8');
  const { transformed, ...store } = await parseStories(
    source,
    filePath,
    options,
  );
  if (store?.doc) {
    console.log(chalk.bgRgb(244, 147, 66)('@loaded: '), filePath);
    if (store.stories && store.components && store.packages) {
      addStoriesDoc(filePath, context._compilation.records.hash, {
        stories: store.stories,
        components: store.components,
        packages: store.packages,
        doc: {
          ...store.doc,
          fileName: filePath,
        },
      });
    }
  } else {
    removeStoriesDoc(filePath);
  }
  return transformed;
};
