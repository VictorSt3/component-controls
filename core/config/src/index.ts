import * as path from 'path';
import * as fs from 'fs';
import { sync as globSync } from 'glob';
import yargs from 'yargs';
import { Configuration } from '@component-controls/specification';

export const buildConfigFileNames = [
  'build.js',
  'build.json',
  'main.js',
  'main.json',
  'main.ts',
];

export const optionsFileNames = ['runtime.js', 'options.js'];
export interface ConfigrationResult {
  config: Configuration;
  configPath: string;
  optionsFilePath?: string;
}
/**
 * return the configration folder from command-line parameters
 * command line accepts -c/ -config parameter for config path
 * the config file is assumed named main.js/main.ts
 * @param baseFolder project folder to start the search with
 */
export const getConfigurationArg = (
  args: string[] = process.argv,
): string | undefined => {
  const argv = yargs(args)
    .option('config', {
      alias: 'c',
      description: 'configuration folder',
      type: 'string',
    })
    .help()
    .alias('help', 'h').argv;
  return argv.config;
};

/**
 *  given a base project folder and a configuration folder, returns the configuration file
 *
 * @param baseFolder project folder to start the search with
 * @param configFolder folder where the configuration file is located
 * @param args optional arguments
 */
export const loadConfiguration = (
  baseFolder: string,
  configFolder?: string,
  args?: string[],
): ConfigrationResult | undefined => {
  const folder = configFolder ?? getConfigurationArg(args);
  const configPath = folder ? path.resolve(baseFolder, folder) : baseFolder;
  const allFiles = fs.readdirSync(configPath);
  const buildConfigFile = allFiles.find(file =>
    buildConfigFileNames.includes(file.toLowerCase()),
  );
  const optionsFile = allFiles.find(file =>
    optionsFileNames.includes(file.toLowerCase()),
  );

  if (buildConfigFile) {
    return {
      config: require(path.resolve(configPath, buildConfigFile)),
      optionsFilePath: optionsFile
        ? path.resolve(configPath, optionsFile)
        : undefined,
      configPath,
    };
  }
  return undefined;
};

/**
 * find the story files out of a configuration file
 * using glob for the regex file search
 * @param param0 configuration info return by getConfiguration
 */
export const extractStories = ({
  config,
  configPath,
}: ConfigrationResult): string[] | undefined => {
  const stories =
    config && config.stories
      ? config.stories.reduce((acc: string[], storyRg: string) => {
          const regex = storyRg.replace(/\((.*?)\)/g, '+($1)');
          return [...acc, ...globSync(path.resolve(configPath, regex))];
        }, [])
      : undefined;
  return stories;
};
