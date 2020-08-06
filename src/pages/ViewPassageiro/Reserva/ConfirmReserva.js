import React, {useState, useEffect} from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import { Container, Form, FormText, SignLink, SignCancelText} from './styles';
import {format} from 'date-fns';

export default function ConfirmReserva ({navigation}) {
  const {idUsuario} = navigation.state.params;
  const [horario, setHorario] = useState(navigation.state.params.horario);
  const [idViagem, setIDViagem] = useState('');
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [matricula, setMatricula] = useState('');
  const [loading, setloading] = useState(true);

  const today = new Date();
  const data = format(today, 'dd/MM/yyyy');

  useEffect(() => {
      fetch('http://ebus.projetoscomputacao.com.br/backend/myReserva_api.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_usuario: idUsuario,
          horario: horario,
        }),
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == 'Nenhum dado encontrado.'){
            Alert.alert('Nenhum dado encontrado!','Tente novamente!');
            setloading(false);
          } else {
            setMatricula(responseJson.matricula);
            setOrigem(responseJson.origem);
            setDestino(responseJson.destino);
            setIDViagem(responseJson.fk_Viagem_id_viagem);
            setloading(false);
          }
        }
      ).catch((error) => {
        Alert.alert('Erro na conexão', 'Verifique sua internet!');
        setloading(false);
      })
      
  },[]);

  const confirmCancel = () => {
    Alert.alert(
      "Deseja cancelar sua reserva?",
      "Confirme sua solicitação.",
      [
        { text: "Sim, quero!", onPress: () => cancelReserva()},
        {
          text: "Cancelar",
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  }

  function cancelReserva(){
    fetch('http://ebus.projetoscomputacao.com.br/backend/cancelReserva_api.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_usuario: idUsuario,
        id_viagem: idViagem
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson=='Reserva removida com sucesso!'){
          Alert.alert('Reserva removida!', 'A reserva foi removida com sucesso!');
          navigation.goBack();}
        else{
          Alert.alert(responseJson);
        }          
      })
      .catch((error) => {
        Alert.alert('Erro na conexão', 'Verifique sua internet!');
    });
  }

  if (loading == true){
    return (
      <View style={{flex:1, justifyContent:'center'}}>
        <ActivityIndicator size="large" color="#283593" />
      </View>
    );
  } else {
    return (
      <Container>
        <Form>
          <FormText icon="computer" text="Matrícula: " text2={matricula}/>
          <FormText icon3="calendar" text="Data: " text2={data}/>
          <FormText icon3="clock-outline" text="Horário: " text2={horario}/>
          <FormText icon3="map-marker" text="De: " text2={origem}/>
          <FormText icon3="map-marker-radius" text="Para: " text2={destino} />
        </Form>
        <SignLink>
          <SignCancelText onPress={confirmCancel}>Cancelar Reserva</SignCancelText>
        </SignLink>
      </Container>
    ); 
  }
}
