/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { View, StatusBar, Alert} from 'react-native';
import {
  Container,
  Form,
  FormInput,
  FormMaskInput,
  FormText,
  FormStatus,
  Header,
  Status,
  SubmitButton,
  SubmitView
} from './styles';

export default function Reserva ({navigation}) {
  const {email} = navigation.state.params;
  const [idUsuario, setIdUsuario] = useState(0);
  const [reservado, setReservado] = useState(false);
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [matricula, setMatricula] = useState('');
  const [horario, setHorario] = useState('');

  useEffect(() => {
    let mounted = true;
    fetch('http://192.168.100.6/verificaID_api.php', {
      //http://mybus.projetoscomputacao.com.br/verificaID_api.php
      method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        })
      }).then((response) => response.json())
        .then((resultado) => {
        if (mounted){
          setIdUsuario(resultado.id_usuario);}
      }).catch((error) => {
          Alert.alert('Erro na conexão!', 'Verifique sua internet');  
    });
    return () => mounted = false;
  },[]);

  function makeReservation (){
    fetch("http://192.168.100.6/reserva_api.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        matricula: matricula,
        horario: horario,
        origem: origem,
        destino: destino,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson== 'Matrícula inválida!'){
        Alert.alert('Matrícula inválida!', 'Verifique seus dados.');
      }
      else if (responseJson=='Viagem não encontrada, tente novamente!'){
        Alert.alert('Viagem não encontrada', 'tente novamente!');
      }
      else if (responseJson == 'Reserva feita com sucesso!'){
        setReservado(true);
        Alert.alert(responseJson);
      } else if(responseJson == 'Ônibus lotado, tente em outro horário!'){
        Alert.alert(responseJson);
      }
    })
    .catch((error) => {
      Alert.alert('Erro ao fazer a reserva!');
    });
  }
  
  if (reservado === false){
    return(
      <View style={{flex:1}}>
      <Header title="Reserva" icon="person" iconPress={() => navigation.navigate('Profile',{idUsuario: idUsuario})}/>
      <Container>
      <StatusBar backgroundColor="#283593" barStyle="light-content"/>
        <Form>
          <FormInput
            icon3="laptop" 
            autoCorrect={true}
            autoCapitalize="words"
            placeholder = "Matrícula"
            onChangeText={(data) => setMatricula(data)}
          />
          <FormMaskInput
            icon3="clock-outline"
            type={"datetime"}
            options={{
              format: "HH:mm",
            }}
            value={horario}
            placeholder="Horário"
            placeholderTextColor='rgba(0,0,255,0.4)'
            onChangeText={(data) => setHorario(data)}
          />
          <FormInput 
            icon3="map-marker-minus"
            autoCorrect={true}
            autoCapitalize="words"
            placeholder = "Origem"
            onChangeText={(data) => setOrigem(data)}
          />
          <FormInput
            icon3="map-marker-radius"
            autoCorrect={true}
            autoCapitalize="words"
            placeholder = "Destino"
            onChangeText={(data) => setDestino(data)}
          />
        </Form>
        <SubmitView>
          <SubmitButton
            onPress={() => setReservado(true)}
          >Reservar
          </SubmitButton>
        </SubmitView>
      </Container>
      </View>
    );
  } else {
    return(
    <View style={{flex:1}}>
    <Header title="Reserva" icon="person" iconPress={() => navigation.navigate('Profile',{idUsuario: idUsuario})}/>
    <StatusBar backgroundColor="#283593" barStyle="light-content"/>
    <Container>
      <Form>
        <FormText icon3="laptop" text={matricula}/>
        <FormText icon3="clock-outline" text={horario}/>
        <FormText icon3="map-marker" text={origem}/>
        <FormText icon3="map-marker-radius" text={destino}/>
        <FormStatus>
          <Status>Reservado</Status>
        </FormStatus>
      </Form>
      <SubmitView>
        <SubmitButton
          onPress={() => setReservado(false)}
        >Reservar
        </SubmitButton>
      </SubmitView>
    </Container>
    </View>
    );
  }
}