import '@testing-library/jest-native/extend-expect';

jest.mock('expo-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    LinearGradient: ({ children, ...props }: any) => React.createElement(View, props, children),
  };
});
