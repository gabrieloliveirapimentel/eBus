/* eslint-disable prettier/prettier */
import React, {forwardRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MaterialCommunityIcons as Icon2} from 'react-native-vector-icons';

Icon.loadFont();

import {Container, Form} from './styles';

function FormText({style, icon, icon3, text, text2,...rest}) {
  return (
    <Container style={style}>
      {icon3 && <Icon2 name={icon3} size={20} color="rgba(0,0,255,0.8)"/>}
      {icon && <Icon name={icon} size={20} color="rgba(0,0,255,0.8)"/>}
  <Form {... rest} style={style}>{text}{text2}</Form>
    </Container>
  );
}
export default FormText;