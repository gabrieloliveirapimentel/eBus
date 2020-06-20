/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, ScrollView, Alert, View, StatusBar} from 'react-native';
import {Button, Text} from 'native-base';
import { TextInputMask } from "react-native-masked-text";

import {
  Container,
  Form,
  FormInput,
} from './styles';

export class EditarDados extends React.Component {
  constructor (props){
    super(props);
    this.state = {
        id_usuario: '',
        email:'',
        nome:'',
        matricula:'',
        telefone:'',

        admin: '',
        colab: '',
    }
  }

  componentDidMount() {
    this.setState({
      id_usuario: this.props.navigation.state.params.id_usuario,
      nome: this.props.navigation.state.params.nome,
      email:this.props.navigation.state.params.email,
      matricula:this.props.navigation.state.params.matricula,
      telefone: this.props.navigation.state.params.telefone,

      admin: this.props.navigation.state.params.admin,
      colab: this.props.navigation.state.params.colab,
    });
  }

  UpdateDados = () => {
    if (this.state.email == '' || this.state.nome == '' || this.state.telefone == ''){
      Alert.alert('Dados em branco, tente novamente!');
    } else {
      fetch('http://mybus.projetoscomputacao.com.br/updateDados_api.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      id_usuario: this.state.id_usuario,
      nome: this.state.nome,
      email:this.state.email,
      matricula:this.state.matricula,
      telefone: this.state.telefone,
    })

    }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson=='Dados atualizados!'){
            Alert.alert(responseJson);
            this.props.navigation.goBack();}
          else{Alert.alert(responseJson);}

        }).catch((error) => {
          Alert.alert('Erro na conexão', 'Verifique sua internet!');
        });
    }
  }

  render (){
    if (this.state.admin == 1 || this.state.colab == 1){
      return (
        <ScrollView animated='false'style={styles.scrollView}>
        <StatusBar backgroundColor="#283593" barStyle="light-content"/>
        <Container>
          <Form>
          <Text style={{margin: 5, paddingTop: 5}}>Nome: </Text>
            <FormInput
              autoCorrect={true}
              autoCapitalize="sentences"
              value={this.state.nome}
              placeholder="Nome"
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => this.setState({nome: data})}
            />
            <Text style={{margin: 5, paddingTop: 5}}>E-mail: </Text>
            <FormInput
              autoCapitalize="none"
              keyboardType="email-address"
              value={this.state.email}
              autoCompleteType="email"
              placeholder="E-mail"
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => this.setState({email: data})}
            />

            <Text style={{margin: 5, paddingTop: 5}}>Telefone: </Text>
            <View style={styles.campoStyle}>
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
             

            <Button style={styles.button}
              onPress={this.UpdateDados}
              title="Entrar"><Text style={styles.textButton}>Confirmar</Text>
            </Button>
          </Form>
        </Container>
      </ScrollView>
      );
    }
    else{
      return (
        <ScrollView animated='false'style={styles.scrollView}>
        <StatusBar backgroundColor="#283593" barStyle="light-content"/>
        <Container>
          <Form>
          <Text style={{margin: 5, paddingTop: 5}}>Nome: </Text>
            <FormInput
              autoCorrect={true}
              autoCapitalize="sentences"
              value={this.state.nome}
              placeholder="Nome"
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => this.setState({nome: data})}
            />
            <Text style={{margin: 5, paddingTop: 5}}>E-mail: </Text>
            <FormInput
              autoCapitalize="none"
              keyboardType="email-address"
              value={this.state.email}
              autoCompleteType="email"
              placeholder="E-mail"
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => this.setState({email: data})}
            />
            
            <Text style={{margin: 5, paddingTop: 5}}>Matrícula: </Text>
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="number-pad"
              value={this.state.matricula}
              placeholder="Matricula"
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => this.setState({matricula: data})}
            />

            <Text style={{margin: 5, paddingTop: 5}}>Instituição: </Text>
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Instituição"
              placeholderTextColor='rgba(0,0,255,0.4)'
            />

            <Text style={{margin: 5, paddingTop: 5}}>Telefone: </Text>
            <View style={styles.campoStyle}>
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
             

            <Button style={styles.button}
              onPress={this.UpdateDados}
              title="Entrar"><Text style={styles.textButton}>Confirmar</Text>
            </Button>
          </Form>
        </Container>
      </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  textInfo:{
    margin: 5,
  },
  containerheader: {
    backgroundColor:"#283593",
    paddingTop: 10,
    height: 60,
    alignContent:'center'
    
  },
  text:{
    fontSize: 15,
    color: 'rgba(0,0,255,0.6)',
    marginLeft: 25,
  },
  campoStyle:{
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    height: 46,
  },
  textHeader: {
    color: '#fff',
    fontSize: 20,
    fontWeight:'bold',
  },
  campoDelete: {
    flexDirection: 'row', 
    alignItems:'center', 
    alignSelf:'center', 
    margin: 20
  },
  textDelete:{
    color: '#f00',
    fontWeight:'bold',
    fontSize:15,
  },
  button: {
    height: 40,
    borderRadius: 10,
    marginLeft: 60,
    marginRight: 60,
    marginTop: 20,
    marginBottom: 20,
    justifyContent:'center',
    backgroundColor:'#283593',
  },
  textButton:{
    color:'#fff',
    textTransform:'capitalize',
    fontSize:16,
  },
});

