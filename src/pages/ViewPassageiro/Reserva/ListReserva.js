import React, {useState, useEffect, useCallback} from 'react';
import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, ScrollView, RefreshControl} from 'react-native';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { Container, ListContainer, ItemView } from './styles';

export default function ListReserva ({navigation}) {
  const {idUsuario} = navigation.state.params; 
  const [dataSource, setdataSource] = useState([]);
  const [loading, setloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [erro, setErro] = useState('');
  const today = new Date();
  const data = format(today, "'dia' dd 'de' MMMM'",{locale: pt});

  function thisList(){}

  useEffect( 
    thisList = () => {
      
      fetch('http://ebus.projetoscomputacao.com.br/backend/listReserva_api.php', {
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
          
          if (responseJson == 'Nenhuma reserva encontrada.'){
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
  },[idUsuario]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    thisList();   
  }, [refreshing]);

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
          ItemSeparatorComponent={listSeparator}
          renderItem={({item}) => (
            <ItemView onPress={() => navigation.navigate('ConfirmReserva', {idUsuario: idUsuario, horario: item.horario[0]+item.horario[1]+item.horario[2]+item.horario[3]+item.horario[4]})}>
              <Text style={styles.text}>
                {item.horario[0]+item.horario[1]+item.horario[2]+item.horario[3]+item.horario[4]}
              </Text>
            </ItemView>
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
      <Container>
      <ScrollView animated='false' refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Text style={styles.header}>Reservas para {data}</Text>
        <List />
      </ScrollView>
      </Container>
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