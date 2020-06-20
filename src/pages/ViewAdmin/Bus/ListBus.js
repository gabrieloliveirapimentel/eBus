/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useCallback} from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
} from "react-native";
import { Fab } from "native-base";
import { Icon } from "react-native-elements";

import {Container, Header, Tab} from './styles';

export default function ListBus ({ navigation }) {
  const {idUsuario} = navigation.state.params;
  const [dataSource, setdataSource] = useState([]);
  const [loading, setloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  function thisList(){}

  useEffect( 
    thisList = () => {
      setloading(false);
      fetch('http://192.168.0.17/listBus_api.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fk_id_usuario: idUsuario,
        }),
      }).then((response) => response.json())
        .then((responseJson) => {setdataSource(responseJson);}
      ).catch((error) => {
        Alert.alert('Erro na conexão', 'Verifique sua internet!');
        setloading(false);
      })
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
        <Header title="Ônibus" icon="refresh" iconPress={onRefresh}/>
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={dataSource}
          renderItem={({item}) => (
            <Text 
              onPress={() => navigation.navigate('InfoBus', {
                placa: item.placa,
                linha: item.linha, 
                numVagas: item.num_vagas, 
                motorista: item.nome, 
                disponivel: item.disponibilidade
              })} 
              style={{fontSize: 18, color: "#000",padding: 10}}>
              {item.placa}
            </Text> )}
          keyExtractor={(item) => item.placa}
          />
        <Fab
          onPress={() => navigation.navigate('NewBus',{idUsuario: idUsuario})}
          style={{ backgroundColor: "#283593", marginBottom: 50 }}
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

/*
export class ListBus extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      fetching_Status: false,
      loading: true,
      refreshing: false,
    }
  }

  refreshList = () => {
    this.setState({
      refreshing: true,
      fetching_Status: true,
    },() =>{this.componentDidMount();}
    )
  }

  componentDidMount() {
    this.setState({
      loading: false,
      refreshing: false,
    });
    return fetch('http://mybus.projetoscomputacao.com.br/listBus_api.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
          fetching_Status: true,
        }, function() {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        Alert.alert('Erro na conexão', 'Verifique sua internet!');
        this.setState({loading:false, refreshing: false});
      });
  }

  FlatListItemSeparator =()=> {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#f0f0f0",
        }}
      />
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size="large" color="#283593" /></View>
      );
    } else {
      return (
      <View style={{flex: 1}}>
        <Header title="Menu" isHome={true} style={styles.containerheader}>
        <StatusBar backgroundColor="#283593" barStyle="light-content"/>
          <Body style={{paddingLeft: 20}}><Text style={styles.textHeader}>Ônibus</Text></Body>
          <Right>
            <Button transparent onPress = { this.refreshList} >
              <Icon name="refresh" color="#fff"/>
            </Button>
          </Right>
        </Header>
          <FlatList
            refreshing={this.state.refreshing}
            onRefresh={this.refreshList}
            data={ this.state.dataSource }
            ItemSeparatorComponent = {this.FlatListItemSeparator}
            renderItem={({item}) => <Text style={styles.FlatListitems}
              
            onPress={() => {this.props.navigation.navigate('InfoBus',{placa: item.placa,
               linha: item.linha, 
               num_vagas: item.num_vagas, 
               motorista: item.nome, 
               disponivel: item.disponibilidade})}}>{item.placa} </Text>}
            keyExtractor={(item, index) => index}
            />
          <Fab 
              onPress={() => {this.props.navigation.navigate('CadastrarOnibus')}}
              style={{ backgroundColor: "#283593" }}
              position="bottomRight">
                <Icon name="add" color="#fff"/>
            </Fab>
      </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 1,
  },
  containerheader: {
    backgroundColor:"#283593",
    paddingTop: 10,
    height: 70,
  },
  FlatListitems: {
    fontSize: 18,
    color: '#000',
    padding: 10
  },
  textHeader: {
    color: '#fff',
    fontSize: 20,
    fontWeight:'bold',
  }
});
*/