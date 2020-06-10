/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, ScrollView, Alert, View, StatusBar, TextInput} from 'react-native';
import {Button, Text, Right} from 'native-base';
import {Icon} from 'react-native-elements';

import {
  Container,
  Form,
} from './styles';

export class MudarSenha extends React.Component {
  constructor (props){
    super(props);
    this.state = {
        id_usuario: '',
        senha:'',
        confirmarsenha:'',
        
        verificar: true,
        verificar2: true,
        icon: 'visibility',
        icon2: 'visibility',
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

  componentDidMount() {
    this.setState({
      id_usuario: this.props.navigation.state.params.id_usuario,
    });
  }

  UpdateSenha = () => {
    if (this.state.senha == '' || this.state.confirmarsenha == ''){
          Alert.alert('Dados em branco, tente novamente!');
    }
    else if (this.state.senha != this.state.confirmarsenha){
      Alert.alert('Senhas diferentes!')
    }
    else {
      fetch('http://mybus.projetoscomputacao.com.br/updateSenha_api.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      id_usuario: this.state.id_usuario,
      senha: this.state.senha,
    })

    }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson=='Senha atualizada!'){
            Alert.alert(responseJson);
            this.props.navigation.navigate('SignIn');}
          else{Alert.alert(responseJson);}

        }).catch((error) => {
          Alert.alert('Erro na conexão', 'Verifique sua internet!');
        });
    }
  }

  render (){
    return (
      <ScrollView animated='false'style={styles.scrollView}>
      <StatusBar backgroundColor="#283593" barStyle="light-content"/>
        <Container>
          <Form>
            <Text style={{margin: 5, paddingTop: 5}}>Senha: </Text>
            <View style={styles.campoStyle}>
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
            <Button style={styles.button}
              onPress={this.UpdateSenha}
              title="Entrar"><Text style={styles.textButton}>Confirmar</Text>
            </Button>
          </Form>
        </Container>
      </ScrollView>
    );
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

