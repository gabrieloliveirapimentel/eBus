import React from 'react';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ActivityIndicator, View} from 'react-native';

Icon.loadFont();

import {Container, LoadingContainer, Text} from './styles';

export default function ButtonLogin({style, icon, children, loading, ...rest}) {
  if (loading == true){
    return (
      <LoadingContainer {...rest}>
        <ActivityIndicator size={28} color="#283593" />
      </LoadingContainer>
    );
  }
  else {
    return (
      <Container {...rest}>
        {icon && <Icon name={icon} size={20} style={{marginStart: 10}} color="#283593" />}
        <Text>{children}</Text>
      </Container>
    );
  }
  
}