/* eslint-disable prettier/prettier */
import React from 'react';
import { Alert, View, StyleSheet, StatusBar, FlatList, Text, ActivityIndicator} from 'react-native';
import {Button, Header, Body, Right, Fab} from 'native-base';
import {Icon} from 'react-native-elements';

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
              
            onPress={() => {this.props.navigation.navigate('InfoBus',{placa: item.placa, linha: item.linha, num_vagas: item.num_vagas, motorista: item.nome, disponivel: item.disponibilidade})}}>{item.placa} </Text>}
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