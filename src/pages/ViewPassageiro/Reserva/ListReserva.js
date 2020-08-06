import React, {useState, useEffect, useCallback} from 'react';
import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, ScrollView, RefreshControl, AsyncStorage, StatusBar} from 'react-native';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import moment from 'moment';
import {ListContainer, ItemView, Header } from './styles';

export default function ListReserva ({navigation}) {
  const [idUsuario, setIdUsuario] = useState(0);
  const [dataSource, setdataSource] = useState([]);
  const [loading, setloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [erro, setErro] = useState('');
  const today = new Date();
  const data = format(today, "'dia' dd 'de' MMMM'",{locale: pt});

  const todayHour = moment(today).format("HH:mm:ss",{locale: pt});
  const todayData = moment(today).format("yyyy-MM-DD",{locale: pt});
  const todayCorrect = todayData + ' ' + todayHour;

  function thisList(){}

  async function getItem () {
    let token = await AsyncStorage.getItem('@eBus:id');
    setIdUsuario(token);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    thisList();   
  }, [refreshing]);
  
  useEffect(() => {
    getItem();
  },[]);

  useEffect( 
    thisList = () => {
      setloading(false);
      fetch('http://ebus.projetoscomputacao.com.br/backend/listReserva_api.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_usuario: idUsuario,
        }),
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == 'Nenhuma reserva encontrada.'){
            setErro('Erro.');
            setloading(false);
          } else if (responseJson == 'Erro na busca de reservas.') {
              setErro('Erro.');
              setloading(false);
          } else {
            setErro('Sem erro.');
            setdataSource(responseJson);
            setloading(false);
          }
        }
      ).catch((error) => {
        Alert.alert('Erro na conexão', 'Verifique sua internet!');
        setloading(false);
      })
  },[erro]);

  function removeReserva(idViagem) {
    fetch('http://ebus.projetoscomputacao.com.br/backend/cancelReserva_api.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_usuario: idUsuario,
        id_viagem: idViagem
      }),
    });
  }

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Nenhuma reserva cadastrada!',
    },
  ];

  function List() { 
    if (erro == 'Sem erro.'){
      return (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={dataSource}
          renderItem={
            ({item}) => ( 
            <View>{moment(todayData+' '+item.horario).isBefore(todayCorrect) ? (removeReserva(item.id_viagem)) : (
              <ItemView onPress={() => navigation.navigate('ConfirmReserva', {idUsuario: idUsuario, horario: item.horario[0]+item.horario[1]+item.horario[2]+item.horario[3]+item.horario[4]})}>
                <Text style={styles.text}>
                  Horário: {item.horario[0]}{item.horario[1]}{item.horario[2]}{item.horario[3]}{item.horario[4]}
                </Text>
              </ItemView>
            )}</View>

              
          )}
          keyExtractor={(item) => item.id_reserva}
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

  if (loading){
    return (
      <ListContainer>
        <ActivityIndicator size="large" color="#283593" />
      </ListContainer>
    );
  } else {
    return (
      <View style="flex: 1">
      <Header title="Reservas" icon="person" iconPress={() => navigation.navigate('Profile',{idUsuario: idUsuario})}/>
      <StatusBar backgroundColor="#283593" barStyle="light-content"/>
      <ScrollView animated='false' refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>  
        <Text style={styles.header}>{idUsuario}</Text>
        <Text style={styles.header}>Reservas para {data}</Text>
        <List />
      </ScrollView>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  text:{
    fontSize: 18, 
    color: "rgba(0,0,255,0.8)",
    padding: 10, 
    marginLeft: 20
  },
  header: {
    fontSize: 18, 
    color: "rgba(0,0,255,1)",
    padding: 10, 
    alignSelf:'center',
    fontWeight:'bold'
  }
});

