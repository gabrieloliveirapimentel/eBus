/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* Tela de Menu do Passageiro */

import React from 'react';
import {View, StyleSheet, StatusBar, ActivityIndicator, RefreshControl, ScrollView, ImageBackground} from 'react-native';
import {Button, Text, Header, Right, Body} from 'native-base';
import {Icon} from 'react-native-elements';

export class Menu extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      loading: true,
      send_email:'',
      id_usuario: '',
      nome:'',
      matricula:'',

      fetching_Status: false,
    }
  }
  
  onRefresh = () => {
    this.setState({
      refreshing: true,
      fetching_Status: true,
    }, ()=>{this.componentDidMount()});
    this.setState({refreshing: false});
  }


  componentDidMount() {
    this.setState({
      loading: false,
      fetching_Status: true,
      send_email: this.props.navigation.state.params.email,

    });
    return fetch('http://mybus.projetoscomputacao.com.br/verificaID_api.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.props.navigation.state.params.email,
        }),
      })
      .then((response) => response.json())
      .then((resultado) => {
        this.setState({
            id_usuario: resultado.id_usuario,
            nome: resultado.nome,
            matricula: resultado.matricula,
            fetching_Status: true,
          })
        })
       .catch((error) => {
          Alert.alert('Erro na conexão!', 'Verifique sua internet');
          
    });

  }

  render() {
  if (this.state.loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size="large" color="#283593" /></View>
    );
  } else {
    return (
      <ScrollView animated='false'contentContainerStyle={{flex:1}} refreshControl={
        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
        <Header title="Menu" style={styles.containerheader}>
        <StatusBar backgroundColor="#283593" barStyle="light-content"/>
            <Body style={{paddingLeft: 20}}>
            <Text style={styles.textHeader}>Menu</Text>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Perfil',{id_usuario:this.state.id_usuario})}>
              <Icon name= "person" color='#fff'/>
            </Button>
          </Right>
        </Header>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ImageBackground source ={require('../../../components/assets/background.png')} style={styles.imageBack} />
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize: 20}}>Seja bem-vindo, </Text>
              <Text style={{fontSize: 20, fontWeight:'bold'}}>{this.state.nome}</Text>
              
            </View>
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
    backgroundColor:"#283593",
    paddingTop: 10,
    height: 60,
    alignContent:'center'
    
  },
  textHeader: {
    color: '#fff',
    fontSize: 20,
    fontWeight:'bold',
  },
  imageBack: {
    position: 'absolute',
    width:'100%',
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'center',
    opacity: 0.7,
  },
});