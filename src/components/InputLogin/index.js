/* eslint-disable prettier/prettier */
import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

Icon.loadFont();

import {Container, TextInput} from './style';

function InputLogin({style, icon, ...rest}, ref) {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="rgba(255,255,255,1.0)" />}
      <TextInput {...rest} ref={ref} />
    </Container>
  );
}

InputLogin.PropTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

InputLogin.defaultProps = {
  icon: null,
  style: {},
};

export default forwardRef(InputLogin);
