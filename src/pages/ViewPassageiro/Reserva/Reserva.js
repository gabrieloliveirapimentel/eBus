/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { View, StatusBar, Alert, StyleSheet, FlatList, Text, ScrollView, SafeAreaView} from 'react-native';
import { Picker } from 'native-base';
import {format} from 'date-fns';
import {
  Container,
  Form,
  FormInput,
  FormText,
  FormStatus,
  FormHour,
  Header,
  Status,
  SubmitButton,
  SubmitView,
  PickerContainer,
  PickerIcon,
  Origem,
  Destino
} from './styles';

export default function Reserva ({navigation}) {
  const {email} = navigation.state.params;
  const [idUsuario, setIdUsuario] = useState(0);
  const [listItem, setlistItem] = useState();
  const [OrigemValue, setOrigemValue] = useState('');
  const [DestinoValue, setDestinoValue] = useState('');
  const [dataSource, setdataSource] = useState([]);
  const [erro, setErro] = useState('');
  const today = new Date();
  const data = format(today, 'dd/MM/yyyy');
  const todayData = format(today, 'dd-MM-yyyy');

  useEffect(() => {
    let mounted = true;
    fetch('http://ebus.projetoscomputacao.com.br/backend/myID_api.php', {
      method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        })
      }).then((response) => response.json())
        .then((resultado) => {
        if (mounted){
          setIdUsuario(resultado.id_usuario);}
      }).catch((error) => {
          Alert.alert('Erro na conexão!', 'Verifique sua internet');  
    });
    return () => mounted = false;
  },[]);

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
    .then((response) => response.json())
    .then((responseJson) => {
      setlistItem(responseJson.horario);
      setErro('');
      if (responseJson === 'Viagem não encontrada!'){
        setErro('Nenhum horário disponível!');
        setlistItem('');
      } 
      else {
        setlistItem(responseJson);
        setErro('');
      }
    })
    .catch((error) => {
      Alert.alert('Erro na conexão!', 'Tente novamente!');
    });
  
  }, [OrigemValue, DestinoValue]);

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
        <SafeAreaView style={{flex: 1}}>
          <FlatList
            style={{marginLeft:20}}
            data={DATA}
            ListHeaderComponent={Form}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Text>{item.title}</Text>)}
          />
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={{flex: 1}}>
          <FlatList
            data={listItem}
            keyExtractor={item => item.id_viagem}
            ListHeaderComponent={Form}
            renderItem={({item}) => (
              <View style={styles.ListView}>
                <Text 
                  style={styles.ItemView}
                  onPress={() => navigation.navigate('ConfirmReserva',{
                    id_viagem: item.id_viagem,
                    id_usuario: idUsuario,
                    horario: item.horario
                  })}
                >{item.horario[0]+item.horario[1]+item.horario[2]+item.horario[3]+item.horario[4]}</Text>
              </View>
            )}
          />
        </SafeAreaView>
      );
    }
  }
  
  return(
    <View style={{flex:1}}>
    <Header title="Reserva" icon="person" iconPress={() => navigation.navigate('Profile',{idUsuario: idUsuario})}/>
    <StatusBar backgroundColor="#283593" barStyle="light-content"/>
    <ScrollView>
    <Container>
      <Form>
        <FormText icon3="laptop" text="Data: " text2={data}/>
        <PickerContainer>
          <PickerIcon name="map-marker" size={20} color="rgba(0,0,255,0.6)"/>
          <Origem>De:</Origem>
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
          <Destino>Para:</Destino>
          <Picker
            style={styles.PickerInput}
            selectedValue={DestinoValue}
            onValueChange={(itemvalue, itemIndex) => setDestinoValue(itemvalue)}
          >{dataSource.map((item, key) => (
            <Picker.Item label={item.destino} value={item.destino} key={key}/>))}
          </Picker>
        </PickerContainer>
        <View style={{justifyContent:'center', alignSelf:'center'}}>
          <Text style={{fontSize:20, fontWeight:'bold', color: 'rgba(0,0,255,0.6)'}}>Horários</Text>
        </View>  
      </Form>
      <List />  
    </Container>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  PickerInput: {
    alignItems:'center',
    justifyContent: 'center',
    width: 220,
    height: 50,
    color: 'rgba(0,0,255,0.6)',
  },
  ListView: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignSelf:'center',
    width: 150,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 10,
  },
  ItemView: {
    fontSize: 18,
    color: 'rgba(0,0,255,0.6)',
  }
});
