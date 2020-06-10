import React from 'react';
import {StyleSheet, ScrollView, View, StatusBar, Alert} from 'react-native';
import {Button, Text} from 'native-base';
import {Icon} from 'react-native-elements';

import {
    Container,
    Form,
  } from './styles';

export class InfoBus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          placa: '',
          nome: '',

          text_placa: '',
          text_linha: '',
          text_num_vagas: '',
          text_motorista: '',
          text_disponivel: false,
          text_disponibilidade: '',
        }
    }

    DeletarOnibus = () => {
            fetch('http://mybus.projetoscomputacao.com.br/deleteBus_api.php', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
        
                placa: this.state.text_placa,
                nome: this.state.text_motorista,
              }),
            })
              .then((response) => response.json())
              .then((responseJson) => {
        
                if (responseJson=='Ônibus deletado!'){
                  Alert.alert(responseJson);
                  this.props.navigation.goBack();}
                else{Alert.alert(responseJson);}
                // Showing response message coming from server after inserting records.
                
              })
              .catch((error) => {
                Alert.alert('Erro na conexão', 'Verifique sua internet!');
        });
    }

    componentDidMount(){
        if (this.props.navigation.state.params.disponivel == false){
            this.setState({ 
                text_placa: this.props.navigation.state.params.placa,
                text_linha: this.props.navigation.state.params.linha,
                text_num_vagas: this.props.navigation.state.params.num_vagas,
                text_motorista: this.props.navigation.state.params.motorista,
                text_disponivel: this.props.navigation.state.params.disponivel,
                text_disponibilidade: 'Indisponível',  
            })
        } else {
            this.setState({ 
                text_placa: this.props.navigation.state.params.placa,
                text_linha: this.props.navigation.state.params.linha,
                text_num_vagas: this.props.navigation.state.params.num_vagas,
                text_motorista: this.props.navigation.state.params.motorista,
                text_disponivel: this.props.navigation.state.params.disponivel,
                text_disponibilidade: 'Disponível',  
            })
        }
    }

    render (){
      return (
            <ScrollView animated='false'style={styles.scrollView}>
            <StatusBar backgroundColor="#283593" barStyle="light-content"/>
            <Container>
              <Form>
              <Text style={{margin: 5, marginTop: 20}}>Placa: </Text>
                <View style={styles.campoStyle}>  
                  <Text style={styles.text}>{this.state.text_placa}</Text>
                </View>
                
                <Text style={{margin: 5}}>Linha: </Text>
                <View style={styles.campoStyle}>  
                  <Text style={styles.text}>{this.state.text_linha}</Text>
                </View>

                <Text style={{margin: 5}}>Número de vagas: </Text>
                <View style={styles.campoStyle}>  
                  <Text style={styles.text}>{this.state.text_num_vagas}</Text>
                </View>

                <Text style={{margin: 5}}>Motorista: </Text>
                <View style={styles.campoStyle}>  
                  <Text style={styles.text}>{this.state.text_motorista}</Text>
                </View>
                
                <Text style={{margin: 5}}>Disponibilidade: </Text>
                <View style={styles.campoStyle}>  
                  <Text style={styles.text}>{this.state.text_disponibilidade}</Text>
                </View>
              </Form>
                <View style={styles.viewbutton}>
                    <Button style={styles.button} onPress={() => {this.props.navigation.navigate('EditOnibus',{placa: this.state.text_placa, linha: this.state.text_linha, num_vagas: this.state.text_num_vagas, motorista: this.state.text_motorista, disponivel: this.state.text_disponivel})}} >
                        <Icon name="create" color="#fff"/>
                        <Text style={styles.textButton}>Editar</Text>
                    </Button>
                    <Button style={styles.button} onPress = {this.DeletarOnibus} >
                        <Icon name="delete" color="#fff"/>
                        <Text style={styles.textButton}>Deletar</Text>
                    </Button>
                </View>

              </Container>
          </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 0,
  },
  button: {
    height: 40,
    width: 120,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    margin: 5,
    justifyContent: 'center',
    backgroundColor:'#283593',
  },
  textButton:{
    color:'#fff',
    textTransform:'capitalize',
    fontSize:16,
  },
  campoStyle:{
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: 10,
      alignItems: 'center',
      flexDirection: 'row',
      height: 46,
  },
  text:{
    fontSize: 15,
    color: 'rgba(0,0,255,0.6)',
    marginLeft: 25,
  },
  viewbutton:{
    alignItems: 'center',
    flexDirection: 'row',
},
});