import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';

import { Container, Header, Tab, Form, FormInput, FormText, SignLink, SubmitButton } from "./styles";

/*nome, telefone, numero, complemento, fk_Endereco_id_endereco */
/* cep, rua, bairro, cidade, uf */

export default function Instituicao ({navigation}){
  const [nome, setNome] = useState('CEFET-MG');
  const [telefone, setTelefone] = useState('(32) 3649-0012');
  const [CEP, setCEP] = useState('36700-001');
  const [rua, setRua] = useState('Rua José Peres');
  const [num, setNum] = useState('100');
  const [complemento, setComplemento]= useState('');
  const [bairro, setBairro] = useState('Centro');
  const [cidade, setCidade] = useState('Leopoldina');
  const [UF, setUF] = useState('MG');

  return (
    <View style={{flex:1}}>
    <Header title="Instituição" icon="edit" iconPress={() => navigation.navigate('EditInstituicao')}/>
    <ScrollView>
    <Container>
        <Form>
          <FormText icon="school" text={nome}/>
          <FormText icon="call" text={telefone}/>
          <FormText icon="map" text={CEP}/>
          <FormText icon="home" text={rua}/>
          <FormText icon3="numeric-1-box-multiple-outline" text={num}/>
          <FormText icon3="home-city" text={complemento}/>
          <FormText icon3="city-variant" text={bairro}/>
          <FormText icon3="city-variant-outline" text={cidade}/>
          <FormText icon="public" text={UF}/>
        </Form>
    </Container>
    </ScrollView>
    <Tab
        onPress1={() => navigation.navigate('ViagemColab')}
        color1="rgba(255,255,255,0.5)"
        onPress2={() => {}}
        color2="#fff"
      />
    </View>
  );
}