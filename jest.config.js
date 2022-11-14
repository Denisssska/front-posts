const config = {
  verbose: false,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!react-markdown/)'
  ]
}
export default config