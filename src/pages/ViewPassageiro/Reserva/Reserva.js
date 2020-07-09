/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { View, StatusBar, Alert, StyleSheet, FlatList, Text, ScrollView, SafeAreaView, ActivityIndicator, Platform} from 'react-native';
import { Picker } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import {
  Container,
  Form,
  FormText,
  Header,
  PickerContainer,
  PickerIcon,
  Origem,
  Destino,
  SubmitButton,
  SignLink,
  SignLinkText
} from './styles';

export default function Reserva ({navigation}) {
  const {email} = navigation.state.params;
  const [idUsuario, setIdUsuario] = useState(0);
  const [OrigemValue, setOrigemValue] = useState('');
  const [DestinoValue, setDestinoValue] = useState('');
  const [dataSource, setdataSource] = useState([]);
  const [loading, setloading] = useState(true);
  const [vagas, setVagas] = useState('0');

  const today = new Date();
  const [horario, setHorario] = useState('Selecione um horário');
  const data = format(today, 'dd/MM/yyyy');
  const todayData = format(today, 'dd-MM-yyyy');

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    const formmated = format(currentDate, 'HH:mm');
    setHorario(formmated);
    setShow(false);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  function goToListReserva(){
    navigation.navigate('ListReserva',{
      idUsuario: idUsuario
    });
  }

  function alertReserva(){
    return (
      Alert.alert(
        "Fazer reserva para às "+horario+"?",
        "Caso deseja realizar a reserva para este horário, clique em 'SIM'.",
        [
          { text: "Sim!", onPress: () => makeReserva()},
          {
            text: "Cancelar",
            style: "cancel"
          }
        ],
        { cancelable: false }
      )
    );
  }

  

  function makeReserva(){
    if (horario == 'Selecione um horário'){
      Alert.alert('Horário inválido!','Selecione um horário para fazer a reserva.');
    } else {
      fetch("http://ebus.projetoscomputacao.com.br/backend/makeReserva_api.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fk_usuario: idUsuario,
          horario: horario,
          origem: OrigemValue,
          destino: DestinoValue,
          data: todayData
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == 'Reserva já feita!'){
            Alert.alert('Erro ao fazer reserva!','Reserva já feita para essa viagem!');
          } else if (responseJson == "Ônibus lotado, tente em outro horário!") {
            Alert.alert('Viagem lotada!', 'Tente novamente em outro horário!');
          } else if (responseJson == 'Viagem indisponível, tente em outro horário!'){
            Alert.alert('Viagem indisponível!', 'Tente novamente em outro horário!');
          } else if (responseJson == 'Reserva feita com sucesso!') {
            Alert.alert('Reserva feita com sucesso!', 'A solicitação foi feita com sucesso!');
            navigation.navigate('ConfirmReserva', {idUsuario: idUsuario, horario: horario});
          } else if (responseJson == 'Erro ao fazer Reserva!') {
            Alert.alert('Erro ao fazer a reserva!', 'Verifique os dados e tente novamente.');
          } else {
            Alert.alert(responseJson);
          }
          // Showing response message coming from server after inserting records.
        })
        .catch((error) => {
          Alert.alert("Erro na conexão", "Verifique sua internet!");
        });
    }
  }

  useEffect(() => {
    let mounted = true;
    fetch('http://ebus.projetoscomputacao.com.br/backend/myID_api.php', {
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
          setIdUsuario(resultado.id_usuario);
        }
      }).catch((error) => {
          Alert.alert('Erro na conexão!', 'Verifique sua internet');  
    });
    setloading(false);
    return () => mounted = false;
  },[]);

  useEffect(() => {
    fetch('http://ebus.projetoscomputacao.com.br/backend/scheduleTrip_api.php')
      .then((response) => response.json())
      .then((responseJson) => {
        setdataSource(responseJson);
      })
      .catch((error) => {
        Alert.alert('Erro na conexão!', 'Tente novamente!');
      });
  },[]);

  useEffect(() => {
    fetch('http://ebus.projetoscomputacao.com.br/backend/vagasReserva_api.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origem: OrigemValue,
          destino: DestinoValue,
          horario: horario,
        }),
      }).then((response) => response.json())
        .then((responseJson) => {
          setVagas(responseJson.num_vagas);
        }
      ).catch((error) => {
        Alert.alert('Erro na conexão', 'Verifique sua internet!');
        setloading(false);
      })
  },[OrigemValue, DestinoValue, horario]);
  
  if (loading){
    return (
      <View style={{flex:1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#283593" />
      </View>
    );
  } else {
      return(
      <View style={{flex:1}}>
      <Header title="Reserva" icon="person" iconPress={() => navigation.navigate('Profile',{idUsuario: idUsuario})}/>
      <StatusBar backgroundColor="#283593" barStyle="light-content"/>
      <ScrollView>
      <Container>
        <Form>        
          <PickerContainer>
            <PickerIcon name="map-marker" size={20} color="rgba(0,0,255,0.6)"/>
            <Origem>De:</Origem>
            <Picker
              style={styles.PickerInput}
              selectedValue={OrigemValue}
              onValueChange={(itemvalue, itemIndex) => setOrigemValue(itemvalue)}
            >
            {dataSource.map((item, key) => (
            <Picker.Item label={item.origem} value={item.origem} key={key}/>))}
            </Picker>
          </PickerContainer> 
          <PickerContainer>
            <PickerIcon name="map-marker-radius" size={20} color="rgba(0,0,255,0.6)"/>
            <Destino>Para:</Destino>
            <Picker
              style={styles.PickerInput}
              selectedValue={DestinoValue}
              onValueChange={(itemvalue, itemIndex) => setDestinoValue(itemvalue)}
            >{dataSource.map((item, key) => (
              <Picker.Item label={item.destino} value={item.destino} key={key}/>))}
            </Picker>
          </PickerContainer>
          <FormText icon3="calendar" text="Data:  " text2={data} />
          <FormText icon3="clock-outline" text="Horário:  " text2={horario} icon2="calendar-clock" iconPress={showTimepicker}/>
          <FormText icon3="numeric" text="Vagas disponíveis:  " text2={vagas} />
          <SignLink>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={today}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </SignLink>
        </Form>
        <SignLink>
          <SubmitButton onPress={alertReserva}>Reservar</SubmitButton>
        </SignLink>
        <SignLink>
          <SignLinkText onPress={goToListReserva}>Já fez sua reserva?</SignLinkText>
        </SignLink>
      </Container>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  PickerInput: {
    alignItems:'center',
    justifyContent: 'center',
    width: 170,
    height: 50,
    color: 'rgba(0,0,255,0.6)',
  },
});

