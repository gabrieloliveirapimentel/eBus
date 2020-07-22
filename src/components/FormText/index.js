/* eslint-disable prettier/prettier */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MaterialCommunityIcons as Icon2} from 'react-native-vector-icons';
import {Right} from 'native-base';

Icon.loadFont();

import {Container, Form} from './styles';

function FormText({style, icon, icon2, icon3, iconPress, text, text2,...rest}) {
  return (
    <Container style={style}>
      {icon3 && <Icon2 name={icon3} size={20} color="rgba(0,0,255,1)"/>}
      {icon && <Icon name={icon} size={20} color="rgba(0,0,255,1)"/>}
      <Form {... rest} style={style}>{text}{text2}</Form>
      <Right>
        {icon2 && <Icon2 name={icon2} onPress={iconPress} size={20} color="rgba(0,0,255,1)" />}
      </Right>
      
    </Container>
  );
}
export default FormText;