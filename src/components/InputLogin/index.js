import React, {forwardRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

Icon.loadFont();

import {Container, TextInput, IconContainer, PassContainer} from './style';

function InputLogin({style, icon, icon2, iconPress, ...rest}, ref) {
  return (
    <Container style={style}>
      <IconContainer style={style}>
        {icon && <Icon name={icon} size={20} color="rgba(255,255,255,1.0)" />}
      </IconContainer>
      <TextInput {...rest} ref={ref} />
      <PassContainer> 
        {icon2 && <Icon name={icon2} onPress={iconPress} size={20} color="rgba(255,255,255,1.0)" />}
      </PassContainer>
    </Container>
  );
}

export default forwardRef(InputLogin);
