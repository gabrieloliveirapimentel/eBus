/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';

export const Container = styled.View`
  flex: 1;
`;

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

export const Origem = styled.Text`
  align-self: center;
  margin-left: 10px;
  margin-right: 8px;
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

export const TextHorario = styled.Text`
  margin-left: 20px;
  margin-top: 15px;
  font-size: 16px;
`;

export const Erro = styled.Text`
  margin-left: 25px;
  margin-top: 5px;
  font-size: 16px;
  font-weight: bold;
  color: rgba(255,0,0,255);
`;