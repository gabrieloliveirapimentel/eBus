/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;

  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.8)',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #fff;
`;
