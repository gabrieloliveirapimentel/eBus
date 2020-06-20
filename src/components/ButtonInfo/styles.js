import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    height: 40px;
    background: #283593;
    border-radius: 25px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 130px;
    margin-left: 10px;
`;

export const Text = styled.Text `
  color: #FFF;
  font-weight: bold;
  font-size: 16px; 
  justify-content: center;
`;
