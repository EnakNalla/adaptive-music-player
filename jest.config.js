/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub'
  },
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/src/react/test-utils/setupTests.ts'],
  collectCoverageFrom: ['<rootDir>/src/react/**/{!(main),}.{ts,tsx}'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' })
};
