/* eslint-disable prettier/prettier */
import {
  ActivityIndicator,
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Text,
  Picker,
  Alert,
  RefreshControl,
  ScrollView,
} from "react-native";

import React from "react";

import { Button, Header, Body, Right } from "native-base";
import { Icon } from "react-native-elements";

export class Horario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching_Status: false,
      refreshing: false,
      loading: true,
      isLoading: true,
      listItem: '',
      container: 5,

      OrigemValue: '',
      DestinoValue:'',

      origem: '',
      destino:'',

      msg:'',
      textError:'',
    };
  }

  componentDidMount() {
    return fetch("http://mybus.projetoscomputacao.com.br/listTrip_api.php")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
            dataSource: responseJson,
            fetching_Status: true,
            refreshing: false,
            loading: false,
            isLoading: false,
        });
      })
      .catch((error) => {
        Alert.alert("Erro na conexão", "Verifique sua internet!");
        this.setState({ loading: false, refreshing: false });
      });
  }

  refreshList = () => {
    this.setState(
      {
        refreshing: true,
        fetching_Status: true,
      },
      () => {
        this.componentDidMount();
      }
    );
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#f0f0f0",
        }}
      />
    );
  };

  BuscarHorario = () => {
    fetch("http://192.168.100.6/consultaHorario_api.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origem: this.state.OrigemValue,
        destino: this.state.DestinoValue,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ listItem: responseJson, textError:'', container: 10});
        if (responseJson == 'Viagem não encontrada!'){
          this.setState({listItem: '', container: 20, textError: 'Nenhum horário encontrado!'});
        }
      })
      .catch((error) => {
        Alert.alert('Viagem não encontrada!');
      });

      
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#283593" />
        </View>
      );
    } else {
      return (
        <ScrollView animated='false'contentContainerStyle={{flex:1}} refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
        <View style={{ flex: 1 }}>
          <Header title="Menu" isHome={true} style={styles.containerheader}>
            <StatusBar backgroundColor="#283593" barStyle="light-content" />
            <Body style={{ paddingLeft: 20 }}>
              <Text style={styles.textHeader}>Horarios</Text>
            </Body>
            <Right>
              <Button transparent onPress={this.refreshList}>
                <Icon name="refresh" color="#fff" />
              </Button>
            </Right>
          </Header>
          
          <View style={{flexDirection:'row', marginLeft: 10, marginTop: 20}}>
            <Text style={{marginLeft: 10}}>Origem:</Text>
            <Text style={{marginLeft:100}}>Destino:</Text>
          </View>

          <View style={styles.viewPicker}>
            <Picker
              selectedValue={this.state.OrigemValue}
              onValueChange={(itemvalue, itemIndex) =>
                this.setState({OrigemValue: itemvalue})
              }
              style={styles.PickerInput}>
              {this.state.dataSource.map((item, key) => (
                <Picker.Item label={item.origem} value={item.origem} key={key}/>
              ))}
            </Picker>

            <Picker
              selectedValue={this.state.DestinoValue}
              onValueChange={(itemvalue, itemIndex) =>
                this.setState({DestinoValue: itemvalue})
              }
              style={styles.PickerInput}>
              {this.state.dataSource.map((item, key) => (
              <Picker.Item label={item.destino} value={item.destino} key={key}/>
            ))}
            </Picker>
          </View>

          <Button style={styles.button} onPress={this.BuscarHorario} title="Buscar">
            <Text style={styles.textButton}>Buscar</Text>
          </Button>
         
          <Text style={{marginLeft: 20, marginTop: 15}}>Horários: </Text>
          <View style={{height:this.state.container}}>
            <Text style={{marginLeft: 20, marginTop: 5}}>{this.state.textError}</Text>
          </View>
          <FlatList
            style={{marginLeft:20}}
            keyExtractor={(item,index) => index}
            data={this.state.listItem}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({ item }) => (
              <Text style={styles.FlatListitems}>
               {item.horario}({item.data})
              </Text>
            )}
          />
        </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 1,
  },
  containerheader: {
    backgroundColor: "#283593",
    paddingTop: 10,
    height: 60,
  },
  FlatListitems: {
    color: "#000",
    padding: 10,
  },
  textHeader: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  viewPicker:{
    flexDirection:'row',
    marginLeft: 10,
  },
  PickerInput: {
    marginLeft: 10,
    marginBottom: 10,
    justifyContent: "center",
    width: 150,
    height: 50,
  },
  button: {
    height: 40,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 80,
    marginRight: 80,
    justifyContent:'center',
    backgroundColor:'#283593',
  },
  textButton:{
    color:'#fff',
    textTransform:'capitalize',
    fontSize:16,
  },
  text: {
    
  },
});
