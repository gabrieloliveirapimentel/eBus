/* eslint-disable prettier/prettier */
import styled from "styled-components/native";
import Input2 from '../../../components/InputSignUp';
import TabBar from '../../../components/TabBar';
import CustomHeader from '../../../components/CustomHeader';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Form = styled.View`
  align-self: stretch;
`;

export const FormInput = styled(Input2)`
  margin-bottom: 0px;
`;

export const Header = styled(CustomHeader)``;
export const Tab = styled(TabBar)``;