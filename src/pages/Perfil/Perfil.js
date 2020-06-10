/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Alert, StyleSheet, ScrollView, StatusBar, RefreshControl} from 'react-native';
import {Button, Text, Header, Body, Right} from 'native-base';
import {Icon} from 'react-native-elements';

export class Perfil extends React.Component {
  constructor (props){
    super(props);
    this.state = {
        id_usuario: '',
        email:'',
        nome:'',
        matricula:'',
        telefone:'',
        senha:'',

        admin: '',
        colab: '',

        id_end: '',
        cep:'',
        rua:'',
        numero:'',
        complemento:'',
        bairro:'',
        cidade:'',
        uf:'',

        fetching_Status: false,
    }
  }

  onRefresh = () => {
    this.setState({
      refreshing: true,
      fetching_Status: true,
    }, () => {this.componentDidMount();});
    this.setState({refreshing: false});
  }
  
  componentDidMount() {
    this.setState({
      fetching_Status: true,
      id_usuario: this.props.navigation.state.params.id_usuario,
    });
    
    return fetch('http://mybus.projetoscomputacao.com.br/meuPerfil_api.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_usuario: this.props.navigation.state.params.id_usuario,
        }),
      })
      .then((response) => response.json())
      .then((resultado) => {
        this.setState({
            nome: resultado.nome,
            email: resultado.email,
            matricula: resultado.matricula,
            telefone: resultado.telefone,
            senha: resultado.senha,

            admin: resultado.administrador,
            colab: resultado.colaborador,

            id_end: resultado.id_endereco,
            cep: resultado.cep,
            rua: resultado.rua,
            numero: resultado.numero,
            complemento: resultado.complemento,
            bairro: resultado.bairro,
            cidade: resultado.cidade,
            uf: resultado.uf,

            fetching_Status: true,
          })
        })
       .catch((error) => {
          Alert.alert('Erro na conexão!', 'Verifique sua internet');   
    });
  }

  render (){
      if (this.state.admin == 1 || this.state.colab == 1){
        return (
          <ScrollView animated='false'style={styles.scrollView} refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
            <Header title="Perfil" style={styles.containerheader}>
              <StatusBar backgroundColor="#283593" barStyle="light-content"/>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}>
                <Icon name= "arrow-back" color='#fff'/>
              </Button>
              <Body style={{paddingLeft: 20}}>
                <Text style={styles.textHeader}>Perfil</Text>
              </Body>
              <Right>
                <Button transparent onPress = { this.refreshPerfil} >
                <Icon name="refresh" color="#fff"/>
                </Button>
              </Right>
            </Header>
              <View style={{flex:1, margin: 10}}>
                  <View style={{flex:1, padding: 10}}>
                    <Text style={styles.textInfo}>Nome: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.nome}</Text>
                    </View>
  
                    <Text style={styles.textInfo}>E-mail: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.email}</Text>
                    </View>
  
                    <Text style={styles.textInfo}>Telefone: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.telefone}</Text>
                    </View>
  
                    <Text style={styles.textInfo}>CEP: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.cep}</Text>
                    </View>
  
                    <Text style={styles.textInfo}>Rua: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.rua}</Text>
                    </View>
  
                    <Text style={styles.textInfo}>Número: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.numero}</Text>
                    </View>
                    
                    <Text style={styles.textInfo}>Complemento: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.complemento}</Text>
                    </View>
  
                    <Text style={styles.textInfo}>Bairro: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.bairro}</Text>
                    </View>
                    
                    <Text style={styles.textInfo}>Cidade: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.cidade}</Text>
                    </View>
  
                    <Text style={styles.textInfo}>UF: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.uf}</Text>
                    </View>
  
                    <View style={{marginTop: 15, margin: 20}}>
                      <Button style={styles.button} onPress={
                        () => this.props.navigation.navigate('EditarDados',
                        {
                          id_usuario:this.state.id_usuario, 
                          nome: this.state.nome,
                          email:this.state.email,
                          matricula:this.state.matricula,
                          telefone: this.state.telefone,
                      
                          admin: this.state.admin,
                          colab: this.state.colab,
                      
                        })
                      }>
                          <Icon size={20} name= "person" color='#fff'/>
                          <Text style={styles.textButton}>Editar dados pessoais</Text>
                      </Button>

                      <Button style={styles.button} onPress={
                        () => this.props.navigation.navigate('EditarEndereco',
                        {
                          id_usuario: this.state.id_usuario,
                          id_end: this.state.id_end, 
                          cep: this.state.cep,
                          rua: this.state.rua,
                          numero: this.state.numero,
                          complemento: this.state.complemento,
                          bairro: this.state.bairro,
                          cidade: this.state.cidade,
                          uf: this.state.uf,
                      
                          admin: this.state.admin,
                          colab: this.state.colab,
                      
                        })
                      }>
                          <Icon size={20} name= "home" color='#fff'/>
                          <Text style={styles.textButton}>Editar endereço</Text>
                      </Button>

                      <Button style={styles.button} onPress={
                        () => this.props.navigation.navigate('EditarSenha',
                        {
                          id_usuario: this.state.id_usuario, 
                          senha: this.state.senha,
                          admin: this.state.admin,
                          colab: this.state.colab,
                      
                        })
                      }>
                          <Icon size={20} name= "lock" color='#fff'/>
                          <Text style={styles.textButton}>Mudar senha</Text>
                      </Button>
                    </View>
  
                    <View style={styles.campoDelete}>
                      <Icon name= "delete" color='#f00'/>
                      <Text style={styles.textDelete} onPress={() => {Alert.alert('Conta excluída')}}>Excluir minha conta</Text>
                    </View>
                  </View>
              </View>
          </ScrollView>
        );
      }
      else{
        return (
          <ScrollView animated='false'style={styles.scrollView} refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
            <Header title="Perfil" style={styles.containerheader}>
              <StatusBar backgroundColor="#283593" barStyle="light-content"/>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}>
                <Icon name= "arrow-back" color='#fff'/>
              </Button>
              <Body style={{paddingLeft: 20}}>
                <Text style={styles.textHeader}>Perfil</Text>
              </Body>
              <Right>
                <Button transparent onPress = { this.refreshPerfil} >
                <Icon name="refresh" color="#fff"/>
                </Button>
              </Right>
            </Header>
              <View style={{flex:1, margin: 10}}>
                  <View style={{flex:1, padding: 10}}>
                    <Text style={styles.textInfo}>Nome: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.nome}</Text>
                    </View>
  
                    <Text style={styles.textInfo}>E-mail: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.email}</Text>
                    </View>
                    
                    <Text style={styles.textInfo}>Matrícula: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.matricula}</Text>
                    </View>
  
                    <Text style={styles.textInfo}>Telefone: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.telefone}</Text>
                    </View>
  
                    <Text style={styles.textInfo}>CEP: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.cep}</Text>
                    </View>
  
                    <Text style={styles.textInfo}>Rua: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.rua}</Text>
                    </View>
  
                    <Text style={styles.textInfo}>Número: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.numero}</Text>
                    </View>
                    
                    <Text style={styles.textInfo}>Complemento: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.complemento}</Text>
                    </View>
  
                    <Text style={styles.textInfo}>Bairro: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.bairro}</Text>
                    </View>
                    
                    <Text style={styles.textInfo}>Cidade: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.cidade}</Text>
                    </View>
  
                    <Text style={styles.textInfo}>UF: </Text>
                    <View style= {styles.campoStyle}>
                    <Text style={styles.text}>{this.state.uf}</Text>
                    </View>

                    <View style={{marginTop: 15, margin: 20}}>
                      <Button style={styles.button} onPress={
                        () => this.props.navigation.navigate('EditarDados',
                        {
                          id_usuario:this.state.id_usuario, 
                          nome: this.state.nome,
                          email:this.state.email,
                          matricula:this.state.matricula,
                          telefone: this.state.telefone,
                      
                          admin: this.state.admin,
                          colab: this.state.colab,
                      
                        })
                      }>
                          <Icon size={20} name= "person" color='#fff'/>
                          <Text style={styles.textButton}>Editar dados pessoais</Text>
                      </Button>

                      <Button style={styles.button} onPress={
                        () => this.props.navigation.navigate('EditarEndereco',
                        {
                          id_usuario: this.state.id_usuario,
                          id_end: this.state.id_end, 
                          cep: this.state.cep,
                          rua: this.state.rua,
                          numero: this.state.numero,
                          complemento: this.state.complemento,
                          bairro: this.state.bairro,
                          cidade: this.state.cidade,
                          uf: this.state.uf,
                      
                        })
                      }>
                          <Icon size={20} name= "home" color='#fff'/>
                          <Text style={styles.textButton}>Editar endereço</Text>
                      </Button>

                      <Button style={styles.button} onPress={
                        () => this.props.navigation.navigate('EditarSenha',
                        {
                          id_usuario: this.state.id_usuario, 
                          senha: this.state.senha,
                      
                        })
                      }>
                          <Icon size={20} name= "lock" color='#fff'/>
                          <Text style={styles.textButton}>Mudar senha</Text>
                      </Button>
                    </View>
  
                    <View style={styles.campoDelete}>
                      <Icon name= "delete" color='#f00'/>
                      <Text style={styles.textDelete} onPress={() => {Alert.alert('Conta excluída')}}>Excluir minha conta</Text>
                    </View>
                  </View>
              </View>
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
  },
  textDelete:{
    color: '#f00',
    fontWeight:'bold',
    fontSize:15,
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

