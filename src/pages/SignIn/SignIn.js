import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Alert, StatusBar, View, ActivityIndicator} from 'react-native';
import * as Font from 'expo-font';

import Background from '../../components/Background';
import {Form, FormInput, Container, SubmitButton, SignLink, SignLinkText} from './styles';

export default function SignIn ({navigation}){
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState (true);
  const [verificar, setVerificar] = useState (true);
  const [icon, setIcon] = useState('visibility-off');

  useEffect (() => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    })
    setLoading(false);
  },[]);

  function fazerLogin () {
    setLoading(true);
    if (email == '' && senha == '') { setLoading(false);} 
    else if (email == '') { setLoading(false); Alert.alert('E-mail em branco!');}
    else if (senha == '') { setLoading(false); Alert.alert('Senha em branco!');}
    else {
      fetch ('http://mybus.projetoscomputacao.com.br/loginUsuario2_api.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          senha: senha,
        }),
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == 'Bem-vindo!'){
            navigation.navigate('Reserva', {email: email});
          }
          else if (email == null && senha == null){
            setLoading(false);
            Alert.alert('Dados em branco!');
          }
          else if (responseJson == 'Administrador'){
            navigation.navigate('Viagem', {email: email, admin: 1});
          }
          else if (responseJson == 'Colaborador'){
            Alert.alert('Colaborador!');
          }
          else { setLoading(false); Alert.alert(responseJson)}
        }).catch((error) => {
          Alert.alert('Erro na conexão', 'Verifique sua internet!');
          setLoading(false);
      })
    }
  }

  function atualizaIcone () {
    if (verificar == true){
      setVerificar(false),
      setIcon('visibility');
    }
    else {
      setVerificar(true),
      setIcon('visibility-off');
    }
  }

  if (loading){
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  } else {
    return (
      <Background>
      <Container>
      <StatusBar backgroundColor="#283593" barStyle="light-content"/>
        <Image 
          style={styles.tinyLogo}
          source={require('../../components/assets/logomybus.png')}
        />
        <Form>
          <FormInput
            icon= "mail-outline"  
            placeholder="E-mail"  
            keyboardType="email-address"
            autoCompleteType="email"
            placeholderTextColor="#fff"
            onChangeText={(data) => setEmail(data)}
          />
          <FormInput
            icon= "lock-outline" 
            icon2 = {icon} 
            iconPress={atualizaIcone}
            placeholder="Senha"  
            secureTextEntry = {verificar}
            placeholderTextColor="#fff"
            onChangeText={(data) => setSenha(data)}
          />
        </Form>
        <SubmitButton
          icon="arrow-forward"
          onPress={fazerLogin}>Entrar
        </SubmitButton>
        <SignLink>
          <SignLinkText
            onPress={() => navigation.navigate('SignUp')}>
            Cadastrar-se
          </SignLinkText>
          <SignLinkText
            onPress={() => navigation.navigate('LostPassword')}>
            Esqueceu sua senha?
          </SignLinkText>
        </SignLink>
      </Container>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: '#283593'
  },
  tinyLogo: {
    width: 175,
    height: 120,
  },
});

