module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          '@components': './app/components',
          '@screens': './app/screens',
          '@context': './app/context',
          '@types': './app/types',
        },
      },
    ],
    'react-native-reanimated/plugin'],
};

