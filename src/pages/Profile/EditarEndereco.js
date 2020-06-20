/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, ScrollView, Alert, View, StatusBar, TextInput, Linking} from 'react-native';
import {Button, Text, Right, CheckBox} from 'native-base';
import { TextInputMask } from "react-native-masked-text";
import {Icon} from 'react-native-elements';

import {
  Container,
  Form,
  FormInput,
} from './styles';

export class EditarEndereco extends React.Component {
  constructor (props){
    super(props);
    this.state = {
        id_usuario: '',
        id_endereco: '',

        cep:'',
        rua:'',
        numero:'',
        complemento:'',
        bairro:'',
        cidade:'',
        uf:'',
    }
  }

  componentDidMount() {
    this.setState({
      id_usuario: this.props.navigation.state.params.id_usuario,
      id_endereco: this.props.navigation.state.params.id_end,

      cep:this.props.navigation.state.params.cep,
      rua:this.props.navigation.state.params.rua,
      numero:this.props.navigation.state.params.numero,
      complemento:this.props.navigation.state.params.complemento,
      bairro:this.props.navigation.state.params.bairro,
      cidade:this.props.navigation.state.params.cidade,
      uf:this.props.navigation.state.params.uf,
    });
  }

  UpdateEndereco = () => {
    if (this.state.rua == '' || this.state.bairro == '' || this.state.cep == '' || this.state.cidade == '' ||
        this.state.numero == '' || this.state.uf == ''){
          Alert.alert('Dados em branco, tente novamente!');
    } else {
      fetch('http://mybus.projetoscomputacao.com.br/updateEnd_api.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      id_usuario: this.state.id_usuario,
      id_endereco: this.state.id_endereco,
      numero: this.state.numero,
      complemento: this.state.complemento,

      cep: this.state.cep,
      rua: this.state.rua,
      bairro: this.state.bairro,
      cidade: this.state.cidade,
      uf: this.state.uf,
    })

    }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson=='Endereço atualizado!'){
            Alert.alert(responseJson);
            this.props.navigation.goBack();}
          else{Alert.alert(responseJson);}

        }).catch((error) => {
          Alert.alert('Erro na conexão', 'Verifique sua internet!');
        });
    }
  }

  atualizaCEP = () => {
    this.setState({
      cep: this.state.cep,
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

  render (){
    return (
      <ScrollView animated='false'style={styles.scrollView}>
      <StatusBar backgroundColor="#283593" barStyle="light-content"/>
        <Container>
          <Form>
              <Text style={{margin: 5, paddingTop: 5}}>CEP: </Text>
              <View style={styles.campoStyle}>
                <TextInputMask
                  style={styles.text}
                  type={"zip-code"}
                  value={this.state.cep}
                  placeholder="CEP"
                  placeholderTextColor='rgba(0,0,255,0.4)'
                  onChangeText={(data) => this.setState({cep: data})}
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
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Rua"
              value={this.state.rua}
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => this.setState({rua: data})}
            />

            <Text style={{margin: 5, paddingTop: 5}}>Número: </Text>
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="number-pad"
              value={this.state.numero}
              placeholder="Número"
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => this.setState({numero: data})}
            />

            <Text style={{margin: 5, paddingTop: 5}}>Complemento: </Text>
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              value={this.state.complemento}
              placeholder="Complemento"
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => this.setState({complemento: data})}
            />

            <Text style={{margin: 5, paddingTop: 5}}>Bairro: </Text>
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Bairro"
              value = {this.state.bairro}
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => this.setState({bairro: data})}
            />

            <Text style={{margin: 5, paddingTop: 5}}>Cidade: </Text>
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Cidade"
              value={this.state.cidade}
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => this.setState({cidade: data})}
            />
            
            <Text style={{margin: 5, paddingTop: 5}}>UF: </Text>
            <FormInput
              autoCorrect={false}
              placeholder="UF"
              value={this.state.uf}
              placeholderTextColor='rgba(0,0,255,0.4)'
              onChangeText={(data) => this.setState({uf: data})}
              autoCapitalize="characters"
              maxLength={2}
            />   

            <Button style={styles.button}
              onPress={this.UpdateEndereco}
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

