import { config } from '../config.js';

export const ConfigValues = {
  AocUrl: 'AOC_URL',
  GithubUrl: 'GITHUB_URL',
};

export function getConfigValue(key) {
  if (!Object.values(ConfigValues).includes(key)) {
    return null;
  }

  return config[key] ?? null;
}
