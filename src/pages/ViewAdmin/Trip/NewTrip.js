import React, { useState, useEffect } from "react";
import { ScrollView, Alert, StyleSheet} from "react-native";
import {Picker, Text} from 'native-base';
import pt from 'date-fns/locale/pt-BR';
import moment from 'moment';
import {
  NewContainer,
  Form,
  FormInput,
  FormMaskInput,
  SignLink,
  SubmitButton,
  Placas,
  PickerContainer,
  PickerIcon
} from "./styles";

import {format} from 'date-fns';

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

  const todayHour = moment(today).format("HH:mm:ss",{locale: pt});
  const Hour = moment(today).format("HH:mm",{locale: pt});
  const todayData = moment(today).format("yyyy-MM-DD",{locale: pt});
  const todayVerified = todayData + ' ' + todayHour;

  function thisList() {}

  useEffect(
    (thisList = () => {
      fetch("http://ebus.projetoscomputacao.com.br/backend/listBus_api.php", {
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
      if (moment(todayData+' '+Horario+':00').isBefore(todayVerified) == true){
        Alert.alert('Horário inválido!','Só é possível cadastrar viagens com horário a partir das '+Hour+'.');
      } else {
        fetch("http://ebus.projetoscomputacao.com.br/backend/insertTrip_api.php", {
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
            <PickerIcon name="bus" size={20} color="rgba(0,0,255,1)"/>
            <Placas>Ônibus: </Placas>
            <Picker
              placeholder="Ônibus"
              headerBackButtonText="Voltar"
              iosHeader={<Text style={{fontSize:18}}>Ônibus</Text>}
              placeholderStyle={{color:'rgba(0,0,255,0.6)'}}
              textStyle={{color:'rgba(0,0,255,0.6)'}}
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