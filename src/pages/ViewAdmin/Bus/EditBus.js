import React from 'react';
import {StyleSheet, ScrollView, View, StatusBar, Alert} from 'react-native';
import {Button, Text, CheckBox} from 'native-base';


import { Container, Form, FormInput } from "./styles";

export class EditBus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      placa: '',
      linha: '',
      num_vagas: '',
      nome: '',
      disponibilidade: false,

      text_linha: '',
      text_num_vagas: '',
      text_nome: '',

      checkbox: false,
      checkbox2: false,
    }
  }
  
  componentDidMount(){
    if (this.props.navigation.state.params.disponivel == false){
        this.setState({
          placa: this.props.navigation.state.params.placa,
          text_linha: this.props.navigation.state.params.linha,
          text_num_vagas: this.props.navigation.state.params.num_vagas,
          text_nome: this.props.navigation.state.params.motorista,
          checkbox: false,
          checkbox2: true,
        })
    } else {
        this.setState({ 
          placa: this.props.navigation.state.params.placa,
          text_linha: this.props.navigation.state.params.linha,
          text_num_vagas: this.props.navigation.state.params.num_vagas,
          text_nome: this.props.navigation.state.params.motorista,
          checkbox: true,
          checkbox2: false
        })
    }
  }

  toggleSwitch() {
    this.setState({
      checkbox: true,
      checkbox2: false,
      text_disponibilidade: true,
    });
  }

  toggleSwitch2() {
    this.setState({
      checkbox: false,
      checkbox2: true,
      text_disponibilidade: false,
    });
  }

  UpdateOnibus = () => {
    if (this.state.linha == '' || this.state.num_vagas == '' || this.state.motorista == ''){
      Alert.alert('Dados em branco, tente novamente!');
    } else {
      fetch('http://mybus.projetoscomputacao.com.br/updateBus_api.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      placa: this.state.placa,
      linha: this.state.linha,
      num_vagas: this.state.num_vagas,
      disponibilidade: this.state.text_disponibilidade,
            
      nome: this.state.nome,

    })

    }).then((response) => response.json())
        .then((responseJson) => {

          if (responseJson=='Ônibus atualizado!'){
            Alert.alert(responseJson);
            this.props.navigation.navigate('Onibus');}
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
              <Text style={{margin: 5, marginTop: 20}}>Placa: </Text>
              <View style={styles.campoStyle}>  
                  <Text style={styles.text}>{this.state.placa}</Text>
                </View>
                
                <Text style={{margin: 5}}>Linha: </Text>
                <FormInput
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  placeholder={this.state.text_linha}
                  onChangeText={(data) => this.setState({linha: data})}
                />

                <Text style={{margin: 5}}>Número de vagas: </Text>
                <FormInput
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  placeholder={this.state.text_num_vagas}
                  onChangeText={ (data) => this.setState({num_vagas: data})}
                />

                <Text style={{margin: 5}}>Motorista: </Text>
                <FormInput
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder={this.state.text_nome}
                  onChangeText={(data) => this.setState({nome: data})}
                />

                <Text style={{margin: 5}}>Disponibilidade: </Text>
                <View style={styles.checkboxStyle}>  
                  <CheckBox
                    style={{marginLeft: 10}}
                    color="rgba(0,0,255,0.3)"
                    checked={this.state.checkbox}
                    onPress={() => this.toggleSwitch()}
                  />

                  <Text style={styles.text}>Disponivel</Text>
                  <CheckBox
                    color="rgba(0,0,255,0.3)"
                    checked={this.state.checkbox2}
                    onPress={() => this.toggleSwitch2()}
                  />
                  <Text style={styles.text}>Indisponivel</Text>
                </View>

                  <Button style={styles.button}
                    onPress={this.UpdateOnibus}
                    title="Entrar"><Text style={styles.textButton}>Confirmar</Text>
                  </Button>

              </Form>
              </Container>
          </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 0,
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
  checkboxStyle:{
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    height: 46,
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
  textSubmit:{
    marginTop: 10,
    marginBottom: 15,
    justifyContent: 'center',
    color: '#283593',
    fontSize: 16,
    fontWeight: 'bold'
  }
});