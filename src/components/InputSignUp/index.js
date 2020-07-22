import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MaterialCommunityIcons as Icon2} from 'react-native-vector-icons';

Icon.loadFont();

import { Container, TextInput} from './style';

function InputSignUp ({style, icon, icon3, icon2, iconPress, ...rest}, ref) {
  return (
    <Container style={style}>
      {icon3 && <Icon2 name={icon3} size={20} color="rgba(0,0,255,1)"/>}
      {icon && <Icon name={icon} size={20} color="rgba(0,0,255,1)"/>}
      <TextInput {... rest} ref={ref}/>
      {icon2 && <Icon name={icon2} style={{marginStart:15}} onPress={iconPress} size={20} color="rgba(0,0,255,1)" />}
    </Container>
  );
}

export default forwardRef (InputSignUp);
