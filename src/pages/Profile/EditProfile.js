/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, ScrollView, Alert, StatusBar, Linking} from 'react-native';

import {
  Container,
  Form,
  FormInput,
  FormMaskInput,
  SignLink,
  SubmitButton,
} from './styles';

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 0,
  }
});

export default function EditProfile ({navigation}){
  const {send_id} = navigation.state.params;
  const {send_nome} = navigation.state.params; 
  const {send_email} = navigation.state.params;
  const {send_matricula} = navigation.state.params;
  const {send_telefone} = navigation.state.params;
  const {send_admin} = navigation.state.params; 
  const {send_colab} = navigation.state.params; 
  const {send_idEnd} = navigation.state.params; 
  const {send_CEP} = navigation.state.params;
  const {send_rua} = navigation.state.params;
  const {send_num} = navigation.state.params;
  const {send_complemento} = navigation.state.params; 
  const {send_bairro} = navigation.state.params; 
  const {send_cidade} = navigation.state.params;
  const {send_UF} = navigation.state.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setNome(send_nome);
    setEmail(send_email);
    setMatricula(send_matricula);
    setTelefone(send_telefone);
    setNumero(send_num);
    setComplemento(send_complemento);
    setCEP(send_CEP);
    setRua(send_rua);
    setBairro(send_bairro);
    setCidade(send_cidade);
    setUF(send_UF);
    setLoading(false);
  },[]);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmasenha, setConfirmaSenha] = useState('');
  const [matricula, setMatricula] = useState('');
  const [telefone, setTelefone] = useState('');
  const [numero, setNumero] = useState(0);
  const [complemento, setComplemento] = useState('');
  const [CEP, setCEP] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [UF, setUF] = useState('');

  const [erro, setErro] = useState(false);
  const [verificar, setVerificar] = useState(true);
  const [verificar2, setVerificar2] = useState(true);
  const [icon, setIcon] = useState('visibility-off');
  const [icon2, setIcon2] = useState('visibility-off');

  const confirmEdit = () => {
    Alert.alert(
      "Deseja editar seus dados?",
      "Confirme sua solicitação.",
      [
        { text: "Sim, quero!", onPress: () => editUser()},
        {
          text: "Cancelar",
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  }

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

  function attCEP (){
    if (CEP === ''){
      Alert.alert('CEP em branco!');
    } else {
      fetch('https://viacep.com.br/ws/' + CEP + '/json/')
      .then((response) => response.json())
      .then(resultado => {
        setRua(resultado.logradouro),
        setBairro(resultado.bairro),
        setCidade(resultado.localidade),
        setUF(resultado.uf),
        setErro(resultado.erro)

      if (erro === true){
        Alert.alert(
          'CEP inválido','Tente novamente!',[{
              text: "Não sei meu CEP", onPress: () => Linking.openURL('http://www.buscacep.correios.com.br/sistemas/buscacep/'),
            },{ text: "Ok"}
          ],{cancelable: false }
        );
        setErro(false);
        }      
      }).catch((error) => {
        Alert.alert('Tente novamente!');
        setLoading(false);
      });
    }
  }

  function editUser (){
    if (nome === '' || cidade === '' || bairro === '' || CEP === '' || rua === '' || numero === ''){
      Alert.alert('Campos em branco!', 'Verifique os dados preenchidos.');
    } else if (matricula === '' && send_colab == 0 && send_admin == 0){
      Alert.alert('Matrícula em branco!', 'Verifique seus dados novamente.');
    } else if (email === ''){
      Alert.alert('E-mail em branco!', 'Verifique seus dados novamente.');
    } else if (senha === ''){
      Alert.alert('Senha em branco!', 'Verifique seus dados novamente.');
    } else if (confirmasenha != senha) {
      Alert.alert('Senhas diferentes!', 'Verifique os campos de senha.');
    } else {
      fetch('http://ebus.projetoscomputacao.com.br/backend/updateUser_api.php', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        }, body: JSON.stringify({
          id_usuario: send_id,
          id_endereco: send_idEnd,
          email: email,
          senha: senha,
          matricula: matricula,
          nome: nome,
          telefone: telefone,
          numero: numero,
          complemento: complemento,
          cep: CEP,
          rua: rua,
          bairro: bairro,
          cidade: cidade,
          uf: UF,
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          if(responseJson === 'Dados atualizados com sucesso!'){
            Alert.alert('Dados atualizados!','Edição realizada com sucesso!');
            navigation.navigate('Profile');
          } else if (responseJson === 'Erro ao editar os dados, tente novamente!') {
            Alert.alert('Erro ao editar os dados!', 'Verifique os campos e tente novamente.');
          } else if (responseJson === 'E-mail já existente, tente novamente!'){
            Alert.alert('E-mail já existente!', 'Tente novamente.');
          } else {
            Alert.alert(responseJson);
          }
        }).catch((error) => {
          Alert.alert('Erro na conexão', 'Verifique sua internet!');
        })
    }
  }

  if (loading == true){
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#283593" />
      </View>
    );
  } else {
    if (send_admin == 1 || send_colab == 1){
      return(
        <ScrollView animated='false'style={styles.scrollView}>
        <StatusBar backgroundColor="#283593" barStyle="light-content"/>
        <Container> 
          <Form>
            <FormInput
              icon="person"
              autoCorrect={true}
              value={nome}
              autoCapitalize="sentences"
              placeholder="Nome"
              placeholderTextColor='rgba(0,0,255,0.2)'
              onChangeText={(data) => setNome(data)}
            />
            <FormInput
              icon="mail-outline"
              autoCapitalize="none"
              value={email}
              keyboardType="email-address"
              autoCompleteType="email"
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
            <FormMaskInput
              icon="call"
              type={"cel-phone"}
              value={telefone}
              options={{
                maskType: "BRL",
                withDDD: true,
                dddMask: "(99) ",
              }}
              placeholder="Telefone"
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => setTelefone(data)}
            />
            <FormMaskInput
              icon="map"
              icon4="map-search"
              iconPress={attCEP}
              type={"zip-code"}
              value={CEP}
              placeholder="CEP"
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => setCEP(data)}
            />
            <FormInput
              icon="home"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Rua"
              value={rua}
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => setRua(data)}
            />
            <FormMaskInput
              icon3="numeric-1-box-multiple-outline" 
              autoCorrect={false}
              value={numero}
              type={"custom"}
              keyboardType="number-pad"
              options={{mask: '99999'}}
              placeholder="Número"
              placeholderTextColor="rgba(0,0,255,0.4)"
              onChangeText={(data) => setNumero(data)}
            /> 
            <FormInput
              icon3="home-city"
              autoCorrect={false}
              value={complemento}
              autoCapitalize="none"
              placeholder="Complemento"
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => setComplemento(data)}
            />
            <FormInput
              icon3="city-variant"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Bairro"
              value = {bairro}
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => setBairro(data)}
            />
            <FormInput
              icon3="city-variant-outline"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Cidade"
              value = {cidade}
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => setCidade(data)}
            />         
            <FormInput
              icon="public"
              autoCapitalize="characters"
              placeholder="UF"
              value={UF}
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => setUF(data)}
              autoCapitalize="characters"
              maxLength={2}
            />
          </Form>
          <SignLink>
            <SubmitButton
              onPress={confirmEdit}>Confirmar
            </SubmitButton>
          </SignLink>    
        </Container> 
        </ScrollView>
      );
    } else {
      return(
        <ScrollView animated='false'style={styles.scrollView}>
        <StatusBar backgroundColor="#283593" barStyle="light-content"/>
        <Container> 
        <Form>
          <FormInput
            icon="person"
            autoCorrect={true}
            value={nome}
            autoCapitalize="sentences"
            placeholder="Nome"
            placeholderTextColor='rgba(0,0,255,0.2)'
            onChangeText={(data) => setNome(data)}
          />
          <FormInput
              icon="mail-outline"
              autoCapitalize="none"
              value={email}
              keyboardType="email-address"
              autoCompleteType="email"
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
            <FormInput
              icon="computer"
              autoCorrect={false}
              value={matricula}
              autoCapitalize="none"
              keyboardType="number-pad"
              placeholder="Matricula"
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => setMatricula(data)}
            />
            <FormMaskInput
              icon="call"
              type={"cel-phone"}
              value={telefone}
              options={{
                maskType: "BRL",
                withDDD: true,
                dddMask: "(99) ",
              }}
              placeholder="Telefone"
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => setTelefone(data)}
            />
            <FormMaskInput
              icon="map"
              icon4="map-search"
              iconPress={attCEP}
              type={"zip-code"}
              value={CEP}
              placeholder="CEP"
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => setCEP(data)}
            />
            <FormInput
              icon="home"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Rua"
              value={rua}
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => setRua(data)}
            />
            <FormInput
              icon3="numeric-1-box-multiple-outline"
              autoCorrect={false}
              value={numero}
              autoCapitalize="none"
              keyboardType="number-pad"
              placeholder="Número"
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => setNumero(data)}
            />
            <FormInput
              icon3="home-city"
              autoCorrect={false}
              value={complemento}
              autoCapitalize="none"
              placeholder="Complemento"
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => setComplento(data)}
            />
            <FormInput
              icon3="city-variant"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Bairro"
              value = {bairro}
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => setBairro(data)}
            />
            <FormInput
              icon3="city-variant-outline"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Cidade"
              value = {cidade}
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => setCidade(data)}
            />         
            <FormInput
              icon="public"
              autoCorrect={false}
              placeholder="UF"
              value={UF}
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => setUF(data)}
              autoCapitalize="characters"
              maxLength={2}
            />
        </Form>
        <SignLink>
          <SubmitButton
            onPress={confirmEdit}>Confirmar
          </SubmitButton>
        </SignLink>    
      </Container> 
      </ScrollView>
    );
    }
  }
}
