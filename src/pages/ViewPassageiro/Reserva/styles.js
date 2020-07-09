/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import Button from '../../../components/Button';
import Input from '../../../components/InputSignUp';
import MaskInput from '../../../components/InputMask';
import Text from '../../../components/FormText';
import FormHorario from '../../../components/FormHour';
import {RectButton} from 'react-native-gesture-handler';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px;
`;

export const ListContainer = styled.View`
  flex: 1;
  justify-content: center;
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

export const FormHour = styled(FormHorario)`
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

export const PickerContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  backgroundColor: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  height: 46px;
`;

export const PickerIcon = styled(Icon)`
  marginLeft: 12px;
  justify-content: center;
  align-self: center;
`;

export const Origem = styled.Text`
  align-self: center;
  margin-left: 10px;
  margin-right: 17px;
  font-size: 16px;
  color: rgba(0,0,255,0.6);
`;

export const Destino = styled.Text`
  align-self: center;
  margin-left: 10px;
  margin-right: 5px;
  font-size: 16px;
  color: rgba(0,0,255,0.6);
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 5px;
  margin-bottom: 10px;
  align-items: center;
`;

export const SignLinkText = styled.Text`
  margin-top: 5px;  
  color: rgba(0,0,255,0.6);
  font-weight: bold;
  font-size: 16px;
`;

export const SignCancelText = styled.Text`
  margin-top: 5px;  
  color: rgba(255,0,0,255);
  font-weight: bold;
  font-size: 16px;
`;

export const ItemView = styled(RectButton)`
  background-color: #e9e9e9;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 15px;
  align-items: center;
`;
