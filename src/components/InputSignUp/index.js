import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

Icon.loadFont();

import { Container, TextInput } from './style';

function InputSignUp ({style, icon, ...rest}, ref) {
  return (
    <Container style={style}>
        {icon && <Icon name={icon} size={20} color="rgba(0,0,255,0.8)"/>}
        <TextInput {... rest} ref={ref}/>
    </Container>
  );
}

InputSignUp.PropTypes = {
    icon: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

InputSignUp.defaultProps = {
    icon: null,
    style: {},
};

export default forwardRef (InputSignUp);
