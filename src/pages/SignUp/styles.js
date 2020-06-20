/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import Input from '../../components/InputSignUp';
import MaskInput from '../../components/InputMask';
import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 20px;
`;

export const FormInput = styled(Input) `
  margin-bottom: 10px;
`;

export const FormMaskInput = styled(MaskInput)`
  color: 'rgba(0,0,255,0.8)';
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const SignLink = styled.TouchableOpacity`
  align-items: center;
`;

export const SignLinkText = styled.Text`
  margin-top: 5px;
  margin-bottom: 20px;  
  color: #283593;
  font-weight: bold;
  font-size: 16px;
`;

export const TextCheck = styled.Text`
  margin-left: 15px;
  color: #283593;
  font-size: 16px;
`;

export const TextCheckLink = styled.Text`
  color: #283593;
  font-size: 16px;
  font-weight: bold;
`;
   
export const BoxView = styled.View`
  align-items: center;
  flex-direction: row;
  height: 35px;
  margin-top: 10px;
`;
