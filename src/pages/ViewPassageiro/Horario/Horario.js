/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useCallback} from 'react';
import {Picker, Text, Left, Right} from 'native-base';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';
import {
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';

import {
  Container,
  Erro,
  Header,
  TextHorario,
  PickerContainer,
  PickerIcon,
  Origem,
  Destino,
  IconView,
  Tab
} from './styles';

import {addDays, format} from 'date-fns';

export default function Horario ({navigation}){
  const {idUsuario} = navigation.state.params;
  const [OrigemValue, setOrigemValue] = useState('');
  const [DestinoValue, setDestinoValue] = useState('');
  const [dataSource, setdataSource] = useState([]);
  const [erro, setErro] = useState('');
  const [listItem, setlistItem] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [day, setDay] = useState(0);

  function decrease () {
    setDay(day - 1);
  }

  function increase (){
    setDay(day + 1);
  }

  const today = new Date();
  const data = format(today, 'dd/MM/yyyy');
  const today2 = addDays(today, day);
  const todayCorrect = format(today2, 'dd/MM/yyyy');
  const todayData = format(today2, 'dd-MM-yyyy');

  useEffect(() => {
    fetch('http://ebus.projetoscomputacao.com.br/backend/scheduleTrip_api.php')
      .then((response) => response.json())
      .then((responseJson) => {
        setdataSource(responseJson);
      })
      .catch((error) => {
        Alert.alert('Erro na conexão!', 'Tente novamente!');
      });
  },[]);

  useEffect(() => {
    fetch('http://ebus.projetoscomputacao.com.br/backend/scheduleCheck_api.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origem: OrigemValue,
        destino: DestinoValue,
        data: todayData
      }),
    })
    .then(setlistItem(''), setErro('Carregando...'))
    .then((response) => response.json())
    .then((responseJson) => {
      setlistItem(responseJson.horario);
      setErro('');
      if (responseJson === 'Viagem não encontrada!'){
        setErro('Nenhum horário disponível!');
        setlistItem('');
      } else {
        setlistItem(responseJson);
        setErro('');
      }
    })
    .catch((error) => {
      //console.log(error);
      Alert.alert('Erro na conexão!', 'Tente novamente!');
    });
  }, [OrigemValue, DestinoValue, todayData]);

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
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
    if (erro == 'Nenhum horário disponível!'){
      return (
        <FlatList
          style={{marginLeft:20}}
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Text>{item.title}</Text>)}
        />  
      );
    } else {
      return (
        <FlatList
          style={{marginLeft:20}}
          data={listItem}
          keyExtractor={item => item.id_viagem}
          renderItem={({item}) => (
          <Text style={{fontSize: 20, marginBottom: 10, alignSelf:'center', color:'rgba(0,0,255,0.8)', fontWeight: 'bold'}}>{item.horario[0]+item.horario[1]+item.horario[2]+item.horario[3]+item.horario[4]}</Text>)}
        />
      );
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1200).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <Container>
    <Header title="Horários" icon="person" iconPress={() => navigation.navigate('Profile',{idUsuario: idUsuario})}/>
      <PickerContainer>
        <PickerIcon name="map-marker" size={20} color="rgba(0,0,255,0.8)"/>
        <Origem>De:</Origem>
        <Picker
          placeholder="Origem"
          textStyle={{color:'rgba(0,0,255,0.8)'}}
          headerBackButtonText="Voltar"
          iosHeader={<Text style={{fontSize:18}}>Origem</Text>}
          placeholderStyle={{color:'rgba(0,0,255,0.8)'}}
          style={styles.PickerInput}
          selectedValue={OrigemValue}
          onValueChange={(itemvalue, itemIndex) => setOrigemValue(itemvalue)}
          >
          {dataSource.map((item, key) => (
            <Picker.Item label={item.origem} value={item.origem} key={key}/>))}
        </Picker>
      </PickerContainer>
      
      <PickerContainer>
      <PickerIcon name="map-marker-radius" size={20} color="rgba(0,0,255,0.8)"/>
      <Destino>Para:</Destino>
      <Picker
        placeholder="Destino"
        headerBackButtonText="Voltar"
        iosHeader={<Text style={{fontSize:18}}>Destino</Text>}
        textStyle={{color:'rgba(0,0,255,0.8)'}}
        placeholderStyle={{color:'rgba(0,0,255,0.8)'}}
        style={styles.PickerInput}
        selectedValue={DestinoValue}
        onValueChange={(itemvalue, itemIndex) => setDestinoValue(itemvalue)}
      >{dataSource.map((item, key) => (
        <Picker.Item label={item.destino} value={item.destino} key={key}/>))}
        </Picker>
      </PickerContainer>
      <IconView>
        <Left>
          <Icon style={{marginLeft: 10}} color="rgba(0,0,255,1)" name="arrow-left-circle-outline" size={24} onPress={decrease} />
        </Left>
        <Text style={{color:'rgba(0,0,255,1)'}}>{todayCorrect}</Text>
        <Right>
          <Icon style={{marginRight: 10}} color="rgba(0,0,255,1)" name="arrow-right-circle-outline" size={24} onPress={increase} />
        </Right>
      </IconView>
      <Erro>{erro}</Erro>
      <TextHorario>Horários: </TextHorario>
      <List />
      <Tab 
          onPress1={() => navigation.navigate('Reserva',{idUsuario: idUsuario})}
          color1="rgba(255,255,255,0.5)"
          onPress2={() => navigation.navigate('ListReserva',{idUsuario: idUsuario})}
          color2="rgba(255,255,255,0.5)"
          onPress3={() => {}}
          color3="#fff"
          
        />
    </Container>
  );
}

const styles = StyleSheet.create({
  PickerInput: {
    alignItems:'center',
    justifyContent: 'center',
    width: 240,
    height: 50,
    color: 'rgba(0,0,255,1)',
  }
});



