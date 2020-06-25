import React, { useState, useEffect } from "react";
import { ScrollView, Alert } from "react-native";
//import { parseISO, format } from "date-fns";

import {
  NewContainer,
  Form,
  FormInput,
  SignLink,
  SubmitButton,
  FormMaskInput,
} from "./styles";

export default function EditColab({ navigation }) {
  const { Text_Id_Viagem } = navigation.state.params;
  const [Text_Data, setText_Data] = useState(navigation.state.params.Text_Data);
  const [Text_Horario, setText_Horario] = useState(navigation.state.params.Text_Horario);
  const [Text_Origem, setText_Origem] = useState(navigation.state.params.Text_Origem);
  const [Text_Destino, setText_Destino] = useState(navigation.state.params.Text_Destino);
  

  function updateTrip() {
    if (Text_Data === "" || Text_Horario === "" || Text_Origem === "" || Text_Destino === ""){
      Alert.alert("Dados em branco!", "Verifique os campos e tente novamente.");
    } else {
      fetch("http://mybus.projetoscomputacao.com.br/updateTrip_api.php", {
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
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == "Viagem atualizada!") {
            Alert.alert(responseJson);
            navigation.navigate('ViagemColab');
          } else {
            Alert.alert(responseJson);
          }
        })
        .catch((error) => {
          Alert.alert("Erro na conexão", "Verifique sua internet!");
        });
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
            format: "YYYY/MM/DD",
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
      </Form>
      <SignLink>
        <SubmitButton onPress={updateTrip}>Confirmar</SubmitButton>
      </SignLink>
    </NewContainer>
    </ScrollView>
  );
}
