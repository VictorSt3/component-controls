import { useRecoilValue, selectorFamily } from 'recoil';
import { Pages } from '@component-controls/core';

import {
  docsSelector,
  DocCountType,
  useDocs,
  docSortByTypeAtom,
  docSortFn,
} from './document';

const docPropCountSelector = selectorFamily<DocCountType, string>({
  key: 'docs_prop_count',
  get: category => ({ get }) => {
    const docs = get(docsSelector);
    return Object.keys(docs).reduce((acc: { [key: string]: number }, key) => {
      const doc = docs[key];
      const value = (doc as any)[category];
      const values = Array.isArray(value) ? value : [value];
      values.forEach(v => {
        if (v !== undefined) {
          if (typeof acc[v] === 'undefined') {
            acc[v] = 0;
          }
          acc[v] = acc[v] + 1;
        }
      });
      return acc;
    }, {});
  },
});

export const useDocPropCount = (category: string): DocCountType => {
  return useRecoilValue(docPropCountSelector(category));
};

export const usePagesByCategory = (category: string, value?: any): Pages => {
  const docs = useDocs();
  const sort = useRecoilValue(docSortByTypeAtom(category));
  return Object.keys(docs)
    .filter(key => {
      const doc = docs[key];
      //@ts-ignore
      const catValue = doc[category];
      if (value === undefined) {
        return catValue !== undefined;
      }
      const catValues = Array.isArray(catValue) ? catValue : [catValue];
      return catValues.some(v => v === value);
    })
    .map(key => docs[key])
    .sort(docSortFn(sort));
};
