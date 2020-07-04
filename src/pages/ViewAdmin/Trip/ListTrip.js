/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from "react";
import { ActivityIndicator, Alert, FlatList, View} from "react-native";
import {Fab, Text} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format, parseISO } from 'date-fns';
import moment from 'moment';

import { Container, Header, Tab, ItemView, Item} from "./styles";

export default function ListTrip({ navigation }) {
  
  const {email} = navigation.state.params;
  const [idUsuario, setIDUsuario] = useState(0);
  const [dataSource, setdataSource] = useState([]);
  const [loading, setloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState('');
  const [color, setColor] = useState('#000');

/*
  function tete(){
    

    if (state == true){
      Alert.alert('Tá errado.');
    } else {
      Alert.alert('Dia 2 vem antes mesmo!');
    }
  }*/

  function thisList() {};

  useEffect(thisList = () => {
    setloading(false);
    fetch("http://192.168.100.6/verificaID_api.php", {
      //http://mybus.projetoscomputacao.com.br/verificaID_api.php
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    thisList();
  }, [refreshing]);

  useEffect(thisList = () => {
    setloading(false);
    fetch("http://192.168.100.6/listTrip_api.php",{
      //http://mybus.projetoscomputacao.com.br/listTrip_api.php
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == 'Nenhuma viagem encontrada.'){
          setErro('Erro.');
          Alert.alert('Nenhuma viagem cadastrada!','Faça o cadastrado de viagens.');
        } else if (responseJson == 'Nenhum dado encontrado.'){
          setErro('Erro.');
          Alert.alert(responseJson);
        } else {
          setErro('Sem erro.');
          setdataSource(responseJson);
          setloading(false);
        }
      })
      .catch((error) => {
        Alert.alert("Erro na conexão!", "Verifique sua internet");
        setloading(false);
      });
  },[]);

  function listSeparator(){
    return (
      <View 
        style={{
          backgroundColor:'rgba(0,0,0,0.1)',
          height:1,
          width: 250,
          alignSelf:'center'
        }}
      />
    );
  }

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: '',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: '',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: '',
    },
  ];

  function List() {

    const {num} = '1';

    if (erro == 'Sem erro.') {
      return (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={dataSource}
          ItemSeparatorComponent={listSeparator}
          renderItem={({ item }) => (
            <ItemView onPress={
              navigation.navigate("InfoTrip",{
                Text_Data: item.data,
                Text_Horario: item.horario,
                Text_Origem: item.origem,
                Text_Destino: item.destino,
                Text_Id_Viagem: item.id_viagem,
                Text_Vagas: item.vagas,
                Text_Placa: item.fk_Onibus_placa,
                idUsuario: idUsuario,
                })
              }>
              <Item>
                <Text style={{marginTop: 10, fontSize: 17, color:(color)}}>De: {item.origem} - Para: {item.destino}</Text>
              </Item>
              <Item>
                <Text style={{marginBottom: 10, fontSize: 15, color: (color)}}>
                  Horário: {item.horario[0]}{item.horario[1]}{item.horario[2]}{item.horario[3]}{item.horario[4]} - 
                  Data: {item.data[8]}{item.data[9]}/{item.data[5]}{item.data[6]}/{item.data[0]}{item.data[1]}{item.data[2]}{item.data[3]}
                </Text>
              </Item>
              </ItemView>
          )}
          keyExtractor={(item) => item.id_viagem}
        />
      );
    } else {
      return (
        <FlatList
          style={{marginLeft:20}}
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Text>{item.title}</Text>)}
        />  
      );
    }
  }



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
        <List />
        <Fab
          onPress={() => navigation.navigate("NewTrip", { idUsuario: idUsuario })}
          style={{ backgroundColor: "#283593", marginBottom: 50 }}
          position="bottomRight"
        ><Icon name="add" color="#fff" />
        </Fab>
        <Tab
          onPress1={() => {}}
          color1="#fff"
          onPress2={() => navigation.navigate("Onibus", { idUsuario: idUsuario })}
          color2="rgba(255,255,255,0.5)"
        />
        </Container>
      );
  }
}
