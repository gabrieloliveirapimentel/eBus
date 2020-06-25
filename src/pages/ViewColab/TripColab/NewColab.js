import React, { useState, useEffect } from "react";
import { ScrollView, Alert} from "react-native";
//import { parseISO, format } from "date-fns";

import {
  NewContainer,
  Form,
  FormInput,
  SignLink,
  SubmitButton,
  FormMaskInput,
} from "./styles";

export default function NewColab({ navigation }) {
  const {idUsuario} = navigation.state.params;
  const [Data, setData] = useState("");
  const [Horario, setHorario] = useState("");
  const [Origem, setOrigem] = useState("");
  const [Destino, setDestino] = useState("");

  const [checkBox, setCheckBox] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);

  const [dataSource, setdataSource] = useState([]);

  function NewTrip() {
    if (Data == "" || Horario == "" || Origem == "" || Destino == "") {
      Alert.alert("Campos em branco", "Verifique os dados e tente novamente!");
    } else {
      fetch("http://mybus.projetoscomputacao.com.br/inserirTrip_api.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fk_id_usuario: idUsuario,
          data: Data,
          horario: Horario,
          origem: Origem,
          destino: Destino,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == "Viagem cadastrada!") {
            Alert.alert(responseJson);
            navigation.goBack();
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

  return (
    <ScrollView animated="false" style={{ marginHorizontal: 0 }}>
      <NewContainer>
        <Form>
          <FormMaskInput
            icon3="calendar"
            type={"datetime"}
            value={Data}
            options={{
              format: "YYYY/MM/DD",
            }}
            placeholder="Data"
            placeholderTextColor="rgba(0,0,255,0.4)"
            onChangeText={(data) => setData(data)}
          />
          <FormMaskInput
            icon="access-time"
            type={"datetime"}
            value={Horario}
            options={{
              format: "HH:mm",
            }}
            placeholder="Horario"
            placeholderTextColor="rgba(0,0,255,0.4)"
            onChangeText={(data) => setHorario(data)}
          />
          <FormInput
            icon3="map-marker"
            autoCapitalize="none"
            autoCorrect={true}
            placeholder="Origem"
            onChangeText={(data) => setOrigem(data)}
          />
          <FormInput
            icon3="map-marker-radius"
            autoCorrect={true}
            autoCapitalize="sentences"
            placeholder="Destino"
            onChangeText={(data) => setDestino(data)}
          />
        </Form>
        <SignLink>
          <SubmitButton onPress={NewTrip}>Cadastrar</SubmitButton>
        </SignLink>
      </NewContainer>
    </ScrollView>
  );
}
