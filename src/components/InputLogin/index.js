/* eslint-disable prettier/prettier */
import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
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

/*
InputLogin.PropTypes = {
  icon: PropTypes.string,
  icon2: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

InputLogin.defaultProps = {
  icon: null,
  icon2: null,
  style: {},
};
*/
export default forwardRef(InputLogin);
