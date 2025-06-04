import React from 'react';
import LayoutScreen from './LayoutScreen';
import TextBase from '@src/base/TextBase';

export default function HomeScreen({ navigation }) {  
  return (
    <LayoutScreen>
      <TextBase>Hello from Home!</TextBase>
    </LayoutScreen>
  );
}
