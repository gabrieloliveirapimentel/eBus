import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInputMask } from "react-native-masked-text";
import {MaterialCommunityIcons as Icon2} from 'react-native-vector-icons';

Icon.loadFont();

import { Container, PassContainer} from './styles';

function InputMask ({style, icon, icon2, icon3, icon4, iconPress, ...rest}, ref) {
  return (
    <Container style={style}>
      {icon3 && <Icon2 name={icon3} size={20} color="rgba(0,0,255,1)"/>}
      {icon && <Icon name={icon} size={20} color="rgba(0,0,255,1)"/>}
      <TextInputMask {...rest} style={{marginLeft: 10, fontSize: 15, flex:1, color: 'rgba(0,0,255,0.8)'}} ref={ref}/>
      <PassContainer> 
        {icon2 && <Icon style={{marginStart:15}} name={icon2} onPress={iconPress} size={20} color="rgba(0,0,255,1)" />}
        {icon4 && <Icon2 style={{marginStart:15}} onPress={iconPress} name={icon4} size={20} color="rgba(0,0,255,1)"/>}
      </PassContainer>
    </Container>
  );
}

export default forwardRef (InputMask);
