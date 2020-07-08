/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {
  Container,
  Form,
  FormInput,
  SubmitButton
} from './styles';

export default function ChangePassword ({navigation}){
  const {idUsuario} = navigation.state.params;
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [verificar, setVerificar] = useState(true);
  const [verificar2, setVerificar2] = useState(true);
  const [icon, setIcon] = useState('visibility-off');
  const [icon2, setIcon2] = useState('visibility-off');

  function attVisibility(){
    if(verificar){
      setVerificar(false);
      setIcon('visibility');
    } else {
      setVerificar(true);
      setIcon('visibility-off');
    }
  }

  function attVisibility2 (){
    if(verificar2){
      setVerificar2(false);
      setIcon2('visibility');
    }
    else {
      setVerificar2(true);
      setIcon2('visibility-off');
    }
  }

  function updatePassword () {
    if (senha === '' || confirmaSenha === ''){
          Alert.alert('Dados em branco, tente novamente!');
    }
    else if (senha != confirmaSenha){
      Alert.alert('Senhas diferentes!')
    }
    else {
      fetch('http://ebus.projetoscomputacao.com.br/backend/updatePassword_api.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_usuario: idUsuario,
        senha: senha,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson=='Senha atualizada!'){
          Alert.alert(responseJson);
          navigation.navigate('SignIn');}
        else { Alert.alert(responseJson); }
      }).catch((error) => {
        Alert.alert('Erro na conexão', 'Verifique sua internet!');
      });
    }
  }

  return (
    <Container>
      <Form>
        <FormInput
          icon="lock-outline"
          icon2={icon}
          iconPress={attVisibility}
          autoCapitalize="none"
          secureTextEntry = {verificar}
          placeholder="Senha"  
          placeholderTextColor='rgba(0,0,255,0.4)'
          onChangeText={(data) => setSenha(data)}
        />
        <FormInput
          icon="lock-outline"
          icon2= {icon2}
          iconPress={attVisibility2}
          autoCapitalize="none"
          secureTextEntry = {verificar2}
          placeholder="Confirmar Senha"  
          placeholderTextColor='rgba(0,0,255,0.4)'
          onChangeText={(data) => setConfirmaSenha(data)}
        />
      </Form>
      <SubmitButton
        onPress={updatePassword}
      >Confirmar
      </SubmitButton>
    </Container>
  );
}
