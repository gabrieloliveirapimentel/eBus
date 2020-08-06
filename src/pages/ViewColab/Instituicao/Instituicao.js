import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, RefreshControl, ActivityIndicator, Alert, AsyncStorage} from 'react-native';
import {Container, Header, Tab, Form, FormText} from "./styles";

export default function Instituicao ({navigation}){
  const [email, setEmail] = useState('');
  const [fkInst, setFKInst] = useState(0);
  const [nome, setNome] = useState('Instituição');
  const [telefone, setTelefone] = useState('Telefone');
  const [idend, setIDend] = useState('');
  const [CEP, setCEP] = useState('CEP');
  const [rua, setRua] = useState('Rua');
  const [num, setNum] = useState('Número');
  const [complemento, setComplemento] = useState('Complemento');
  const [bairro, setBairro] = useState('Bairro');
  const [cidade, setCidade] = useState('Cidade');
  const [UF, setUF] = useState('UF');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  async function getItem () {
    let token = await AsyncStorage.getItem('@eBus:colab');
    setEmail(token);
  }

  useEffect(() => {
    getItem();
    fetch("http://ebus.projetoscomputacao.com.br/backend/myID_api.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
    .then((response) => response.json())
    .then((resultado) => {
      setFKInst(resultado.fk_Instituicao_id_instituicao);
      setLoading(false);
    })
    .catch((error) => {
      Alert.alert("Erro na conexão!", "Verifique sua internet");
      setloading(false); 
    });  
  }, [email]);

  function goToEdit(){
    navigation.navigate('EditInstituicao',{
      fkInst: fkInst,
      nome: nome,
      telefone: telefone,
      idend: idend,
      CEP: CEP,
      rua: rua,
      num: num,
      complemento: complemento,
      bairro: bairro,
      cidade: cidade,
      UF: UF,
    });
  }
  
  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  function thisInst(){}

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1200).then(() => 
    {setRefreshing(false)
     thisInst();
    });
  }, [refreshing]);

  useEffect(
    thisInst = () => {
      setErro('erro');
      fetch('http://ebus.projetoscomputacao.com.br/backend/myInst_api.php',{
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fk: fkInst,
          }),
      }).then((response) => response.json())
        .then((resultado) => {
          if(resultado == 'Nenhum dado encontrado.'){
            setErro('Erro.');
            setLoading(false);
          } else{
            setErro('Sem erro.'),
            setNome(resultado.nome_instituicao),
            setTelefone(resultado.telefone_instituicao),
            setIDend(resultado.Endereco_id_endereco),
            setCEP(resultado.cep),
            setRua(resultado.rua),
            setNum(resultado.numero)
            if (resultado.complemento != '')  { setComplemento(resultado.complemento); }
            setBairro(resultado.bairro),
            setCidade(resultado.cidade),
            setUF(resultado.uf)
            setLoading(false);
          }
        }).catch((error) => { 
          setLoading(false);
          Alert.alert('Erro na conexão', 'Verifique sua internet!');
        })
        setErro('Sem erro.');
  },[erro]);

  if (loading == true) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#283593" />
      </View>
    );
  } else {
    return (
      <View style={{flex:1}}>
      <Header title="Instituição" icon="edit" iconPress={goToEdit}/>
      <ScrollView animated='false' refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Container>
          <Form>
            <FormText icon="school" text={nome}/>
            <FormText icon="call" text={telefone}/>
            <FormText icon="map" text={CEP}/>
            <FormText icon="home" text={rua}/>
            <FormText icon3="numeric-1-box-multiple-outline" text={num}/>
            <FormText icon3="home-city" text={complemento}/>
            <FormText icon3="city-variant" text={bairro}/>
            <FormText icon3="city-variant-outline" text={cidade}/>
            <FormText icon="public" text={UF}/>
          </Form>
        </Container>
      </ScrollView>
      </View>
    );
  }
  
}