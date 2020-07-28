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

  function changePassword () {
    if (email === ''){
      Alert.alert('Informe um e-mail válido!');
    } else {
      fetch ('http://ebus.projetoscomputacao.com.br/backend/solicita-password_api.php', {
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
          if (responseJson === 'Usuário não encontrado!'){
            Alert.alert('Usuário não encontrado!', 'Digite um e-mail válido e tente novamente.');
          } else if (responseJson === 'Solicitação feita com sucesso!') {
            Alert.alert('Solicitação realizada com sucesso!','Agora confira seu e-mail.');
            navigation.goBack();
          } else if (responseJson === 'Erro na solicitação!'){
            Alert.alert('Erro na solicitação!','Confira seu e-mail e tente novamente.');
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
        <Text style={{margin: 5, paddingTop: 5, fontSize: 16, color:'rgba(0,0,255,1)'}}>Informe seu e-mail: </Text>
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