/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/InputSignUp';
import MaskInput from '../../components/InputMask';
import Text from '../../components/FormText';
import HeaderProfile from '../../components/HeaderProfile';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  marginTop: 20px;
`;

export const FormInput = styled(Input) `
  margin-bottom: 10px;
`;

export const FormText = styled(Text)`
`;

export const CustomHeaderProfile = styled(HeaderProfile)`
`;


export const FormMaskInput = styled(MaskInput)`
  color: 'rgba(0,0,255,0.8)';
  margin-bottom: 10px;
`;

export const FormStatus = styled.View`
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  height: 30px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const SignLink = styled.TouchableOpacity`
  align-items: center;
  margin-top: 10px; 
  margin-bottom: 15px; 
`;

export const DeleteForm = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px; 
`;

export const SignLinkText = styled.Text`
  color: rgba(255,0,0,255);
  font-weight: bold;
  font-size: 16px;
  margin-left: 10px;
`;
