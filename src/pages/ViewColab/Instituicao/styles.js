import styled from "styled-components/native";
import CustomHeader from "../../../components/CustomHeader";
import TabColab from '../../../components/TabColab';
import Input from '../../../components/InputSignUp';
import Text from '../../../components/FormText';
import MaskInput from '../../../components/InputMask';
import Button from '../../../components/Button';

export const Container = styled.View`
  flex: 1;
  
`;

export const Header = styled(CustomHeader)``;
export const Tab = styled(TabColab)``;


export const Form = styled.View`
  align-self: stretch;
  marginTop: 20px;
  padding: 0 30px;
`;

export const FormInput = styled(Input) `
  margin-bottom: 10px;
`;

export const FormText = styled(Text)`
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