/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  projects: [
    {
      displayName: "unit",
      // All unit tests: files that end with .spec.js
      testMatch: ["**/*.spec.js"]
    },
    {
      displayName: "integration",
      // All integration tests: files that end with .test.js
      testMatch: ["**/*.test.js"]
    }
  ]
};
