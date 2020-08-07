/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';
import CustomHeader from '../../../components/CustomHeader';
import TabBar from '../../../components/TabUser';

export const PickerContainer = styled.View`
  flex-direction: row;
  margin-left: 10px;
  margin-end: 10px;
  margin-top: 10px;
  backgroundColor: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  height: 50px;
`;

export const PickerIcon = styled(Icon)`
  marginLeft: 12px;
  justify-content: center;
  align-self: center;
`;

export const Header = styled(CustomHeader)``;
export const Tab = styled(TabBar)``;

export const Origem = styled.Text`
  align-self: center;
  margin-left: 10px;
  margin-right: 17px;
  font-size: 16px;
  color: rgba(0,0,255,0.8);
`;

export const Destino = styled.Text`
  align-self: center;
  margin-left: 10px;
  margin-right: 5px;
  font-size: 16px;
  color: rgba(0,0,255,0.8);
`;

export const Container = styled.View`
  flex: 1;
`;

export const TextHorario = styled.Text`
  margin-left: 20px;
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 16px;
  color: rgba(0,0,255,1);
`;

export const Erro = styled.Text`
  margin-left: 25px;
  margin-top: 15px;
  font-size: 16px;
  text-align: center;
`;

export const IconView = styled.View`
  alignItems: center;
  flex-direction: row;
  margin-left: 10px;
  margin-end: 10px;
  margin-top: 10px;
  backgroundColor: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  height: 50px;
`;