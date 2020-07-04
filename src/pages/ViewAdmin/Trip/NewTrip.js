import React, { useState, useEffect } from "react";
import { ScrollView, Alert, StyleSheet} from "react-native";
import {Picker} from 'native-base';
//import { parseISO, format } from "date-fns";

import {
  NewContainer,
  Form,
  FormInput,
  SignLink,
  SubmitButton,
  FormMaskInput,
  Placas,
  PickerContainer,
  PickerIcon
} from "./styles";

import {format, parseISO} from 'date-fns';

export default function NewTrip({ navigation }) {
  const {idUsuario} = navigation.state.params;
  const [Horario, setHorario] = useState("");
  const [Origem, setOrigem] = useState("");
  const [Destino, setDestino] = useState("");
  const [dataSource, setdataSource] = useState([]);
  const [Placa, setPlaca] = useState("");

  const today = new Date();
  const todayCorrect = format(today, 'dd-MM-yyyy');
  const [Data,setData] = useState(todayCorrect);

  function thisList() {}

  useEffect(
    (thisList = () => {
      fetch("http://192.168.100.6/listBus_api.php", {
        //http://mybus.projetoscomputacao.com.br/listBus_api.php
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fk_id_usuario: idUsuario,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setdataSource(responseJson);
        })
        .catch((error) => {
          Alert.alert("Erro na conexão", "Verifique sua internet!");
        });
  }),[]);

  function NewTrip() {
    if (Data == "" || Horario == "" || Origem == "" || Destino == "") {
      Alert.alert("Campos em branco", "Verifique os dados e tente novamente!");
    } else {
      fetch("http://192.168.100.6/insertTrip_api.php", {
        //http://mybus.projetoscomputacao.com.br/insertTrip_api.php
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fk: idUsuario,
          data: Data,
          horario: Horario,
          origem: Origem,
          destino: Destino,
          placa: Placa
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == "Viagem cadastrada!") {
            Alert.alert(responseJson);
            navigation.goBack();
          } else if (responseJson == 'Erro ao cadastrar, verifique a data e tente novamente!'){
            Alert.alert('Erro ao cadastrar Viagem!', 'Verifique a data e tente novamente.');
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
              format: "DD-MM-YYYY",
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
          <PickerContainer>
            <PickerIcon name="bus" size={20} color="rgba(0,0,255,0.8)"/>
            <Placas>Ônibus: </Placas>
            <Picker
              style={styles.PickerInput}
              selectedValue={Placa}
              onValueChange={(itemvalue, itemIndex) => setPlaca(itemvalue)}
            >
            {dataSource.map((item, key) => (
              <Picker.Item label={item.placa} value={item.placa} key={key} />
            ))}
            </Picker>
          </PickerContainer>
        </Form>
        <SignLink>
          <SubmitButton onPress={NewTrip}>Cadastrar</SubmitButton>
        </SignLink>
      </NewContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  PickerInput: {
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 50,
    color: "rgba(0,0,255,0.8)",
  },
});