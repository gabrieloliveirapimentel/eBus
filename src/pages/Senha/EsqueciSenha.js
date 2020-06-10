/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, ScrollView, Alert, StatusBar, TextInput, View} from 'react-native';
import {Button, Text} from 'native-base';

import {
  Container,
  Form,
} from './styles';

export class EsqueciSenha extends React.Component {
  constructor (props){
    super(props);
    this.state = {
        id_usuario: '',
        email:'',
    }
  }

  trocarSenha = () => {
    if (this.state.email == '' ){
          Alert.alert('Informe um e-mail válido!');
    }
    else {
      fetch('', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
      })
    }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == 'E-mail não cadastrado!'){
            Alert.alert(responseJson);
          }
          else {
            this.setState({id_usuario: responseJson.id_usuario});
            this.props.navigation.navigate('MudarSenha', {id_usuario: this.state.id_usuario})
          }

        }).catch((error) => {
          Alert.alert('Erro na conexão', 'Verifique sua internet!');
        });
    }
  }

  render (){
    return (
      <ScrollView animated='false'style={styles.scrollView}>
      <StatusBar backgroundColor="#283593" barStyle="light-content"/>
        <Container>
          <Form>
            <Text style={{margin: 5, paddingTop: 5}}>Informe seu e-mail: </Text>
            <View style={styles.campoStyle}>
              <TextInput style={styles.text}  
                  placeholder="E-mail"  
                  placeholderTextColor='rgba(0,0,255,0.4)'
                  onChangeText={(data) => this.setState({email: data})}
              />
            </View>
            <Button style={styles.button}
              onPress={this.trocarSenha}
              title="Entrar"><Text style={styles.textButton}>Confirmar</Text>
            </Button>
          </Form>
        </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textInfo:{
    margin: 5,
  },
  containerheader: {
    backgroundColor:"#283593",
    paddingTop: 10,
    height: 60,
    alignContent:'center'
    
  },
  text:{
    fontSize: 15,
    color: 'rgba(0,0,255,0.6)',
    marginLeft: 25,
  },
  campoStyle:{
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    height: 46,
  },
  textHeader: {
    color: '#fff',
    fontSize: 20,
    fontWeight:'bold',
  },
  button: {
    height: 40,
    borderRadius: 10,
    marginLeft: 60,
    marginRight: 60,
    marginTop: 20,
    marginBottom: 20,
    justifyContent:'center',
    backgroundColor:'#283593',
  },
  textButton:{
    color:'#fff',
    textTransform:'capitalize',
    fontSize:16,
  },
});

