/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import Button from '../../../components/Button';
import Input from '../../../components/InputSignUp';
import MaskInput from '../../../components/InputMask';
import Text from '../../../components/FormText';

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

export const Header = styled(CustomHeader)`
`;

export const FormMaskInput = styled(MaskInput)`
  color: 'rgba(0,0,255,0.8)';
  margin-bottom: 10px;
`;

export const SubmitView = styled.View`
  align-items: center;
  margin-top: 5px;
`;

export const SubmitButton = styled(Button)`
  align-items: center;  
`;

export const FormStatus = styled.View`
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  height: 30px;
`;

export const Status = styled.Text`
  font-size: 18px;
  color: #008000;
  font-weight: bold;
`;