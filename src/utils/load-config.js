import { config } from '../config.js';

export const ConfigValues = {
  AocUrl: 'AOC_URL',
  GithubUrl: 'GITHUB_URL',
};

export function getConfigValue(key) {
  const configValue = ConfigValues[key];

  if (!Object.keys(ConfigValues).includes(key)) {
    return null;
  }

  return config[configValue] ?? null;
}
