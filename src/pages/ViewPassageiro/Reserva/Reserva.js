import React, {useState, useEffect, useCallback} from 'react';
import { View, StatusBar, Alert, StyleSheet, ScrollView, ActivityIndicator, AsyncStorage, FlatList} from 'react-native';
import { Text} from 'native-base';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import {
  Header,
  Item,
  ItemView,
  SignLink,
  SignLinkText
} from './styles';

export default function Reserva ({navigation}) {
  const [email, setEmail] = useState('');
  const [idUsuario, setIdUsuario] = useState(0);
  const [idEnd, setIdEnd] = useState(0);
  const [dataSource, setdataSource] = useState([]);
  const [loading, setloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState('');

  const today = new Date();
  const data = format(today, "dd 'de' MMMM' de 'yyyy'",{locale: pt});
  const todayData = format(today, 'dd-MM-yyyy');

  async function getItem () {
    let token = await AsyncStorage.getItem('@eBus:email');
    setEmail(token);
  }

  function goToListReserva(){
    navigation.navigate('ListReserva',{
      idUsuario: idUsuario
    });
  }

  const thisList = () => {
    setloading(false);
    if (idEnd != 0 && idEnd != ''){
      fetch('http://ebus.projetoscomputacao.com.br/backend/listTripReserva_api.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fk_idEnd: idEnd,
      })
      }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == 'Nenhuma viagem encontrada.'){
          setErro('Erro.');
          setloading(false);
        } else {
          setErro('Sem erro.');
          setdataSource(responseJson);
          setloading(false);
        }
      }
    ).catch((error) => {
      Alert.alert('Erro na conexão!', 'Verifique sua internet!');
      setloading(false);
    })
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    thisList();
  }, [refreshing]);

  useEffect(() => {
    getItem();
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
          setIdUsuario(resultado.id_usuario);
          setIdEnd(resultado.fk_Endereco_id_endereco);
      }).catch((error) => {
          Alert.alert('Erro na conexão!', 'Verifique sua internet');  
    });
    setloading(false);
  },[email]);

  function alertReserva(horario, origem, destino){
    return (
      Alert.alert(
        "Fazer reserva para às "+horario[0]+horario[1]+horario[2]+horario[3]+horario[4]+"?",
        "Caso deseja realizar a reserva para este horário, clique em 'SIM'.",
        [
          { text: "Sim!", onPress: () => makeReserva(horario, origem, destino)},
          {
            text: "Cancelar",
            style: "cancel"
          }
        ],
        { cancelable: false }
      )
    );
  }

  function makeReserva(horario, origem, destino){
    if (horario == 'Selecione um horário'){
      Alert.alert('Horário inválido!','Selecione um horário para fazer a reserva.');
    } else {
      fetch("http://ebus.projetoscomputacao.com.br/backend/makeReserva_api.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fk_usuario: idUsuario,
          horario: horario,
          origem: origem,
          destino: destino,
          data: todayData
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == 'Reserva já feita!'){
            Alert.alert('Erro ao fazer reserva!','Reserva já feita para essa viagem!');
          } else if (responseJson == "Ônibus lotado, tente em outro horário!") {
            Alert.alert('Viagem lotada!', 'Tente novamente em outro horário!');
          } else if (responseJson == 'Viagem indisponível, tente em outro horário!'){
            Alert.alert('Viagem indisponível!', 'Tente novamente em outro horário!');
          } else if (responseJson == 'Reserva feita com sucesso!') {
            Alert.alert('Reserva feita com sucesso!', 'A solicitação foi feita com sucesso!');
            navigation.navigate('ConfirmReserva', {idUsuario: idUsuario, horario: horario[0]+horario[1]+horario[2]+horario[3]+horario[4]});
            thisList();
          } else if (responseJson == 'Erro ao fazer Reserva!') {
            Alert.alert('Erro ao fazer a reserva!', 'Verifique os dados e tente novamente.');
          } else {
            Alert.alert(responseJson);
          }
          // Showing response message coming from server after inserting records.
        })
        .catch((error) => {
          Alert.alert("Erro na conexão", "Verifique sua internet!");
        });
    }
  }

  useEffect(() => {
    if (idEnd != 0 && idEnd != ''){
      thisList();
    }
  },[idEnd]);

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
      title: 'Nenhuma viagem encontrada!',
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
    if (erro == 'Sem erro.') {
      return (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={dataSource}
          ItemSeparatorComponent={listSeparator}
          renderItem={({ item }) => (

            item.num_vagas == 0 ? 

            <ItemView onPress={() => Alert.alert('Ônibus lotado!','Tente fazer reserva em outro horário.')}>
            <Item>
              <Text style={{marginTop: 10, fontSize: 18, color:'rgba(0,0,255,0.8)'}}>De: {item.origem} - Para: {item.destino}</Text>
            </Item>
            <Item>
              <Text style={{marginBottom: 10, fontSize: 16, color:'rgba(0,0,255,0.8)'}}>
              Horário: {item.horario[0]}{item.horario[1]}{item.horario[2]}{item.horario[3]}{item.horario[4]} - 
              </Text>
              <Text style={{fontSize: 16, color: 'rgba(255,0,0,255)', fontWeight:'bold'}}> Ônibus lotado
              </Text>
            </Item>
          </ItemView>
             : 
              <ItemView onPress={() => alertReserva(item.horario,item.origem, item.destino)}>
                <Item>
                  <Text style={{marginTop: 10, fontSize: 18, color:'rgba(0,0,255,0.8)'}}>De: {item.origem} - Para: {item.destino}</Text>
                </Item>
                <Item>
                  <Text style={{marginBottom: 10, fontSize: 16, color:'rgba(0,0,255,0.8)'}}>
                    Horário: {item.horario[0]}{item.horario[1]}{item.horario[2]}{item.horario[3]}{item.horario[4]} - Vagas disponíveis: {item.num_vagas}
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
          refreshing={refreshing}
          onRefresh={onRefresh}
          style={{marginLeft:20}}
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Text style={{fontSize: 16, color: 'rgba(255,0,0,255)', fontWeight:'bold', alignContent:'center', alignSelf:'center'}}>
              {item.title}
            </Text>)}
        />  
      );
    }
  }
  
  if (loading){
    return (
      <View style={{flex:1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#283593" />
      </View>
    );
  } else {
      return(
      <View style={{flex:1}}>
      <Header title="Reserva" icon="person" iconPress={() => navigation.navigate('Profile',{idUsuario: idUsuario})}/>
      <StatusBar backgroundColor="#283593" barStyle="light-content"/>
      <ScrollView>
          <Text style={styles.header}>{data}</Text>
          <List />
        <SignLink>
          <SignLinkText onPress={goToListReserva}>Já fez sua reserva?</SignLinkText>
        </SignLink>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text:{
    fontSize: 18, 
    color: "rgba(0,0,255,1)",
    padding: 10, 
    marginLeft: 20
  },
  header: {
    fontSize: 20, 
    color: "rgba(0,0,255,1)",
    padding: 10, 
    alignSelf:'center',
    fontWeight:'bold'
  }
});

/* DATE PICKER
import DateTimePicker from '@react-native-community/datetimepicker';
import {Plataform} from 'react-native';

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    const formmated = format(currentDate, 'HH:mm');
    setHorario(formmated);
    //setShow(false);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  {Platform.OS == 'ios' ? 
    <View>
      <FormMaskInput
        icon3="clock-outline"
        type={"datetime"}
        value={horario}
        options={{
          format: "HH:mm",
        }}
        placeholder="Horario"
        placeholderTextColor="rgba(0,0,255,0.4)"
        onChangeText={(data) => setHorario(data)}
      />
    </View> : 
    <View>
      <FormText icon3="clock-outline" text="Horário:  " text2={horario} icon2="calendar-clock" iconPress={showTimepicker}/>
    </View>
  }

  {show && (
    <DateTimePicker
      testID="dateTimePicker"
      value={today}
      mode={mode}
      is24Hour={true}
      display="default"
      onChange={onChange}
    />
  )}
*/