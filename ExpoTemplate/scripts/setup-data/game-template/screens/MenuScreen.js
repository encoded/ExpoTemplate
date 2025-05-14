import React from 'react';
import LayoutScreen from './LayoutScreen';
import ButtonBase from '@components/base/ButtonBase';

import NAVIGATION from '@config/ConfigNavigation';

export default function MenuScreen({ navigation }) {  
  return (
    <LayoutScreen>
      <ButtonBase
        text="Start"
        onPress={()=>navigation.navigate(NAVIGATION.SCREENS.GAME)}
      />
    </LayoutScreen>
  );
}
