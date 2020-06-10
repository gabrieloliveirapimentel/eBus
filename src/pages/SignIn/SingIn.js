/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet, Alert, StatusBar, View, Text, TextInput, ActivityIndicator} from 'react-native';
import {Container, Form, Right} from 'native-base';
import {RectButton} from 'react-native-gesture-handler';
import * as Font from 'expo-font';

import {MaterialIcons as Icon} from '@expo/vector-icons';

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      colaborador: '',
      administrador: '',
      loading: true,
      
      verificar: true,
      icon: 'visibility',
    };
  }

  loginUsuario = () => {this.setState({loading: true},
    );if (this.state.email == '' && this.state.senha == ''){
      this.setState({loading:false});
      Alert.alert('Campos em branco!')
    } else if (this.state.email == ''){
      this.setState({loading:false});
      Alert.alert('E-mail em branco!')
    } else if (this.state.senha == ''){
      this.setState({loading:false});
      Alert.alert ('Senha em branco!')
    } else {
      fetch('http://mybus.projetoscomputacao.com.br/loginUsuario2_api.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        senha: this.state.senha,
        colaborador: this.state.colaborador,
        administrador: this.state.administrador,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
          if (responseJson == 'Bem-vindo!') {
            this.props.navigation.navigate('Menu',{email: this.state.email});
          }
          else if (this.state.email == null && this.state.senha == null){
            this.setState({loading:false});
            Alert.alert('Dados em branco!')}
          else if (responseJson == 'Administrador'){
            this.props.navigation.navigate('MenuAdmin',{email: this.state.email});}
          else if (responseJson == 'Colaborador'){
            this.props.navigation.navigate('MenuColab',{email: this.state.email});}
          else {
            this.setState({loading:false});
            Alert.alert(responseJson)}
      })
      .catch((error) => {
        Alert.alert('Erro na conexão', 'Verifique sua internet!');
        this.setState({loading:false});
      });
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({loading: false});
  }

  atualizarValor = () => {
    if (this.state.verificar == true){
      this.setState({
        verificar: false,
        icon:'visibility-off'
      });
    } else {
      this.setState({
        verificar: true,
        icon:'visibility'
      });
    }
    
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#283593'}}><ActivityIndicator size="large" color="#fff" /></View>
      );
    }else {
    return (
        <Container style={styles.MainContainer}>
          <StatusBar backgroundColor="#283593" barStyle="light-content"/>
          <Image
            style={styles.tinyLogo}
            source={require('../../components/assets/logomybus.png')}
          />
          <Form style={styles.form}>
            <View style={styles.inputForm}>
              <View style={styles.iconForm}>
                <Icon  
                  size={20} 
                  name= "mail-outline"
                  color='#fff'/>
              </View>
              <TextInput style={styles.text}  
                placeholder="E-mail"  
                keyboardType="email-address"
                autoCompleteType="email"
                placeholderTextColor="#fff"
                onChangeText={(data) => this.setState({email: data})}
              />
            </View>

            <View style={styles.inputForm}>
              <View style={styles.iconForm}>
                <Icon  
                  size={20} 
                  name= "lock-outline" 
                  color='#fff'/>
              </View>
              <TextInput style={styles.text}  
                placeholder="Senha"  
                placeholderTextColor="#fff"
                secureTextEntry = {this.state.verificar}
                onChangeText={(data) => this.setState({senha: data})}
              />
              <Right style={{marginEnd: 15}}>
                <Icon 
                  name= {this.state.icon} 
                  size={20} 
                  color='#fff' 
                  onPress={this.atualizarValor}/>
              </Right>
            </View>

            
              <RectButton style={styles.button} onPress={this.loginUsuario}>
                <View style={styles.buttonIcon} >
                  <Icon name="arrow-forward" color='#283593' size={20}/>
                </View>
                <Text style={styles.textButton}>Entrar</Text>
              </RectButton>

          </Form>

          <Text style={styles.textSubmit}
              onPress={() => this.props.navigation.navigate('SignUp')}>Cadastrar-se</Text>

          <Text 
            style={styles.textSubmit}
            onPress={() => this.props.navigation.navigate('EsqueciSenha')}>Esqueceu sua senha?</Text>            
        </Container>
    );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingEnd: 5,
  },
  MainContainer:{
    flex: 1,
    justifyContent: 'center',
    padding: 0.50,
    alignItems: 'center',
    backgroundColor: '#283593',
  },
  tinyLogo: {
    width: 175,
    height: 120,
  },
  button: {
    backgroundColor: '#fff',
    height: 40,
    width: 200,
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  buttonIcon: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
  },
  textButton:{
    color:'#283593',
    textTransform:'capitalize',
    fontSize:16,
    fontWeight:'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 40,
  },
  textSubmit:{
    marginTop: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  form:{
    marginTop: 20,
    alignItems:'center',
    justifyContent:'center',
    marginLeft: 20,
    marginRight: 20,
  },
  inputForm:{
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    height: 46,
    marginTop: 10,
  },
  iconForm:{
      height: 46,
      width: 46,
      borderBottomLeftRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  text:{
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
    flex: 1,
  },
});

