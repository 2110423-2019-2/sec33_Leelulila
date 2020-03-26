module.exports = {
    // setupTestFrameworkScriptFile: "./configs/enzyme",
    collectCoverageFrom: ['./src/component/*.{js,jsx}', 'src/pages/*.{js,jsx}', '!**/node_modules/**'],
    transform: {
      "^.+\\.js?$": "babel-jest"
    },
    setupFilesAfterEnv: ["./configs/enzyme.js"],
    testPathIgnorePatterns: ['./<rootDir>/(build|config|node_modules)/']
  };