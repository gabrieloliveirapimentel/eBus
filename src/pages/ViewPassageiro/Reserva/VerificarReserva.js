/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, StatusBar, Alert, Text} from 'react-native';

import {
  Container,
  Form,
  FormInput,
} from './styles';

export class VerificarReserva extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origem: '',
      destino:'',
      matricula:'',
      horario:'',
    };
  }

  componentDidMount() {
    this.setState({
      matricula: this.props.navigation.state.params.matricula,
      origem:this.props.navigation.state.params.origem,
      destino:this.props.navigation.state.params.destino,
      horario:this.props.navigation.state.params.horario,
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#283593" barStyle="light-content"/>
        <Container>
          <Form>
            <Text style={styles.textInfo}>Matrícula: </Text>
            <View style= {styles.campoStyle}>
              <Text style={styles.text}>{this.state.matricula}</Text>
            </View>
            <Text style={styles.textInfo}>Origem: </Text>
            <View style= {styles.campoStyle}>
              <Text style={styles.text}>{this.state.origem}</Text>
            </View>
            <Text style={styles.textInfo}>Destino: </Text>
            <View style= {styles.campoStyle}>
              <Text style={styles.text}>{this.state.destino}</Text>
            </View>
            <Text style={styles.textInfo}>Horário: </Text>
            <View style= {styles.campoStyle}>
              <Text style={styles.text}>{this.state.horario}</Text>
            </View>
            <Text style={styles.textInfo}>Status: </Text>
            <View style= {styles.campoStyle}>
              <Text style={styles.textStatus}>Reservado</Text>
            </View>
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
  textStatus:{
    fontSize: 15,
    color: '#008000',
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
