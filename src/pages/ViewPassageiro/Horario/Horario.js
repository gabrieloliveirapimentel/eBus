/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useCallback} from 'react';
import {Picker} from 'native-base';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Alert,
  ScrollView,
  RefreshControl
} from 'react-native';

import {
  Container,
  Erro,
  TextHorario,
  PickerContainer,
  PickerIcon,
  Origem,
  Destino
} from './styles';

export default function Horario ({navigation}){
  const [OrigemValue, setOrigemValue] = useState('');
  const [DestinoValue, setDestinoValue] = useState('');
  const [dataSource, setdataSource] = useState([]);
  const [erro, setErro] = useState('');

  const [listItem, setlistItem] = useState();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetch('http://mybus.projetoscomputacao.com.br/listTripHorario_api.php')
      .then((response) => response.json())
      .then((responseJson) => {
        setdataSource(responseJson);
      })
      .catch((error) => {
        Alert.alert('Erro na conexão!', 'Tente novamente!');
      });
  },[]);

  useEffect(() => {
    fetch('http://mybus.projetoscomputacao.com.br/checkHorario_api.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origem: OrigemValue,
        destino: DestinoValue,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      setlistItem(responseJson);
      setErro('');
      if (responseJson === 'Viagem não encontrada!'){
        setErro('Viagem não encontrada!');
        setlistItem('');
      }
    })
    .catch((error) => {
      Alert.alert('Erro na conexão!', 'Tente novamente!');
    });
  }, [DestinoValue, OrigemValue]);

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1200).then(() => setRefreshing(false));
  }, [refreshing]);

  function Item({horario, data}) {
    return (
      <View>
        <Text style={{fontSize: 16}}>{horario} ({data})</Text>
      </View>
    );
  }

  return (
    <ScrollView animated='false'contentContainerStyle={{flex:1}} refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
    <Container>
      <PickerContainer>
        <PickerIcon name="map-marker" size={20} color="rgba(0,0,255,0.6)"/>
        <Origem>Origem:</Origem>
        <Picker
        style={styles.PickerInput}
          selectedValue={OrigemValue}
          onValueChange={(itemvalue, itemIndex) => setOrigemValue(itemvalue)}
          >
          {dataSource.map((item, key) => (
            <Picker.Item label={item.origem} value={item.origem} key={key}/>))}
        </Picker>
      </PickerContainer>
      
      <PickerContainer>
      <PickerIcon name="map-marker-radius" size={20} color="rgba(0,0,255,0.6)"/>
      <Destino>Destino:</Destino>
      <Picker
        style={styles.PickerInput}
          selectedValue={DestinoValue}
          onValueChange={(itemvalue, itemIndex) => setDestinoValue(itemvalue)}
          >
          {dataSource.map((item, key) => (
          <Picker.Item label={item.destino} value={item.destino} key={key}/>))}
        </Picker>
      </PickerContainer>
      <TextHorario>Horários: </TextHorario>
      <Erro>{erro}</Erro>
      <FlatList
        style={{marginLeft:20}}
        data={listItem}
        keyExtractor={item => item.id_viagem}
        renderItem={({item}) => (
        <Item horario={item.horario} data={item.data} />)}
      />
    </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  PickerInput: {
    alignItems:'center',
    justifyContent: 'center',
    width: 240,
    height: 50,
    color: 'rgba(0,0,255,0.6)',
  }
});
