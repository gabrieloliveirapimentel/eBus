import React,{useState} from 'react';
import {ScrollView, Alert} from 'react-native';
import {CheckBox} from 'native-base';

import {
  BoxView,
  BoxText,
  NewContainer,
  Form,
  FormInput,
  FormMaskInput,
  SignLink,
  SubmitButton,
  TitleCheck,
  TextCheck
  } from './styles';

export default function NewBus ({ navigation }) {
  const {idUsuario} = navigation.state.params;
  const [placa, setPlaca] = useState('');
  const [linha, setLinha] = useState('');
  const [numVagas, setNumVagas] = useState(0);
  const [disp, setDisp] = useState(false);
  const [status, setStatus] = useState('');
  const [nome, setNome] = useState('');
  const [checkBox, setCheckBox] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);

  function NewBus () {
    if (placa == '' || linha == '' || numVagas == '' || nome == ''){
      Alert.alert('Campos em branco', 'Verifique os dados e tente novamente!');
    } else {
      fetch('http://mybus.projetoscomputacao.com.br/insertBus_api.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fk_id_usuario: idUsuario,
          placa: placa,
          linha: linha,
          num_vagas: numVagas,
          status: status,
          disponibilidade: disp,
          nome: nome,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson=='Ônibus cadastrado!'){
            Alert.alert(responseJson);
            navigation.goBack();}
          else{Alert.alert(responseJson);}
        }).catch((error) => {
          Alert.alert('Erro na conexão', 'Verifique sua internet!');
      });
    }
  }
  function toggleSwitch() {
    setCheckBox(true);
    setCheckBox2(false);
    setDisp(true);
  }
  
  function toggleSwitch2() {
    setCheckBox(false);
    setCheckBox2(true);
    setDisp(false);
  }

  return (
    <ScrollView animated='false'style={{marginHorizontal: 0}}>
    <NewContainer>
      <Form>
        <FormMaskInput
          icon3="card-text-outline" 
          autoCapitalize="characters"
          type={"custom"}
          options={{mask: 'AAA-9999'}}
          value={placa}
          placeholder="Placa"
          placeholderTextColor="rgba(0,0,255,0.4)"
          onChangeText={(data) => setPlaca(data)}
        />       
        <FormInput
          icon3="map-marker-distance" 
          autoCapitalize="none"
          autoCapitalize="sentences"
          placeholder="Linha"
          onChangeText={(data) => setLinha(data)}
        />
        <FormInput
          icon3="numeric" 
          autoCapitalize="none"
          keyboardType="number-pad"
          placeholder="Número de Vagas"
          maxLength = {2}
          placeholderTextColor="rgba(0,0,255,0.4)"
          onChangeText={(data) => setNumVagas(data)}
        />  
        <FormInput
          icon3="account" 
          autoCorrect={true}
          autoCapitalize="sentences"
          placeholder="Motorista"
          onChangeText={(data) => setNome(data)}
        />
        <FormInput
          icon3="bus" 
          autoCapitalize="none"
          keyboardType="number-pad"
          placeholder="Status do Ônibus"
          onChangeText={(data) => setStatus(data)}
        />
      <BoxView>
      <TitleCheck>Disponibilidade: </TitleCheck>
      <BoxText>
        <CheckBox
          color="rgba(0,0,255,0.6)"
          checked={checkBox}
          onPress={toggleSwitch}
        />
        <TextCheck>Disponível</TextCheck>
        <CheckBox
          style={{marginLeft: 20}}
          color="rgba(0,0,255,0.6)"
          checked={checkBox2}
          onPress={toggleSwitch2}
        />
        <TextCheck>Indisponível</TextCheck>
      </BoxText>
      </BoxView>
      </Form>
      <SignLink>
        <SubmitButton
          onPress={NewBus}
        >Cadastrar
        </SubmitButton>
      </SignLink>
    </NewContainer>  
    </ScrollView>
  );
  }
