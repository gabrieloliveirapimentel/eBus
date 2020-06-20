/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import Input from '../../components/InputLogin';
import ButtonLogin from '../../components/ButtonLogin';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
`;

export const FormInput = styled(Input)`
  margin-bottom: 12px;
`;

export const SubmitButton = styled(ButtonLogin)`
  margin-top: 5px;
  width: 200px;
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 10px;
  align-items: center;
`;

export const SignLinkText = styled.Text`
margin-top: 10px;  
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
   
