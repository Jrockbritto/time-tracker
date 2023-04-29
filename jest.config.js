/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
module.exports = {
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
    '^@modules/(.*)$': '<rootDir>/modules/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1',
    '^@config/(.*)$': '<rootDir>/config/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  maxWorkers: 1,
  setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
  collectCoverageFrom: ['<rootDir>/modules/**/services/*.useCase.(t|j)s', '<rootDir>/modules/**/utils/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
