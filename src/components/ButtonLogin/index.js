import React from 'react';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

Icon.loadFont();

import {Container, Text} from './styles';

export default function ButtonLogin({style, icon, children, ...rest}) {
  return (
    <Container {...rest}>
      {icon && <Icon name={icon} size={20} style={{marginStart: 10}} color="#283593" />}
      <Text>{children}</Text>
    </Container>
  );
}

/*
ButtonLogin.propTypes = {
  children: propTypes.string.isRequired,
  icon: propTypes.string,
};

ButtonLogin.defaultProps = {
  icon: null,
};
*/