// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'jsx'],
    testMatch: ['<rootDir>/**/__tests__/**/*.test.(js|jsx)'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  };
  