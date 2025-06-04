import React from 'react';
import LayoutScreen from './LayoutScreen';
import TextButton from '@src/base/TextButton';

import NAVIGATION from '@config/ConfigNavigation';

export default function MenuScreen({ navigation }) {  
  return (
    <LayoutScreen>
      <TextButton
        text="Start"
        onPress={()=>navigation.navigate(NAVIGATION.SCREENS.GAME)}
      />
    </LayoutScreen>
  );
}
