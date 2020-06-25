import React, { useState, useEffect, useCallback } from "react";
import { ActivityIndicator, Alert, FlatList, View} from "react-native";
import {Fab, Text} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Header, Tab} from "./styles";

export default function ListColab({ navigation }) {
  
  const {email} = navigation.state.params;
  const [idUsuario, setIDUsuario] = useState(0);
  const [dataSource, setdataSource] = useState([]);
  const [loading, setloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  function thisList() {};

  useEffect(thisList = () => {
    setloading(false);
    fetch("http://mybus.projetoscomputacao.com.br/verificaID_api.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((resultado) => {
        setIDUsuario(resultado.id_usuario);
      })
      .catch((error) => {
        Alert.alert("Erro na conexão!", "Verifique sua internet");
        setloading(false); 
      });  
  }, []);

  
  useEffect(thisList = () => {
    setloading(false);
    fetch("http://mybus.projetoscomputacao.com.br/listTrip_api.php",{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        setdataSource(responseJson);
        setloading(false);
      })
      .catch((error) => {
        Alert.alert("Erro na conexão!", "Verifique sua internet");
        setloading(false);
      });
  },[]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    thisList();
  }, [refreshing]);

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#283593" />
      </Container>
    );
  } else {
    return (
      <Container>
      <Header
        title="Viagem"
        icon="person"
        iconPress={() => navigation.navigate("Profile", { idUsuario: idUsuario })}
      />
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={dataSource}
        renderItem={({ item }) => (
          <Text
            onPress={() => navigation.navigate("InfoColab",{
              Text_Data: item.data,
              Text_Horario: item.horario,
              Text_Origem: item.origem,
              Text_Destino: item.destino,
              Text_Id_Viagem: item.id_viagem,
            })}
            style={{ fontSize: 18, color: "#000", padding: 10 }}
          >{item.origem} - {item.destino} ({item.horario})
          </Text>
        )}
        keyExtractor={(item) => item.id_viagem}
      />
      <Fab
        onPress={() => navigation.navigate("NewColab", { idUsuario: idUsuario })}
        style={{ backgroundColor: "#283593", marginBottom: 50 }}
        position="bottomRight"
      ><Icon name="add" color="#fff" />
      </Fab>
      <Tab
        onPress1={() => {}}
        color1="#fff"
        onPress2={() => navigation.navigate('Instituicao')}
        color2="rgba(255,255,255,0.5)"
      />
      </Container>
    );
  }
}


/*
*/