import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, RefreshControl, ActivityIndicator, Alert, AsyncStorage} from 'react-native';
import {Container, Header, Tab, Form, FormText} from "./styles";

export default function Instituicao ({navigation}){
  const {fk} = navigation.state.params;
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

  function goToEdit(){
    navigation.navigate('EditInstituicao',{
      fkInst: fk,
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
            fk: fk,
          }),
      }).then((response) => response.json())
        .then((resultado) => {
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

          if(resultado == 'Nenhum dado encontrado.'){
            setErro('Erro.');
            setLoading(false);
          }
        }).catch((error) => { 
          setLoading(false);
          Alert.alert('Erro na conexão', 'Verifique sua internet!');
        })
        setErro('Sem erro.');
  },[]);

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
      <Tab
          onPress1={() => navigation.navigate('ViagemColab')}
          color1="rgba(255,255,255,0.5)"
          onPress2={() => {}}
          color2="#fff"
        />
      </View>
    );
  }
  
}