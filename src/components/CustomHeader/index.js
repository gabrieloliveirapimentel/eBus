/* eslint-disable prettier/prettier */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StatusBar} from 'react-native';
import {Button, Right, Body} from 'native-base';

Icon.loadFont();

import {Container, TextHeader} from './style';

function CustomHeader({style, title, icon, iconPress,...rest}) {
  return (
    <Container title={title} style={style}>
      <StatusBar backgroundColor="#283593" barStyle="light-content"/>
      <Body style={{padding: 7, marginBottom:8}}>
        <TextHeader style={style}>{title}</TextHeader>
      </Body>
      <Right>
        <Button transparent onPress={iconPress}>
          <Icon name={icon} size={22} color='#fff'/>
        </Button>
      </Right>
    </Container>
  );
}
export default CustomHeader;
