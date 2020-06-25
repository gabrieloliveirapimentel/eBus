import React, { useEffect, useState, useCallback } from "react";
import { RefreshControl, ScrollView, Alert } from "react-native";
import { ButtonView, InfoContainer, Form, FormText, SubButton } from "./styles";

//import { parseISO, format } from "date-fns";

export default function InfoColab({ navigation }) {
  const { Text_Data } = navigation.state.params;
  const { Text_Horario } = navigation.state.params;
  const { Text_Origem } = navigation.state.params;
  const { Text_Destino } = navigation.state.params;
  const { Text_Id_Viagem } = navigation.state.params;

  const [refreshing, setRefreshing] = useState(false);

  //const parsedDate = parseISO(Text_Data);
  //const formattedDate = format(parsedDate, "dd/MM/yyyy");

  function DropTrip() {
    fetch("http://mybus.projetoscomputacao.com.br/deleteTrip_api.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_viagem: Text_Id_Viagem,
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == "Viagem deletada!") {
          Alert.alert(responseJson);
          navigation.goBack();
        } else {
          Alert.alert(responseJson);
        }
      }).catch((error) => {
          Alert.alert("Erro na conexão", "Verifique sua internet!");
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
  }, [refreshing]);

  return (
    <ScrollView animated="false" contentContainerStyle={{ flex: 1 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <InfoContainer>
        <Form>
          <FormText icon3="calendar" text={Text_Data}/>
          <FormText icon="access-time" text={Text_Horario}/>
          <FormText icon3="map-marker" text={Text_Origem}/>
          <FormText icon3="map-marker-radius" text={Text_Destino} />
        </Form>
        <ButtonView>
          <SubButton onPress={() => navigation.navigate("EditColab", {
                Text_Id_Viagem: Text_Id_Viagem,
                Text_Data: Text_Data,
                Text_Horario: Text_Horario,
                Text_Origem: Text_Origem,
                Text_Destino: Text_Destino,
              })
          }>Editar
          </SubButton>
          <SubButton onPress={DropTrip}>Deletar</SubButton>
        </ButtonView>
      </InfoContainer>
    </ScrollView>
  );
}

//<FormText icon3="calendar" text={formattedDate}/>