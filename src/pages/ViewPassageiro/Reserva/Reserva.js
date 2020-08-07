import React, {useState, useEffect, useCallback} from 'react';
import { View, StatusBar, Alert, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import { Text} from 'native-base';
import {format} from 'date-fns';
import moment from 'moment';
import pt from 'date-fns/locale/pt-BR';
import {
  Header,
  Item,
  ItemView,
  Tab,
} from './styles';

export default function Reserva ({navigation}) {
  const {email} = navigation.state.params;
  const [idUsuario, setIdUsuario] = useState(0);
  const [dataSource, setdataSource] = useState([]);
  const [loading, setloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState('');

  const today = new Date();
  const data = format(today, "dd 'de' MMMM' de 'yyyy'",{locale: pt});
  const todayData = format(today, 'dd-MM-yyyy',{locale: pt});

  const todayHour = moment(today).format("HH:mm:ss",{locale: pt});
  const todayData3 = moment(today).format("yyyy-MM-DD",{locale: pt});
  const todayCorrect = todayData3 + ' ' + todayHour;

  useEffect(() => {
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
      }).catch((error) => {
        Alert.alert('Erro na conexão!', 'Verifique sua internet');  
    });
  },[email]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    thisList();
  }, [refreshing]);

  useEffect(thisList = () => {
    setloading(false);
      fetch('http://ebus.projetoscomputacao.com.br/backend/listTripReserva_api.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_usuario: idUsuario,
      })
      }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == 'Nenhuma viagem encontrada.'){
          setErro('Erro.');
          setloading(false);
        } else if (responseJson == 'Erro na busca de reservas.') {
          setErro('Erro.');
          setloading(false);
        } else {
          setdataSource(responseJson);
          setloading(false);
          setErro('Sem erro.');
        }
      }
    ).catch((error) => {
      Alert.alert('Erro na conexão!', 'Verifique sua internet!');
      setloading(false);
    })
  },[]);

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
          } else if(responseJson == 'Número máximo de reservas já feito!'){
            Alert.alert('Número máximo de reservas atingido!','No momento, é permitido que cada usuário faça tenha apenas 2 reservas por dia.'+'\n\n'+'Mas não se preocupe, se uma de suas reservas for de horário anterior ao atual, ela é removida automaticamente, permitindo novas reservas.');
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
        })
        .catch((error) => {
          Alert.alert("Erro na conexão", "Verifique sua internet!");
        });
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
          renderItem={({ item }) => (
            moment(todayData3+' '+item.horario).isBefore(todayCorrect) ? 
            <ItemView onPress={() => Alert.alert('Viagem já realizada!', 'Tente novamente em outro horário.')}>
              <Item>
                <Text style={{marginTop: 10, fontSize: 17, color:'rgba(0,0,0,0.3)'}}>De: {item.origem} - Para: {item.destino}</Text>
              </Item>
              <Item>
                <Text style={{marginBottom: 10, fontSize: 15, color:'rgba(0,0,0,0.3)'}}>
                  Horário: {item.horario[0]}{item.horario[1]}{item.horario[2]}{item.horario[3]}{item.horario[4]} - Vagas disponíveis: {item.num_vagas}
                </Text>
              </Item>
            </ItemView>
            
            :

            item.num_vagas == 0 ? 

            <ItemView onPress={() => Alert.alert('Ônibus lotado!','Tente fazer reserva em outro horário.')}>
            <Item>
              <Text style={{marginTop: 10, fontSize: 17, color:'rgba(0,0,255,0.8)'}}>De: {item.origem} - Para: {item.destino}</Text>
            </Item>
            <Item>
              <Text style={{marginBottom: 10, fontSize: 15, color:'rgba(0,0,255,0.8)'}}>
              Horário: {item.horario[0]}{item.horario[1]}{item.horario[2]}{item.horario[3]}{item.horario[4]} - 
              </Text>
              <Text style={{fontSize: 15, color: 'rgba(255,0,0,255)', fontWeight:'bold'}}> Ônibus lotado
              </Text>
            </Item>
          </ItemView>
             : 
              <ItemView onPress={() => alertReserva(item.horario,item.origem, item.destino)}>
                <Item>
                  <Text style={{marginTop: 10, fontSize: 17, color:'rgba(0,0,255,0.8)'}}>De: {item.origem} - Para: {item.destino}</Text>
                </Item>
                <Item>
                  <Text style={{marginBottom: 10, fontSize: 15, color:'rgba(0,0,255,0.8)'}}>
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

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#283593" />
      </View>
    );
  } else {
    return (
      <View style={{flex:1}}>
        <Header title="Reservar" icon="person" iconPress={() => navigation.navigate('Profile',{idUsuario: idUsuario})}/>
        <Text style={styles.header}>{data}</Text>
        <StatusBar backgroundColor="#283593" barStyle="light-content"/>
        <List />
        <Tab 
          onPress1={() => {}}
          color1="#fff"
          onPress2={() => navigation.navigate('ListReserva',{idUsuario: idUsuario})}
          color2="rgba(255,255,255,0.5)"
          onPress3={() => navigation.navigate('Horario',{idUsuario: idUsuario})}
          color3="rgba(255,255,255,0.5)"
        />
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