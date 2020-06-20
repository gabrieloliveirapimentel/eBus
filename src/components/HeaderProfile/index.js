import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StatusBar} from 'react-native';
import {Button, Right, Body, Left} from 'native-base';

Icon.loadFont();

import {Container, TextHeader} from './style';

function HeaderProfile({style, title, iconPress, iconPress2,...rest}) {
  return (
    <Container title={title} style={style}>
      <StatusBar backgroundColor="#283593" barStyle="light-content"/>
      <Left>
        <Button transparent onPress={iconPress}>
          <Icon style={{marginBottom:8, marginLeft:5}} name= "arrow-back" size={22} color='#fff'/>
        </Button>
      </Left>
      <Body style={{padding: 7, marginBottom:8}}>
        <TextHeader style={style}>{title}</TextHeader>
      </Body>
      <Right>
        <Button transparent onPress={iconPress2}>
          <Icon style={{marginBottom:8, marginRight:5}} name= "exit-to-app" size={22} color='#fff'/>
        </Button>
      </Right>
    </Container>
  );
}
export default HeaderProfile;
