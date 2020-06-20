import React from 'react';
import {Container, Text} from './styles';

export default function ButtonInfo({style, children, ...rest}) {
  return (
    <Container {...rest}>
      <Text>{children}</Text>
    </Container>
  );
}