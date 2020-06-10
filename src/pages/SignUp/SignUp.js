/* eslint-disable prettier/prettier */
import React from 'react';
import {ActivityIndicator, StyleSheet, ScrollView, Alert, View, StatusBar, TextInput, Linking} from 'react-native';
import {Button, Text, Right, CheckBox} from 'native-base';
import * as Font from 'expo-font';
import { TextInputMask } from "react-native-masked-text";
import {Icon} from 'react-native-elements';

import {
  Container,
  Form,
  FormInput,
} from './styles';

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      matricula: '',
      nome: '',
      telefone: '',
      numero: '',
      complemento: '',
      confirmarsenha: '',
      
      inputCEP: '',
      cep: '',
      rua: '',
      bairro: '',
      cidade: '',
      uf: '',
      erro: false,

      loading: true,
      verificar: true,
      verificar2: true,
      icon: 'visibility',
      icon2: 'visibility',

      checkbox: false,
      textalerta: '',
      heightAlert:10,
    };
  }

  toggleSwitch() {
    if (this.state.checkbox == false){
      this.setState({
            checkbox: true,
          });
    } else {
      this.setState({
        checkbox: false,
      });
    }
  }

  atualizarValor = () => {
    if (this.state.verificar == true){
      this.setState({
        verificar: false,
        icon:'visibility-off',
      });
    } else {
      this.setState({
        verificar: true,
        icon:'visibility',
      });
    }
  }

  atualizarValor2 = () => {
    if (this.state.verificar2 == true){
      this.setState({
        verificar2: false,
        icon2:'visibility-off',
      });
    } else {
      this.setState({
        verificar2: true,
        icon2:'visibility',
      });
    }
  }

  atualizaCEP = () => {
    this.setState({
      cep: this.state.inputCEP,
    }, () =>{
      if (this.state.cep === ''){
        Alert.alert('CEP em branco!');
      } else {
      fetch('https://viacep.com.br/ws/' + this.state.cep + '/json/')
      .then((response) => response.json())
      .then(resultado => {
        this.setState({
          rua: resultado.logradouro,
          bairro: resultado.bairro,
          cidade: resultado.localidade,
          uf: resultado.uf,
          erro: resultado.erro,
        }); if(this.state.erro == true){
          Alert.alert(
            'CEP inválido','Tente novamente!',
            [
              {
                text: "Não sei meu CEP", onPress: () => Linking.openURL('http://www.buscacep.correios.com.br/sistemas/buscacep/'),
              },
              { text: "Ok"}
            ],
            { cancelable: false }
          );

          this.setState({erro:false});
        }
      }).catch((error) => {
        Alert.alert('Tente novamente!');
        this.setState({ loading: false });
      });
    }}
    );
  }

  CadastrarUsuario = () => {
    if (this.state.nome == '' || this.state.cidade == '' || this.state.bairro == '', this.state.cep == '' ||
      this.state.rua == '' || this.state.numero == ''){
      Alert.alert('Campos em branco, verifique novamente!');
    } else if (this.state.matricula == ''){
      Alert.alert('Matrícula em branco, verifique novamente!');
    } else if (this.state.email == '') {
      Alert.alert('E-mail em branco, verifique novamente!');
    } else if (this.state.senha == ''){
      Alert.alert('Senha em branco, verifique novamente!');
    } else if (this.state.confirmarsenha != this.state.senha) {
      Alert.alert('Senhas diferentes, verifique novamente!');
    } else if (this.state.checkbox == false){
      this.setState({heightAlert:45, textalerta:'É necessário concordar com a Política de Privacidade.'})
    } 
    else{
      fetch('http://mybus.projetoscomputacao.com.br/inserirUsuario_api.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        email: this.state.email,
        senha: this.state.senha,
        matricula: this.state.matricula,
        nome: this.state.nome,
        telefone: this.state.telefone,
        numero: this.state.numero,
        complemento: this.state.complemento,
        
        cep: this.state.cep,
        rua: this.state.rua,
        bairro: this.state.bairro,
        cidade: this.state.cidade,
        uf: this.state.uf,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {

        if (responseJson=='Usuário cadastrado!'){
          Alert.alert(responseJson);
          this.props.navigation.navigate('SignIn');}
        else{Alert.alert(responseJson);}
        // Showing response message coming from server after inserting records.
        
      })
      .catch((error) => {
        Alert.alert('Erro na conexão', 'Verifique sua internet!');
        this.setState({ loading: false });
      });
    }
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ loading: false });
  }
  
  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size="large" color="#283593" /></View>
      );
    }else {
    return (
      <ScrollView animated='false'style={styles.scrollView}>
        <StatusBar backgroundColor="#283593" barStyle="light-content"/>
        <Container>
          <Form>
          <Text style={{margin: 5, paddingTop: 5}}>Nome: </Text>
            <FormInput
              icon="person"
              autoCorrect={true}
              autoCapitalize="sentences"
              placeholder="Nome"
              placeholderTextColor='rgba(0,0,255,0.2)'
              onChangeText={(data) => this.setState({nome: data})}
            />
            <Text style={{margin: 5, paddingTop: 5}}>E-mail: </Text>
            <FormInput
              icon="mail-outline"
              autoCapitalize="none"
              keyboardType="email-address"
              autoCompleteType="email"
              placeholder="E-mail"
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => this.setState({email: data})}
            />
            <Text style={{margin: 5, paddingTop: 5}}>Senha: </Text>
            <View style={styles.campoStyle}>
              <Icon  
                style={{marginLeft: 15}} 
                size={20} 
                name= "lock-outline" 
                color='rgba(0,0,255,0.6)'/>
              <TextInput style={styles.text}  
                placeholder="Senha"  
                secureTextEntry = {this.state.verificar}
                placeholderTextColor='rgba(0,0,255,0.4)'
                onChangeText={(data) => this.setState({senha: data})}
              />
              <Right style={{marginEnd: 15}}>
                <Icon 
                  name= {this.state.icon} 
                  size={20} 
                  color='rgba(0,0,255,0.6)'
                  onPress={this.atualizarValor}/>
              </Right>
            </View>

            <Text style={{margin: 5, paddingTop: 5}}>Confirmar senha: </Text>
            <View style={styles.campoStyle}>
              <Icon  
                style={{marginLeft: 15}} 
                size={20} 
                name= "lock-outline" 
                color='rgba(0,0,255,0.6)'/>
              <TextInput style={styles.text}  
                secureTextEntry = {this.state.verificar2}
                placeholder="Confirmar Senha"
                placeholderTextColor='rgba(0,0,255,0.4)'
                onChangeText={(data) => this.setState({confirmarsenha: data})}
              />
              <Right style={{marginEnd: 15}}>
                <Icon 
                  name= {this.state.icon2} 
                  size={20} 
                  color='rgba(0,0,255,0.6)'
                  onPress={this.atualizarValor2}/>
              </Right>
            </View>
            
            <Text style={{margin: 5, paddingTop: 5}}>Matrícula: </Text>
            <FormInput
              icon="computer"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="number-pad"
              placeholder="Matricula"
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => this.setState({matricula: data})}
            />

            <Text style={{margin: 5, paddingTop: 5}}>Instituição: </Text>
            <FormInput
              icon="school"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Instituição"
              placeholderTextColor='rgba(0,0,255,0.4)'
            />

            <Text style={{margin: 5, paddingTop: 5}}>Telefone: </Text>
            <View style={styles.campoStyle}>
                <Icon  
                style={{marginLeft: 15}} 
                size={20} 
                name= "call" 
                color='rgba(0,0,255,0.6)'/>
                <TextInputMask
                  style={styles.text}
                  type={"cel-phone"}
                  value={this.state.telefone}
                  options={{
                    maskType: "BRL",
                    withDDD: true,
                    dddMask: "(99) ",
                  }}
                  placeholder="Telefone"
                  placeholderTextColor='rgba(0,0,255,0.4)'
                  onChangeText={(data) => this.setState({telefone: data})}
                />
              </View>
                  
              <Text style={{margin: 5, paddingTop: 5}}>CEP: </Text>
              <View style={styles.campoStyle}>
              <Icon  
                style={{marginLeft: 15}} 
                size={20} 
                name= "map" 
                color='rgba(0,0,255,0.6)'/>
                <TextInputMask
                  style={styles.text}
                  type={"zip-code"}
                  value={this.state.inputCEP}
                  placeholder="CEP"
                  placeholderTextColor='rgba(0,0,255,0.4)'
                  onChangeText={(data) => this.setState({inputCEP: data})}
                />
                <Right style={{marginEnd: 15}}>
                <Icon  
                  size={22} 
                  name= "search" 
                  color='rgba(0,0,255,0.6)'
                  onPress={this.atualizaCEP}/>
              </Right>
              </View>
            
            <Text style={{margin: 5, paddingTop: 5}}>Rua: </Text>
            <FormInput
              icon="home"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Rua"
              value={this.state.rua}
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => this.setState({rua: data})}
            />

            <Text style={{margin: 5, paddingTop: 5}}>Número: </Text>
            <FormInput
              icon="room"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="number-pad"
              placeholder="Número"
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => this.setState({numero: data})}
            />

            <Text style={{margin: 5, paddingTop: 5}}>Complemento: </Text>
            <FormInput
              icon="pageview"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Complemento"
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => this.setState({complemento: data})}
            />

            <Text style={{margin: 5, paddingTop: 5}}>Bairro: </Text>
            <FormInput
              icon="location-city"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Bairro"
              value = {this.state.bairro}
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => this.setState({bairro: data})}
            />

            <Text style={{margin: 5, paddingTop: 5}}>Cidade: </Text>
            <FormInput
              icon="public"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Cidade"
              value={this.state.cidade}
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => this.setState({cidade: data})}
            />
            
            <Text style={{margin: 5, paddingTop: 5}}>UF: </Text>
            <FormInput
              icon="terrain"
              autoCorrect={false}
              placeholder="UF"
              value={this.state.uf}
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => this.setState({uf: data})}
              autoCapitalize="characters"
              maxLength={2}
            />

            <View style={styles.checkboxStyle}>  
              <CheckBox
                color="#283593"
                checked={this.state.checkbox}
                onPress={() => this.toggleSwitch()}
              />
              <Text style={styles.textCheck}>Concordo com a </Text>
              <Text style={{color: '#283593',fontSize: 15, fontWeight: 'bold'}} 
                  onPress={() => {Linking.openURL('http://mybus.projetoscomputacao.com.br/#politica')}}
              >Política de Privacidade</Text>
            </View>
            <View 
              style={{alignItems: 'center',flexDirection: 'row', marginLeft: 10,height:(this.state.heightAlert)}}>  
              <Text style={{color: '#ff0000',fontSize: 15}} 
              >{this.state.textalerta}</Text>
            </View>        

            <Button style={styles.button}
              onPress={this.CadastrarUsuario}
              title="Entrar"><Text style={styles.textButton}>Confirmar</Text>
            </Button>
          </Form>
          <Text style={styles.textSubmit}
              onPress={() => this.props.navigation.goBack()}>
              Já sou cadastrado
            </Text>
          </Container>
      </ScrollView>
    );
  }
  }
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 0,
  },
  PickerInput:{
    marginBottom: 10,
  },
  button: {
    height: 40,
    borderRadius: 10,
    marginLeft: 60,
    marginRight: 60,
    marginTop: 10,
    justifyContent:'center',
    backgroundColor:'#283593',
  },
  textButton:{
    color:'#fff',
    textTransform:'capitalize',
    fontSize:16,
  },
  checkboxStyle:{
    alignItems: 'center',
    flexDirection: 'row',
    height: 35,
    marginTop: 15,
  },
  textSubmit:{
    marginTop: 10,
    marginBottom: 15,
    justifyContent: 'center',
    color: '#283593',
    fontSize: 16,
    fontWeight: 'bold'
  },
  textCheck:{
    marginLeft: 15,
    color: '#283593',
    fontSize: 15,
  },
  campoStyle:{
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    height: 46,
  },
  text:{
    fontSize: 16,
    color: 'rgba(0,0,255,0.6)',
    marginLeft: 10,
    flex: 1,
  },
  
});