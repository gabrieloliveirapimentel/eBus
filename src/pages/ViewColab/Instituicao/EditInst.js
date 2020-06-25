import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';

import { Container, Header, Tab, Form, FormInput, FormText, SignLink, SubmitButton } from "./styles";

/*nome, telefone, numero, complemento, fk_Endereco_id_endereco */
/* cep, rua, bairro, cidade, uf */

export default function EditInst ({navigation}){
  return (
    <Container>
      <ScrollView>
        <Form>
          <FormText icon="school" text="CEFET-MG"/>
        </Form>
        </ScrollView>
    </Container>
  );
}