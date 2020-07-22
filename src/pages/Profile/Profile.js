/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useCallback} from 'react';
import {ActivityIndicator, ScrollView, View, RefreshControl, Alert, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {onSignOut} from '../../services/auth';
import {
  Container,
  CustomHeaderProfile,
  DeleteForm,
  Form,
  FormText,
  SignLink,
  SignLinkText,
  SubmitButton,
} from './styles';

export default function Profile ({navigation}){
  const EMAIL_KEY = "@eBus:email";
  const {idUsuario} = navigation.state.params;
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [telefone, setTelefone] = useState('');
  const [admin, setAdmin] = useState(0);
  const [colab, setColab] = useState(0);
  const [idEnd, setIDEnd] = useState(0);
  const [CEP, setCEP] = useState('');
  const [rua, setRua] = useState('');
  const [num, setNum] = useState('');
  const [complemento, setComplemento]= useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [UF, setUF] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const confirmDel = () => {
    Alert.alert(
      "Deseja desativar sua conta?",
      "Confirme sua solicitação.",
      [
        { text: "Sim, quero!", onPress: () => deleteUser()},
        {
          text: "Cancelar",
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  }

  function deleteUser (){
    fetch('http://ebus.projetoscomputacao.com.br/backend/disableUser_api.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_usuario: idUsuario,
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson=='Conta desativada com sucesso!'){
          Alert.alert('Conta desativada!', 'A conta foi desativada com sucesso!');
          navigation.navigate('SignIn')}
        else{Alert.alert(responseJson);}          
      })
      .catch((error) => {
        Alert.alert('Erro na conexão', 'Verifique sua internet!');
    });
  }

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  function thisPerfil(){}

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1200).then(() => 
    {setRefreshing(false)
     thisPerfil();
    });
  }, [refreshing]);

  useEffect(
    thisPerfil = () => {
      let mounted = true;
      fetch('http://ebus.projetoscomputacao.com.br/backend/myProfile_api.php',{
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_usuario: idUsuario,
          }),
      }).then((response) => response.json())
        .then((resultado) => {
        if (mounted)
          {
            setNome(resultado.nome),
            setEmail(resultado.email),
            setMatricula(resultado.matricula),
            setTelefone(resultado.telefone),
            setAdmin(resultado.administrador),
            setColab(resultado.colaborador),
            setIDEnd(resultado.id_endereco),
            setCEP(resultado.cep),
            setRua(resultado.rua),
            setNum(resultado.numero),
            setComplemento(resultado.complemento),
            setBairro(resultado.bairro),
            setCidade(resultado.cidade),
            setUF(resultado.uf)
            setLoading(false);
          }
        }).catch((error) => { 
          setLoading(false);
          Alert.alert('Erro na conexão', 'Verifique sua internet!');
        })
    return () => mounted = false;
    
  },[]);

  function goOut(){
    AsyncStorage.removeItem(EMAIL_KEY).then(onSignOut().then(() => navigation.navigate('SignIn')));
  }

  function sendtoEditProfile(){
    navigation.navigate('EditProfile',{
      send_id: idUsuario,
      send_nome: nome,
      send_email: email,
      send_matricula: matricula,
      send_telefone: telefone,
      send_admin: admin,
      send_colab: colab,
      send_idEnd: idEnd,
      send_CEP: CEP,
      send_rua: rua,
      send_num: num,
      send_complemento: complemento,
      send_bairro:bairro,
      send_cidade:cidade,
      send_UF: UF
    })
  }
  if (loading == true){
    return(
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#283593" />
      </View>
    );
  } else { 
    if(admin == 1 || colab == 1){
      return (
        <View style={{flex:1}}>
        <CustomHeaderProfile title="Meu Perfil" iconPress={() => navigation.goBack()} iconPress2={() => navigation.navigate('SignIn')} />
        <ScrollView animated='false' refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <Container>
          <Form>
            <FormText icon3="laptop" text={nome}/>
            <FormText icon="mail-outline" text={email}/>
            <FormText icon="call" text={telefone}/>
            <FormText icon="map" text={CEP}/>
            <FormText icon="home" text={rua}/>
            <FormText icon3="numeric-1-box-multiple-outline" text={num}/>
            <FormText icon3="home-city" text={complemento}/>
            <FormText icon3="city-variant" text={bairro}/>
            <FormText icon3="city-variant-outline" text={cidade}/>
            <FormText icon="public" text={UF}/>
          </Form>
          <SignLink>
            <SubmitButton
              onPress={sendtoEditProfile}
            >Editar dados
            </SubmitButton>
          </SignLink>
          <DeleteForm>
          <Icon name= "delete" color='#f00' size={22}/>
            <SignLinkText
              onPress={confirmDel}
            >Desativar minha conta!
            </SignLinkText>
          </DeleteForm>    
        </Container>
        </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={{flex:1}}>
        <CustomHeaderProfile title="Meu Perfil" iconPress={() => navigation.goBack()} iconPress2={goOut}/>
        <ScrollView animated='false' refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <Container>
          <Form>
            <FormText icon="person" text={nome}/>
            <FormText icon="computer" text={matricula}/>
            <FormText icon="mail-outline" text={email}/>
            <FormText icon="call" text={telefone}/>
            <FormText icon="map" text={CEP}/>
            <FormText icon="home" text={rua}/>
            <FormText icon3="numeric-1-box-multiple-outline" text={num}/>
            <FormText icon3="home-city" text={complemento}/>
            <FormText icon3="city-variant" text={bairro}/>
            <FormText icon3="city-variant-outline" text={cidade}/>
            <FormText icon="public" text={UF}/>
          </Form>
          <SignLink>
            <SubmitButton
              onPress={sendtoEditProfile}
            >Editar dados
            </SubmitButton>
          </SignLink>
          <DeleteForm>
          <Icon name= "delete" color='#f00' size={22}/>
            <SignLinkText
              onPress={confirmDel}
            >Desativar minha conta!
            </SignLinkText>
          </DeleteForm>    
        </Container>
        </ScrollView>
        </View>
      );
    }
  }
}