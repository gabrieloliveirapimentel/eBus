import React, { useState } from "react";
import { ScrollView, Alert} from "react-native";
import { parseISO, format } from "date-fns";
import pt from 'date-fns/locale/pt-BR';
import moment from 'moment';
import {
  NewContainer,
  Form,
  FormInput,
  SignLink,
  SubmitButton,
  FormMaskInput,

} from "./styles";

export default function EditTrip({ navigation }) {
  const { Text_Id_Viagem } = navigation.state.params;
  const [Text_Horario, setText_Horario] = useState(navigation.state.params.Text_Horario);
  const [Text_Origem, setText_Origem] = useState(navigation.state.params.Text_Origem);
  const [Text_Destino, setText_Destino] = useState(navigation.state.params.Text_Destino);
  const [Text_Placa, setText_Placa] = useState(navigation.state.params.Text_Placa);

  const parsedDate = parseISO(navigation.state.params.Text_Data);
  const dateCorrect = format(parsedDate, 'dd-MM-yyyy');
  const [Text_Data, setText_Data] = useState(dateCorrect);

  const today = new Date();
  const hour = moment(today).format("HH:mm",{locale: pt});
  const todayHour = moment(today).format("HH:mm:ss",{locale: pt});
  const todayData = moment(today).format("yyyy-MM-DD",{locale: pt});
  const todayVerified = todayData + ' ' + todayHour;

  function updateTrip() {
    if (Text_Data === "" || Text_Horario === "" || Text_Origem === "" || Text_Destino === "" || Text_Placa === ""){
      Alert.alert("Dados em branco!", "Verifique os campos e tente novamente.");
    } else {
      if (moment(todayData+' '+Text_Horario+':00').isBefore(todayVerified) == true){
        Alert.alert('Horário inválido!','Tente novamente com um horário válido após às '+hour+'.');
      } else {
        fetch("http://ebus.projetoscomputacao.com.br/backend/updateTrip_api.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_viagem: Text_Id_Viagem,
          data: Text_Data,
          horario: Text_Horario,
          origem: Text_Origem,
          destino: Text_Destino,
          placa: Text_Placa,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == "Viagem atualizada!") {
            Alert.alert(responseJson);
            navigation.navigate('Viagem');
          } else if (responseJson == 'Ônibus não encontrado, tente novamente!'){ 
            Alert.alert('Ônibus não encontrado!', 'Tente novamente.');
          } else if (responseJson == 'Erro ao editar, verifique a data e tente novamente!'){
            Alert.alert('Erro ao editar Viagem!', 'Verifique a data e tente novamente.');
          } else {
            Alert.alert(responseJson);
          }
        })
        .catch((error) => {
          Alert.alert("Erro na conexão", "Verifique sua internet!");
        });
      }
    }
  }

  return (
    <ScrollView animated="false" style={{ marginHorizontal: 0 }}>
    <NewContainer>
      <Form>
        <FormMaskInput
          icon3="calendar"
          type={"datetime"}
          value={Text_Data}
          options={{
            format: "DD-MM-YYYY",
          }}
          placeholder="Data"
          placeholderTextColor="rgba(0,0,255,0.4)"
          onChangeText={(data) => setText_Data(data)}
        />
        <FormMaskInput
          icon="access-time"
          type={"datetime"}
          value={Text_Horario}
          options={{
            format: "HH:mm",
          }}
          placeholder="Horario"
          placeholderTextColor="rgba(0,0,255,0.4)"
          onChangeText={(data) => setText_Horario(data)}
        />
        <FormInput
          icon3="map-marker"
          autoCapitalize="none"
          value={Text_Origem}
          autoCorrect={true}
          placeholder="Origem"
          onChangeText={(data) => setText_Origem(data)}
        />
        <FormInput
          icon3="map-marker-radius"
          value={Text_Destino}
          autoCorrect={true}
          autoCapitalize="sentences"
          placeholder="Destino"
          onChangeText={(data) => setText_Destino(data)}
        />
        <FormMaskInput
          icon3="bus" 
          autoCapitalize="characters"
          type={"custom"}
          options={{mask: 'AAA-9999'}}
          value={Text_Placa}
          placeholder="Ônibus"
          placeholderTextColor="rgba(0,0,255,0.4)"
          onChangeText={(data) => setText_Placa(data)}
        />
      </Form>
      <SignLink>
        <SubmitButton onPress={updateTrip}>Confirmar</SubmitButton>
      </SignLink>
    </NewContainer>
    </ScrollView>
  );
}
