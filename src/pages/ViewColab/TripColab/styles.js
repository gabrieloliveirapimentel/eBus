/* eslint-disable prettier/prettier */
import styled from "styled-components/native";
import Button from "../../../components/Button";
import ButtonInfo from "../../../components/ButtonInfo";
import CustomHeader from "../../../components/CustomHeader";
import Input from "../../../components/InputSignUp";
import TabColab from "../../../components/TabColab";
import Text from "../../../components/FormText";
import MaskInput from "../../../components/InputMask";
import {RectButton} from 'react-native-gesture-handler';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const InfoContainer = styled.View`
  padding: 0 30px;
  flex: 1;
`;

export const NewContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 20px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const FormText = styled(Text)``;

export const Header = styled(CustomHeader)``;
export const Tab = styled(TabColab)``;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const SubButton = styled(ButtonInfo)`
  margin-top: 5px;
`;

export const ButtonView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const SignLink = styled.TouchableOpacity`
  align-items: center;
`;


export const FormMaskInput = styled(MaskInput)`
  color: "rgba(0,0,255,0.8)";
  margin-bottom: 10px;
`;

export const ItemView = styled(RectButton)`
  background-color: #e9e9e9;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 15px;
`;

export const Item = styled.View`
  flex-direction: row;
  margin-left: 20px;
`;

export const PickerContainer = styled.View`
  flex-direction: row;
  backgroundColor: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  height: 46px;
  margin-bottom: 10px;
`;

export const PickerIcon = styled(Icon)`
  marginLeft: 12px;
  justify-content: center;
  align-self: center;
`;

export const Placas = styled.Text`
  align-self: center;
  margin-left: 10px;
  margin-right: 17px;
  font-size: 16px;
  color: rgba(0,0,255,0.8);
`;


