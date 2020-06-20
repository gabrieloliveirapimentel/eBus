import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    height: 40px;
    background: #FFF;
    border-radius: 25px;
    align-items: center;
    flex-direction: row;
    width: 200px;
`;

export const Text = styled.Text `
  color: #283593;
  font-weight: bold;
  font-size: 16px; 
  marginLeft: 50px;
  justify-content: center;
`;
