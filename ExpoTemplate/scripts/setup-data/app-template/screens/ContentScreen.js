import React from 'react';
import LayoutScreen from './LayoutScreen';
import TextBase from '@src/base/TextBase';

export default function ContentScreen({ navigation }) {  
  return (
    <LayoutScreen>
      <TextBase>Hello from Content!</TextBase>
    </LayoutScreen>
  );
}
