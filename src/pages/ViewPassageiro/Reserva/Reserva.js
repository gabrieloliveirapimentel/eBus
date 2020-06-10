/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, StatusBar, Alert, Text} from 'react-native';
import {Button, Header, Right, Body} from 'native-base';
import {Icon} from 'react-native-elements';
import { TextInputMask } from "react-native-masked-text";

import {
  Container,
  Form,
  FormInput,
} from './styles';

export class Reserva extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origem: '',
      destino:'',
      matricula:'',
      horario:'',

    };
  }

  //16:00:00 - 2020-06-09

  fazerReserva = () => {
    fetch("http://192.168.100.6/reserva_api.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        matricula: this.state.matricula,
        horario: this.state.horario,
        origem: this.state.origem,
        destino: this.state.destino,
        
        
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson== 'Matrícula inválida!'){
          Alert.alert('Matrícula inválida!', 'Verifique seus dados.');
        }
        else if (responseJson=='Viagem não encontrada, tente novamente!'){
          Alert.alert('Viagem não encontrada', 'tente novamente!');
        }
        else if (responseJson == 'Reserva feita com sucesso!'){
          this.props.navigation.navigate('VerificarReserva', {
            horario: this.state.horario,
            origem: this.state.origem,
            destino: this.state.destino});
          Alert.alert(responseJson);
        } else if(responseJson == 'Ônibus lotado, tente em outro horário!'){
          Alert.alert(responseJson);
        }
      })
      .catch((error) => {
        Alert.alert('Erro ao fazer a reserva!');
      });
      
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#283593" barStyle="light-content"/>
        <Header title="Menu" isHome={true} style={styles.containerheader}>
          <Body style={{paddingLeft: 20}}>
            <Text style={styles.textHeader}>Reserva</Text>
          </Body>
          <Right>
          </Right>  
        </Header>
      
        <Container>
          <Form>
            <Text style={styles.textInfo}>Matrícula: </Text>
            <FormInput 
              autoCorrect={true}
              autoCapitalize="words"
              placeholder = "Matrícula"
              onChangeText={(data) => this.setState({matricula: data})}
            />
            <Text style={styles.textInfo}>Origem: </Text>
            <FormInput 
              autoCorrect={true}
              autoCapitalize="words"
              placeholder = "Origem"
              onChangeText={(data) => this.setState({origem: data})}
            />

            <Text style={styles.textInfo}>Destino: </Text>
            <FormInput 
              autoCorrect={true}
              autoCapitalize="words"
              placeholder = "Destino"
              onChangeText={(data) => this.setState({destino: data})}
            />

            <Text style={styles.textInfo}>Horário: </Text>
            <View style={styles.campoStyle}>
              <TextInputMask
                style={styles.text}
                type={"datetime"}
                options={{format: "HH:mm"}}
                value={this.state.horario}
                placeholder="Horário"
                maxLength={5}
                placeholderTextColor="rgba(0,0,255,0.4)"
                onChangeText={(data) => {this.setState({horario: data})}}
              />
            </View>
            
            <Button style={styles.button} onPress={this.fazerReserva}>
             <Text style={styles.textButton}>Fazer Reserva</Text>
           </Button>
          </Form>
        </Container>
      </View>
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
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    justifyContent:'center',
    backgroundColor:'#283593',
  },
  textButton:{
    color:'#fff',
    textTransform:'capitalize',
    fontSize:16,
  },
});
