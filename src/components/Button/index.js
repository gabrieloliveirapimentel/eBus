import React from 'react';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, Text} from './styles';

export default function Button({style, icon, children, ...rest}) {
  return (
    <Container {...rest}>
      <Text>{children}</Text>
    </Container>
  );
}