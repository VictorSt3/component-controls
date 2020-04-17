import { getOptions } from 'loader-utils';

interface DocsOptions {
  pages: string[];
}
module.exports.default = async function() {
  const options: DocsOptions = (getOptions(this) as DocsOptions) || {};
  const { pages } = options;
  const callback = this.async();
  const code = ` 
  /* eslint-disable react/display-name */
  const React = require('react');
  const { addons, types } = require('@storybook/addons');
  import { BroadcastChannel } from 'broadcast-channel';
  ${pages
    .map((file, index) => `const pageConfig_${index} = require("${file}");`)
    .join('\n')}
  const { ManagerContainer } =  require('./ManagerContainer');
  
  const ADDON_ID = 'CUSTOM_PAGE_ADDON';
  
  const registerPages = configs => {
    configs.forEach(pageConfig => {
      const key = pageConfig.key;
      const title = pageConfig.title;
      addons.register(\`\${ADDON_ID}/\${key}\`, api => {
        addons.add(\`\${ADDON_ID}/\${key}\`, {
          type: types.TAB,
          title,
          route: ({ storyId }) => \`/\${key}/\${storyId}\`,
          match: ({ viewMode }) => viewMode === key,
          render: ({ active }) => {
            return React.createElement(ManagerContainer, {
              active,
              title,
              id:\`controls-docs-page-\${key}\`,
              api,
            });
          },
        });
      });
    });
  };
  const pageConfigs = [];
  ${pages
    .map(
      (file, index) =>
        `pageConfigs.push(pageConfig_${index}.default || pageConfig_${index});`,
    )
    .join('\n')}

  registerPages(pageConfigs);
  
`;
  return callback(null, code);
};