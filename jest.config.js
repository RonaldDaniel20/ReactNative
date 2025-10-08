// jest.config.js
module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|expo|expo-constants|expo-modules-core|expo-font|expo-asset|@expo/vector-icons|react-native-vector-icons|@expo(nent)?/.*|@unimodules/.*|unimodules|@react-navigation/.*|@react-native-community|react-clone-referenced-element|react-router-native)/)'
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  setupFiles: ['<rootDir>/jest.env.js'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js']
};
