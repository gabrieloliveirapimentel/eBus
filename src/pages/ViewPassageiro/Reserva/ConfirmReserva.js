import React from 'react';
import { View } from 'react-native';

import { Container, Form, FormText } from './styles';

export default function ConfirmReserva ({navigation}) {
  const {horario} = navigation.state.params;
  const {id_viagem} = navigation.state.params;
  const {id_usuario} = navigation.state.params; 

  return (
    <Container>
      <Form>
        <FormText icon3="clock-outline" text={horario}/>
        <FormText icon3="map-marker" text={id_viagem}/>
        <FormText icon3="map-marker-radius" text={id_usuario}/>
      </Form>
    </Container>
  );
}
