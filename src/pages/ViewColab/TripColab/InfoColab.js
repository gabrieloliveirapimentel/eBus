import React, { useState, useCallback } from "react";
import { RefreshControl, ScrollView, Alert } from "react-native";
import { InfoContainer, Form, FormText, SignLink, SubmitButton } from "./styles";

import {format, parseISO} from 'date-fns';

export default function InfoColab({ navigation }) {
  const { Text_Data } = navigation.state.params;
  const { Text_Horario } = navigation.state.params;
  const { Text_Origem } = navigation.state.params;
  const { Text_Destino } = navigation.state.params;
  const { Text_Id_Viagem } = navigation.state.params;
  const { Text_Vagas} = navigation.state.params;
  const { Text_Placa } = navigation.state.params; 
  
  const date = parseISO(Text_Data);
  const dateCorrect = format(date, 'dd/MM/yyyy');
  const hour = (Text_Horario[0]+Text_Horario[1]+Text_Horario[2]+Text_Horario[3]+Text_Horario[4]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
  }, [refreshing]);

  return (
    <ScrollView animated="false" contentContainerStyle={{ flex: 1 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <InfoContainer>
      <Form>
          <FormText icon3="calendar" text="Data: " text2={dateCorrect}/>
          <FormText icon="access-time" text="Horário: " text2={hour}/>
          <FormText icon3="map-marker" text="De: " text2={Text_Origem}/>
          <FormText icon3="map-marker-radius" text="Para: " text2={Text_Destino} />
          <FormText icon3="bus" text="Ônibus: " text2={Text_Placa} />
          <FormText icon3="numeric" text="Lugares disponíveis: " text2={Text_Vagas} />
        </Form>
        <SignLink>
          <SubmitButton onPress={() => navigation.navigate("EditColab", {
                Text_Id_Viagem: Text_Id_Viagem,
                Text_Data: Text_Data,
                Text_Horario: Text_Horario,
                Text_Origem: Text_Origem,
                Text_Destino: Text_Destino,
                Text_Placa: Text_Placa,
              })
          }>Editar
          </SubmitButton>
        </SignLink>
      </InfoContainer>
    </ScrollView>
  );
}

//<FormText icon3="calendar" text={formattedDate}/>