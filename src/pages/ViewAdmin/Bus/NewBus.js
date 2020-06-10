import React from 'react';
import {StyleSheet, ScrollView, View, StatusBar, Alert} from 'react-native';
import {Button, Text, CheckBox} from 'native-base';

import {
    Container,
    Form,
    FormInput,
  } from './styles';

export class NewBus extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      placa: '',
      linha: '',
      num_vagas: '',
      disponibilidade: false,

      nome: '',
 
      checkbox: false,
      checkbox2: false,
    }
  }
  CadastrarOnibus = () => {

    if (this.state.placa == '' || this.state.linha == '' || this.state.num_vagas == '' || this.state.nome == ''){
      Alert.alert('Campos em branco, verifique novamente!');
    } else{
        fetch('http://mybus.projetoscomputacao.com.br/inserBus_api.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
    
            placa: this.state.placa,
            linha: this.state.linha,
            num_vagas: this.state.num_vagas,
            disponibilidade: this.state.disponibilidade,
            
            nome: this.state.nome,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
    
            if (responseJson=='Ônibus cadastrado!'){
              Alert.alert(responseJson);
              this.props.navigation.goBack();}
            else{Alert.alert(responseJson);}
            // Showing response message coming from server after inserting records.
            
          })
          .catch((error) => {
            Alert.alert('Erro na conexão', 'Verifique sua internet!');
          });
    }
  }
  
  toggleSwitch() {
    this.setState({
      checkbox: true,
      checkbox2: false,
      disponibilidade: true,
    });
  }

  toggleSwitch2() {
    this.setState({
      checkbox: false,
      checkbox2: true,
      disponibilidade: false,
    });
  }

  render (){
      return (
            <ScrollView animated='false'style={styles.scrollView}>
            <StatusBar backgroundColor="#283593" barStyle="light-content"/>
            <Container>
              <Form>
                <Text style={{margin: 5, paddingTop: 10}}>Placa: </Text>
                <FormInput
                  autoCorrect={true}
                  autoCapitalize="sentences"
                  placeholder="* Placa"
                  onChangeText={(data) => this.setState({placa: data})}
                />
                
                <Text style={{margin: 5, paddingTop: 10}}>Linha: </Text>
                <FormInput
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  placeholder="* Linha"
                  onChangeText={(data) => this.setState({linha: data})}
                />

                <Text style={{margin: 5, paddingTop: 10}}>Número de vagas: </Text>
                <FormInput
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  placeholder="* Número de Vagas"
                  onChangeText={(data) => this.setState({num_vagas: data})}
                />

                <Text style={{margin: 5, paddingTop: 10}}>Motorista: </Text>
                <FormInput
                  autoCorrect={true}
                  autoCapitalize="sentences"
                  placeholder="* Motorista"
                  onChangeText={(data) => this.setState({nome: data})}
                />
                
                <Text style={{margin: 5, paddingTop: 10}}>Disponibilidade: </Text>
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
              </Form>
            
                <Button style={styles.button}
                  onPress={this.CadastrarOnibus}
                  title="Entrar"><Text style={styles.textButton}>Confirmar</Text>
                </Button>

                <Text style={{marginTop:10, fontSize: 13, marginBottom: 10, color:'#f00'}}>* Campos obrigatórios</Text>
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
    width: 200,
    borderRadius: 10,
    marginTop: 40,
    justifyContent: 'center',
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
  },
  checkboxStyle:{
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: 10,
      alignItems: 'center',
      flexDirection: 'row',
      height: 46,
  },
  text:{
    fontSize: 15,
    color: 'rgba(0,0,255,0.3)',
    marginLeft: 25,
  }
});