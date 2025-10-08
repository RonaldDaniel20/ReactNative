module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|expo|expo-constants|expo-modules-core|@expo(nent)?/.*|@unimodules/.*|unimodules|@react-navigation/.*|@react-native-community|react-clone-referenced-element)/)'
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js']
};
