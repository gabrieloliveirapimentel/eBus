/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useCallback} from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  StyleSheet,
  View
} from "react-native";
import { Fab } from "native-base";
import { Icon } from "react-native-elements";

import {Container, Header, Tab} from './styles';

export default function ListBus ({ navigation }) {
  const {idUsuario} = navigation.state.params;
  const [dataSource, setdataSource] = useState([]);
  const [loading, setloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState('');

  function thisList(){}

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    thisList();   
  }, [refreshing]);

  useEffect( 
    thisList = () => {
      setloading(false);
      fetch('http://ebus.projetoscomputacao.com.br/backend/listBus_api.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fk_id_usuario: idUsuario,
        }),
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == 'Nenhum ônibus cadastrado.'){
            setErro('Erro.');
            setloading(false);
          } else {
            setErro('Sem erro.');
            setdataSource(responseJson);
          }
        }
      ).catch((error) => {
        Alert.alert('Erro na conexão', 'Verifique sua internet!');
        setloading(false);
      })
  },[]);

  function listSeparator(){
    return (
      <View 
        style={{
          backgroundColor:'rgba(0,0,0,0.1)',
          height:1,
          width: 330,
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
      title: 'Nenhum ônibus cadastrado!',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: '',
    },
  ];

  function List() {
    if (erro == 'Sem erro.'){
      return (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={dataSource}
          ItemSeparatorComponent={listSeparator}
          renderItem={({item}) => (
            <Text onPress={() => navigation.navigate('InfoBus', {
              placa: item.placa,
              linha: item.linha, 
              lugares: item.lugares, 
              motorista: item.nome, 
              disponivel: item.disponibilidade,
              situacao: item.situacao
              })} 
              style={styles.text}>
            {item.placa}
            </Text>
          )}
          keyExtractor={(item) => item.placa}
        />
      );
    } else {
      return (
        <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        style={{marginLeft:20}}
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Text style={{fontSize: 16, color:'rgba(255,0,0,255)', fontWeight:'bold', alignSelf: 'center'}}>{item.title}</Text>)}
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
          title="Ônibus"
          icon="person"
          iconPress={() => navigation.navigate("Profile", { idUsuario: idUsuario })}
        />
        <List />
        <Fab
          onPress={() => navigation.navigate('NewBus',{idUsuario: idUsuario})}
          style={styles.fab}
          position="bottomRight">
          <Icon name="add" color="#fff" />
        </Fab>
        <Tab 
          onPress1={() => navigation.navigate('Viagem')} 
          color1='rgba(255,255,255,0.5)'
          onPress2={() => {}} 
          color2='#fff' 
        />
    </Container>
  );
  }
}

const styles = StyleSheet.create({
  text:{
    fontSize: 18, 
    color: "#000",
    padding: 10, 
    marginLeft: 15
  },
  fab: {
    backgroundColor: "#283593", 
    marginBottom: 50 
  }
});

