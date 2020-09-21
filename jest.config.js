module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    '<rootDir>/lib'
  ],
  testMatch: [
    '**/tests/**/*.test.ts'
  ]
};