import React, {useState, useEffect} from 'react';
import {Alert, Text} from 'react-native';
import {
  Container,
  Form,
  FormInput,
  SubmitButton
} from './styles';

export default function Reactivate ({navigation}){
  const [email, setEmail] = useState(navigation.state.params.send_email);
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

  function reactiveAccount () {
    if (email == '' && senha == '') { 
      Alert.alert('Dados em branco!','Preencha os campos solicitados e tente novamente.');
      setLoading(false);
    } 
    else if (email == '') { Alert.alert('E-mail em branco!','Verifique o campo de e-mail.');}
    else if (senha == '') { Alert.alert('Senha em branco!','Verifique o campo de senha.');}
    else if (confirmaSenha == '') {
      Alert.alert('Senha em branco!','Verifique o campo de senha.');
    }
    else if (senha != confirmaSenha){
      Alert.alert('Senhas diferentes', 'Verifique novamente!');
    }
    else {
      fetch ('http://mybus.projetoscomputacao.com.br/reactivateAccount_api.php', {
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
          if (responseJson == 'Conta reativada!'){
            Alert.alert('Conta reativada!', 'A conta foi reativada com sucesso.');
            navigation.navigate('SignIn');
          }
          else if (responseJson == 'Erro ao reativar conta, tente novamente!') {
            Alert.alert('Erro ao reativar conta!', 'Verifique seus dados e tente novamente.');
            setSenha('');
          } else if (responseJson == 'Senha incorreta, verifique novamente!'){
            Alert.alert('Senha incorreta!', 'Verifique sua senha e tente novamente.');
            setSenha('');
          } else {
            Alert.alert(responseJson);
            setSenha('');
          }
        }).catch((error) => {
          Alert.alert('Erro na conexão', 'Verifique sua internet!');
      })
    }
  }

  return (
    <Container>
      <Form>
        <FormInput 
          icon="mail-outline"
          value={email}
          placeholder="E-mail"  
          placeholderTextColor='rgba(0,0,255,0.4)'
          onChangeText={(data) => setEmail(data)}
        /> 
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
        onPress={reactiveAccount}
      >Reativar
      </SubmitButton>
    </Container>
  );
}