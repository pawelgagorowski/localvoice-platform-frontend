/* eslint-disable @typescript-eslint/no-var-requires */
//  eslint-disable import/no-extraneous-dependencies */
// module.exports = {
//   preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
// };

// import { Config } from '@jest/types';
// import { pathsToModuleNameMapper } from 'ts-jest';
// import { compilerOptions } from './tsconfig.json';

// const config: Config.InitialOptions = {
//   verbose: false,
//   testEnvironment: 'node',
//   preset: 'ts-jest',
//   moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
// };

// export default config;

// eslint-disable-next-line import/no-extraneous-dependencies
const deepmerge = require('deepmerge');
const preset = require('@vue/cli-plugin-unit-jest/presets/typescript-and-babel/jest-preset');

module.exports = deepmerge(preset, {
  // testMatch: ['**/src/**/*.spec.[jt]s?(x)'],
  testMatch: ['**/tests/**/*.spec.[jt]s?(x)'],
  moduleNameMapper: {
    '^~app/(.*)$': '<rootDir>/src/app/$1',
  },
  setupFiles: ['./jest.setup'],
  // collectCoverage: true,
  // collectCoverageFrom: ['src/**/*.{ts,vue}', '!**/node_modules/**'],
  // coverageReporters: ['html', 'text-summary'],
});
