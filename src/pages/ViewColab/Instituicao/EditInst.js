import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, ScrollView, Alert, Linking} from 'react-native';

import {Container, Form, FormInput, FormMaskInput, SignLink, SubmitButton} from "./styles";

export default function EditInst ({navigation}){

  const {fkInst} = navigation.state.params;
  const {idend} = navigation.state.params;
  const [nome, setNome] = useState(navigation.state.params.nome);
  const [telefone, setTelefone] = useState(navigation.state.params.telefone);
  const [CEP, setCEP] = useState(navigation.state.params.CEP);
  const [rua, setRua] = useState(navigation.state.params.rua);
  const [num, setNum] = useState(navigation.state.params.num);
  const [complemento, setComplemento]= useState(navigation.state.params.complemento);
  const [bairro, setBairro] = useState(navigation.state.params.bairro);
  const [cidade, setCidade] = useState(navigation.state.params.cidade);
  const [UF, setUF] = useState(navigation.state.params.UF);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  },[]);

  const confirmEdit = () => {
    Alert.alert(
      "Deseja editar os dados da Instituição?",
      "Confirme sua solicitação.",
      [
        { text: "Sim, quero!", onPress: () => editInstituicao()},
        {
          text: "Cancelar",
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  }

  function editInstituicao() {
    if (nome == '' || telefone == '' || CEP == '' || rua == '' || num == '' || 
      bairro == '' || cidade == '' || UF == ''){
      Alert.alert('Campos em branco!', 'Verifique os dados preenchidos.');
    } else {
      fetch('http://ebus.projetoscomputacao.com.br/backend/updateInst_api.php', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        }, body: JSON.stringify({
          id_instituicao: fkInst,
          id_endereco: idend,
          nome: nome,
          telefone: telefone,
          numero: num,
          complemento: complemento,
          cep: CEP,
          rua: rua,
          bairro: bairro,
          cidade: cidade,
          uf: UF,
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          if(responseJson === 'Dados atualizados com sucesso!'){
            Alert.alert('Dados atualizados!','Edição realizada com sucesso!');
            navigation.goBack();
          } else {
            Alert.alert(responseJson);
          }
        }).catch((error) => {
          Alert.alert('Erro na conexão', 'Verifique sua internet!');
      })
    }
  }

  function attCEP (){
    if (CEP === ''){
      Alert.alert('CEP em branco!');
    } else {
      fetch('https://viacep.com.br/ws/' + CEP + '/json/')
      .then((response) => response.json())
      .then(resultado => {
        setRua(resultado.logradouro),
        setBairro(resultado.bairro),
        setCidade(resultado.localidade),
        setUF(resultado.uf),
        setErro(resultado.erro)

      if (erro === true){
        Alert.alert(
          'CEP inválido','Tente novamente!',[{
              text: "Não sei meu CEP", onPress: () => Linking.openURL('http://www.buscacep.correios.com.br/sistemas/buscacep/'),
            },{ text: "Ok"}
          ],{cancelable: false }
        );
        setErro(false);
        }      
      }).catch((error) => {
        Alert.alert('Tente novamente!');
        setLoading(false);
      });
    }
  }

  if (loading == true){
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#283593" />
      </View>
    );
  } else {
    return (
      <Container>
      <ScrollView>
        <Form>
          <FormInput
            icon="school"
            autoCorrect={false}
            value={nome}
            autoCapitalize="none"
            placeholder="Nome"
            placeholderTextColor='rgba(0,0,255,0.4)'
            onChangeText={(data) => setNome(data)}
          />
          <FormMaskInput
            icon="call"
            type={"cel-phone"}
            value={telefone}
            options={{
              maskType: "BRL",
              withDDD: true,
              dddMask: "(99) ",
            }}
            placeholder="Telefone"
            placeholderTextColor='rgba(0,0,255,0.4)'
            onChangeText={(data) => setTelefone(data)}
          />
          <FormMaskInput
            icon="map"
            icon4="map-search"
            iconPress={attCEP}
            type={"zip-code"}
            value={CEP}
            placeholder="CEP"
            placeholderTextColor='rgba(0,0,255,0.4)'
            onChangeText={(data) => setCEP(data)}
          />
          <FormInput
            icon="home"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Rua"
            value={rua}
            placeholderTextColor='rgba(0,0,255,0.4)'
            onChangeText={(data) => setRua(data)}
          />
          <FormMaskInput
            icon3="numeric-1-box-multiple-outline" 
            autoCorrect={false}
            value={num}
            type={"custom"}
            keyboardType="number-pad"
            options={{mask: '99999'}}
            placeholder="Número"
            placeholderTextColor="rgba(0,0,255,0.4)"
            onChangeText={(data) => setNum(data)}
          /> 
          <FormInput
            icon3="home-city"
            autoCorrect={false}
            value={complemento}
            autoCapitalize="none"
            placeholder="Complemento"
            placeholderTextColor='rgba(0,0,255,0.4)'
            onChangeText={(data) => setComplemento(data)}
          />
          <FormInput
            icon3="city-variant"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Bairro"
            value = {bairro}
            placeholderTextColor='rgba(0,0,255,0.4)'
            onChangeText={(data) => setBairro(data)}
          />
          <FormInput
            icon3="city-variant-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Cidade"
            value = {cidade}
            placeholderTextColor='rgba(0,0,255,0.4)'
            onChangeText={(data) => setCidade(data)}
          />         
          <FormInput
            icon="public"
            autoCapitalize="characters"
            placeholder="UF"
            value={UF}
            placeholderTextColor='rgba(0,0,255,0.4)'
            onChangeText={(data) => setUF(data)}
            autoCapitalize="characters"
            maxLength={2}
          />
          </Form>
          <SignLink>
            <SubmitButton
              onPress={confirmEdit}>Confirmar
            </SubmitButton>
          </SignLink> 
        </ScrollView>
      </Container>
    );
  }
}