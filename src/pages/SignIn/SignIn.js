import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Alert, StatusBar, AsyncStorage, View, Linking} from 'react-native';
import * as Font from 'expo-font';
import {onSignIn} from '../../services/auth';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';
import Background from '../../components/Background';
import {Form, FormInput, Container, SubmitButton, SignLink, SignLinkText} from './styles';

export default function SignIn ({navigation}){
  const [id, setID] = useState(0);
  const ID_KEY = "@eBus:id";
  const ADMIN_KEY = "@eBus:admin";
  const COLAB_KEY = "@eBus:colab";
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState (false);
  const [verificar, setVerificar] = useState (true);
  const [icon, setIcon] = useState('visibility-off');

  function setIDKey(id){
    AsyncStorage.setItem(ID_KEY, id);
  }

  function setAdminKey(email){
    AsyncStorage.setItem(ADMIN_KEY, email);
  }

  function setColabKey(email){
    AsyncStorage.setItem(COLAB_KEY, email);
  }

  useEffect (() => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    })
  },[]);

  function getID(email){
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
          setIDKey(resultado.id_usuario);        
        }).catch((error) => {
          Alert.alert('Erro na conexão!', 'Verifique sua internet');  
      });
    }

  function fazerLogin () {
    setLoading(true);
    if (email == '' && senha == '') { 
      Alert.alert('Dados em branco!','Preencha os campos solicitados e tente novamente.');
      setLoading(false);
    } 
    else if (email == '') { setLoading(false); Alert.alert('E-mail em branco!','Verifique o campo de e-mail.');}
    else if (senha == '') { setLoading(false); Alert.alert('Senha em branco!','Verifique o campo de senha.');}
    else {
      fetch ('http://ebus.projetoscomputacao.com.br/backend/loginUser_api.php', {
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
            getID(email);
            onSignIn().then(() => {
              navigation.navigate('Reserva')
              setLoading(false);
            });
          }
          else if (responseJson == 'Administrador'){
            setAdminKey(email);
            navigation.navigate('Viagem');
            setLoading(false);
          }
          else if (responseJson == 'Colaborador'){
            setColabKey(email);
            navigation.navigate('ViagemColab');
            setLoading(false);
          }
          else if (responseJson == 'Senha incorreta, verifique novamente!'){
            Alert.alert('Senha incorreta!', 'Verifique sua senha e tente novamente.');
            setSenha('');
            setLoading(false);
          }
          else if (responseJson == 'Dados incorretos, verifique novamente!') {
            Alert.alert('Dados incorretos!', 'Verifique seus dados e tente novamente.');
            setEmail('');
            setSenha('');
            setLoading(false);
          } else if (responseJson == 'Conta desativada!'){
            Alert.alert(
              "Conta desativada!",
              "Deseja reativar sua conta?",
              [
                { text: "Sim, quero!", onPress: () => navigation.navigate('Reactivate', {send_email: email})},
                {
                  text: "Cancelar",
                  style: "cancel"
                }
              ],
              { cancelable: false }
            );
            setEmail('');
            setSenha('');
            setLoading(false);
          } else {
            Alert.alert(responseJson);
            setEmail('');
            setSenha('');
            setLoading(false);
          }
        }).catch((error) => {
          //console.log(error);
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

  //help-circle

  return (
    <Background>
     <View style={{marginTop: 20, marginRight: 20, alignSelf:'flex-end'}}>
        <Icon name="help-circle" size={22} color="#fff" onPress={() => {Linking.openURL('http://ebus.projetoscomputacao.com.br/#contato')}} />
      </View>
    <Container>
    <StatusBar backgroundColor="#283593" barStyle="light-content"/>
      <Image 
        style={styles.tinyLogo}
        source={require('../../components/assets/logoebus.png')}
      />
      <Form>
        <FormInput
          icon= "mail-outline"
          value={email}  
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
        loading={loading}
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

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: '#283593'
  },
  tinyLogo: {
    width: 210,
    height: 155,
  },
});

