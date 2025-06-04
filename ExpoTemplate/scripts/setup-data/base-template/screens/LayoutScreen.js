import React from 'react';
import { View, StyleSheet } from 'react-native';
import COLORS from '@config/ConfigColors';
import SPACING, { getMarginBottom, getMarginTop } from '@config/ConfigSpacing';

export default function LayoutScreen({ children, style }) {
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: getMarginTop() + SPACING.sizeHeader,
          paddingBottom: getMarginBottom()
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.paddingHorizontal
  },
});
