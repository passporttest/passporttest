const { resolve } = require('path');
const pullAll = require('lodash/pullAll');
const uniq = require('lodash/uniq');

const PassportTest = {
  version: '1.0.0',
  dllPlugin: {
    defaults: {
      /**
       * we need to exclude dependencies which are not intended for the browser
       * by listing them here.
       */
      exclude: [
        'chalk',
        'compression',
        'cross-env',
        'express',
        'ip',
        'minimist',
        'sanitize.css',
        'mongoose',
        'lusca',
        'express-session',
        'connect-mongo',
        'dotenv',
        'body-parser',
        'ws',
        'express-validator',
      ],

      include: ['core-js', 'eventsource-polyfill', 'babel-polyfill', 'lodash'],

      path: resolve('../node_modules/passport-test-dlls'),
    },

    entry(pkg) {
      const dependencyNames = Object.keys(pkg.dependencies);
      const exclude =
        pkg.dllPlugin.exclude || PassportTest.dllPlugin.defaults.exclude;
      const include =
        pkg.dllPlugin.include || PassportTest.dllPlugin.defaults.include;
      const includeDependencies = uniq(dependencyNames.concat(include));

      return {
        passportTestDeps: pullAll(includeDependencies, exclude),
      };
    },
  },
};

module.exports = PassportTest;
