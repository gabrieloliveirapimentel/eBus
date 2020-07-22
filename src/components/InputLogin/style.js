import styled from 'styled-components/native';

export const Container = styled.View`
  height: 46px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  flex-direction: row;
`;

export const IconContainer = styled.View`
  height: 46px;
  width: 46px;
  borderTopLeftRadius: 20px;
  borderBottomLeftRadius: 20px;
  backgroundColor: 'rgba(0, 0, 0, 0.1)';
  justifyContent: center;
  align-items: center;
`;

export const PassContainer = styled.View`
  height: 46px;
  width: 46px;
  justifyContent: center;
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

