/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Alert, Text, StatusBar} from 'react-native';
import {
  Container,
  Form,
  FormInput,
  SubmitButton
} from './styles';

export default function LostPassword ({navigation}){
  const [email, setEmail] = useState('');
  const [idUsuario, setidUsuario] = useState(0);

  function changePassword () {
    if (email === ''){
      Alert.alert('Informe um e-mail válido!');
    } else {
      fetch ('http://mybus.projetoscomputacao.com.br/changePassword_api.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson === 'E-mail não cadastrado!'){
            Alert.alert(responseJson);
          } else {
            setidUsuario(responseJson.id_usuario);
            navigation.navigate('ChangePassword',{idUsuario:idUsuario})
        }
      }).catch((error) => {
        Alert.alert('Erro na conexão', 'Verifique sua internet!');
      });
    }
  }

  return (
    <Container>
    <StatusBar backgroundColor="#283593" barStyle="light-content"/>
      <Form>
        <Text style={{margin: 5, paddingTop: 5}}>Informe seu e-mail: </Text>
        <FormInput 
          icon="mail-outline"
          placeholder="E-mail"  
          placeholderTextColor='rgba(0,0,255,0.4)'
          onChangeText={(data) => setEmail(data)}
        />  
      </Form>
      <SubmitButton
        onPress={changePassword}
      >Confirmar
      </SubmitButton>
    </Container>
  );
}