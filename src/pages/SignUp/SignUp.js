/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, ScrollView, Alert, View, Text, StatusBar, Linking} from 'react-native';
import {CheckBox, Picker} from 'native-base';

import {
  BoxView,
  Container,
  Form,
  FormInput,
  FormMaskInput,
  PickerContainer,
  PickerIcon,
  SignLink,
  SignLinkText,
  SubmitButton,
  TextCheck,
  TextCheckLink,
} from './styles';

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 0,
  }
});

export default function SignUp ({navigation}){
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmasenha, setConfirmaSenha] = useState('');
  const [matricula, setMatricula] = useState('');
  const [dataSource, setdataSource] = useState([]);
  const [idInst, setIDInst] = useState(0);
  const [telefone, setTelefone] = useState('');
  const [numero, setNumero] = useState(0);
  const [complemento, setComplento] = useState('');
  const [CEP, setCEP] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [UF, setUF] = useState('');

  const [erro, setErro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verificar, setVerificar] = useState(true);
  const [verificar2, setVerificar2] = useState(true);
  const [icon, setIcon] = useState('visibility-off');
  const [icon2, setIcon2] = useState('visibility-off');
  const [checkbox, setCheckbox] = useState(false);
  const [textAlerta, setTextAlerta] = useState('');
  const [heightAlert, setHeightAlert] = useState(0);

  useEffect(() => {
    fetch("http://192.168.100.6/pickerInst_api.php")
    //http://ebus.projetoscomputacao.com.br/pickerInst_api.php
    .then((response) => response.json())
    .then((responseJson) => {
      setdataSource(responseJson);
    })
    .catch((error) => {
      Alert.alert('Erro na conexão!', 'Tente novamente!');
    });
    setLoading(false);
  },[]);

  function toggleCheck(){
    if (checkbox === false){
      setCheckbox(true);
    } else setCheckbox(false);
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

  function newUser (){
    if (nome === '' || cidade === '' || bairro === '' || CEP === '' || rua === '' || numero === ''){
      Alert.alert('Campos em branco!', 'Verifique seus dados e tente novamente!');
    } else if (matricula === ''){
      Alert.alert('Matrícula em branco!', 'Verifique o campo de matrícula!');
    } else if (email === ''){
      Alert.alert('E-mail em branco!', 'Verifique o campo de e-mail!');
    } else if (senha === ''){
      Alert.alert('Senha em branco!', 'Verifique o campo de senha!');
    } else if (confirmasenha != senha) {
      Alert.alert('Senhas diferentes!', 'Verifique os campos de senha!');
    } else if (checkbox === false){
      setHeightAlert(45);
      setTextAlerta('É necessário concordar com a Política de Privacidade.');
    } else {
      fetch('http://192.168.100.6/insertUsuario_api.php', {
        //http://ebus.projetoscomputacao.com.br/insertUsuario_api.php
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        }, body: JSON.stringify({
          email: email,
          senha: senha,
          matricula: matricula,
          nome: nome,
          fk_instituicao: idInst,
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
          if(responseJson === 'Usuário cadastrado!'){
            Alert.alert(responseJson);
            navigation.navigate('SignIn');
          } else {
            Alert.alert(responseJson);
          }
        }).catch((error) => {
          Alert.alert('Erro na conexão', 'Verifique sua internet!');
          setLoading(false);
        })
    }
  }

  if (loading === true){
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#283593" />
      </View>
    );
  } else {
    return (
      <ScrollView animated='false'style={styles.scrollView}>
      <StatusBar backgroundColor="#283593" barStyle="light-content"/>
      <Container> 
        <Form>
          <FormInput
            icon="person"
            autoCorrect={true}
            autoCapitalize="sentences"
            placeholder="Nome"
            placeholderTextColor='rgba(0,0,255,0.2)'
            onChangeText={(data) => setNome(data)}
          />
          <FormInput
            icon="mail-outline"
            autoCapitalize="none"
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
          <PickerContainer>
            <PickerIcon name="school" size={20} color="rgba(0,0,255,0.6)"/>
            <Picker
              style={{color:"rgba(0,0,255,0.6)", marginLeft: 5}}
              selectedValue={idInst}
              onValueChange={(itemvalue) => setIDInst(itemvalue)}
            >
              {dataSource.map((item, key) => (
              <Picker.Item label={item.nome_instituicao} value={item.id_instituicao} key={key}/>))}
            </Picker>
          </PickerContainer>
          <FormInput
            icon="computer"
            autoCorrect={false}
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
            type={"custom"}
            keyboardType="number-pad"
            placeholder="Número"
            placeholderTextColor="rgba(0,0,255,0.4)"
            onChangeText={(data) => setNumero(data)}
          />
          <FormInput
            icon3="home-city"
            autoCorrect={false}
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
            autoCapitalize="characters"
            placeholder="UF"
            value={UF}
            placeholderTextColor='rgba(0,0,255,0.4)'
            onChangeText={(data) => setUF(data)}
            autoCapitalize="characters"
            maxLength={2}
          />
        </Form>
        <BoxView>
          <CheckBox
            color="#283593"
            checked={checkbox}
            onPress={toggleCheck}
          />
          <TextCheck>Concordo com a </TextCheck>
            <TextCheckLink
              onPress={() => {Linking.openURL('http://ebus.projetoscomputacao.com.br/#politica')}}>
              Política de Privacidade
            </TextCheckLink>
        </BoxView>
        <View 
          style={{alignItems: 'center',justifyContent:'center', marginBottom: 5,height:(heightAlert)}}>  
          <Text style={{color: '#ff0000',fontSize: 15}} 
        >{textAlerta}</Text>
        </View>        
        <SignLink>
          <SubmitButton
            onPress={newUser}>Confirmar
          </SubmitButton>
          <SignLinkText
            onPress={() => navigation.goBack()}>
            Já sou cadastrado
          </SignLinkText>
        </SignLink>
      </Container>
      </ScrollView>
    );
  }

  
}
