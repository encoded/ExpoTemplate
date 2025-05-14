import { Platform, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// temp spacing
const SPACING = {
  paddingHorizontal: 24,
  sizeHeader: 48
};

export const getMarginTop = () => {
  const insets = useSafeAreaInsets();
  return Platform.OS === 'web' ? 8 : insets.top;
};

export const getMarginBottom = () => {
  const insets = useSafeAreaInsets();
  return Platform.OS === 'web' ? 8 : insets.bottom;
};

export const getMaxDimension = () => {
  const { width, height } = useWindowDimensions();
  return Math.max(width, height);
};

export const getMinDimension = () => {
  const { width, height } = useWindowDimensions();
  return Math.min(width, height);
};

export default SPACING;