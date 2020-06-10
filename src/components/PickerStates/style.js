import styled from 'styled-components/native';
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
padding: 0 15px;
height: 46px;

background: rgba(0, 0, 0, 0.1);
border-radius: 10px;

flex-direction: row;
align-items: center;

`;

export const Picker = styled.Picker.attrs({
    placeholderTextColor: 'rgba(0,0,255,0.2)',
})`
    flex: 1;
    font-size: 15px;
    margin-left: 4px;
    color: 'rgba(0,0,255,0.8)';
`;