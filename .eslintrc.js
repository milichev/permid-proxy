'use strict';

module.exports = {
  extends: [
    'eslint:recommended',
  ],
  'plugins': [
    'prettier',
  ],
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    'comma-dangle': [
      'error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'always-multiline',
      }],
  },
  parserOptions: {
    sourceType: 'module',
  },
  globals: {
    window: false,
    jest: false,
    describe: false,
    it: false,
    expect: false,
    beforeEach: false,
    afterEach: false,
  },
};
