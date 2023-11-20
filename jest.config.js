import lodash from 'lodash';

const config = {
  testEnvironment: "jsdom",
  globals: {
    _: lodash
  },
  setupFiles: ['./setupTests.js']
};

export default config;