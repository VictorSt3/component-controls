import * as fs from 'fs';
import * as chalk from 'chalk';
import { getOptions } from 'loader-utils';

import {
  InstrumentOptions,
  parseStories,
} from '@component-controls/instrument';

import { addStoriesDoc } from './store';

module.exports.pitch = async function() {
  const options: InstrumentOptions = getOptions(this) || {};
  const filePath = this.resource;
  const source = fs.readFileSync(filePath, 'utf8');
  const { transformed, ...store } = await parseStories(
    source,
    filePath,
    options,
  );
  if (store) {
    if (store.doc) {
      console.log(chalk.bgRgb(244, 147, 66)('@loaded: '), filePath);
      addStoriesDoc(filePath, {
        stories: store.stories,
        components: store.components,
        packages: store.packages,
        doc: {
          ...store.doc,
          fileName: filePath,
        },
      });
    }
  }
  return transformed;
};
