import React,{useState, useEffect} from 'react';
import {ScrollView, Alert} from 'react-native';
import {CheckBox} from 'native-base';

import {
  BoxView,
  BoxText,
  NewContainer,
  Form,
  FormText,
  FormInput,
  SignLink,
  SubmitButton,
  TitleCheck,
  TextCheck
  } from './styles';

export default function EditBus ({ navigation }) {
  const [editplaca, setPlaca] = useState(navigation.state.params.placa);
  const [editlinha, setLinha] = useState(navigation.state.params.linha);
  const [editnumVagas, setNumVagas] = useState(navigation.state.params.numVagas);
  const [editmotorista, setMotorista] = useState(navigation.state.params.motorista);
  const [editdisponivel, setDisponivel] = useState(navigation.state.params.disponivel);
  
  const [checkBox, setCheckBox] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);

  useEffect(() => {
    if(editdisponivel==true){
      setCheckBox(true);
    } else {
      setCheckBox2(true);
    }
  },[]);

  function toggleSwitch() {
    setCheckBox(true);
    setCheckBox2(false);
    setDisponivel(true);
  }
  
  function toggleSwitch2() {
    setCheckBox(false);
    setCheckBox2(true);
    setDisponivel(false);
  }

  function updateBus() {
    if (editlinha === '' || editnumVagas === '' || editmotorista === ''){
      Alert.alert('Dados em branco!', 'Verifique os campos e tente novamente.');
    } else {
      fetch('http://mybus.projetoscomputacao.com.br/updateBus_api.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }, body: JSON.stringify({
          placa: editplaca,
          linha: editlinha,
          num_vagas: editnumVagas,
          disponibilidade: editdisponivel,   
          nome: editmotorista,
        }),
      }).then((response) => response.json())
          .then((responseJson) => {
            if (responseJson=='Ônibus atualizado!'){
              Alert.alert(responseJson);
              navigation.navigate('Onibus');
            }
          }).catch((error) => {
          Alert.alert('Erro na conexão', 'Verifique sua internet!');
      });
    }
  }

  return (
    <ScrollView animated='false'style={{marginHorizontal: 0}}>
    <NewContainer>
      <Form>
        <FormText icon3="card-text-outline" text={editplaca}/>         
        <FormInput
          value={editlinha}
          icon3="bus" 
          autoCapitalize="none"
          keyboardType="number-pad"
          placeholder="Linha"
          onChangeText={(data) => setLinha(data)}
        />  
        <FormInput
          value={editnumVagas}
          icon3="numeric" 
          autoCapitalize="none"
          keyboardType="number-pad"
          placeholder="Número de Vagas"
          onChangeText={(data) => setNumVagas(data)}
        />
        <FormInput
          value={editmotorista}
          icon3="account" 
          autoCorrect={true}
          autoCapitalize="sentences"
          placeholder="Motorista"
          onChangeText={(data) => setMotorista(data)}
        />
      <BoxView>
      <TitleCheck>Disponibilidade: </TitleCheck>
      <BoxText>
        <CheckBox
          color="rgba(0,0,255,0.6)"
          checked={checkBox}
          onPress={toggleSwitch}
        />
        <TextCheck>Disponivel</TextCheck>
        <CheckBox
          style={{marginLeft: 20}}
          color="rgba(0,0,255,0.6)"
          checked={checkBox2}
          onPress={toggleSwitch2}
        />
        <TextCheck>Indisponivel</TextCheck>
      </BoxText>
      </BoxView>
      </Form>
      <SignLink>
        <SubmitButton
          onPress={updateBus}
        >Confirmar
        </SubmitButton>
      </SignLink>
    </NewContainer>  
    </ScrollView>
  );
}