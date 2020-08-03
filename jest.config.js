module.exports = {
  moduleFileExtensions: ['ts', 'js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/souce/$1'
  },
  testMatch: ['<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'],
  testURL: 'http://localhost/',
  transformIgnorePatterns: ['<rootDir>/node_modules/']
}
