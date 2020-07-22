/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import Text from '../../../components/FormText';
import {RectButton} from 'react-native-gesture-handler';

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

export const FormText = styled(Text)`
`;


export const Header = styled(CustomHeader)`
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 5px;
  margin-bottom: 10px;
  align-items: center;
`;

export const SignLinkText = styled.Text`
  margin-top: 5px;  
  color: rgba(0,0,255,1);
  font-weight: bold;
  font-size: 17px;
`;

export const SignCancelText = styled.Text`
  margin-top: 5px;  
  color: rgba(255,0,0,255);
  font-weight: bold;
  font-size: 18px;
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

export const Item = styled.View`
  flex-direction: row;
  margin-left: 20px;
`;