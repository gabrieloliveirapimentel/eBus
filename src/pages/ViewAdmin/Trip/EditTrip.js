import React, { useState, useEffect } from "react";
import { ScrollView, Alert } from "react-native";
import { CheckBox } from "native-base";
import { parseISO, format } from "date-fns";

import {
  BoxView,
  BoxText,
  NewContainer,
  Form,
  FormText,
  FormInput,
  SignLink,
  SubmitButton,
  TitleCheck,
  TextCheck,
  FormMaskInput,
} from "./styles";

export default function EditTrip({ navigation }) {
  const [Text_Data, setText_Data] = useState("");
  const [Text_Horario, setText_Horario] = useState("");
  const [Text_Origem, setText_Origem] = useState("");
  const [Text_Destino, setText_Destino] = useState("");
  const { Text_Id_Viagem } = navigation.state.params;

  function updateTrip() {
    if (
      Text_Data === "" ||
      Text_Horario === "" ||
      Text_Origem === "" ||
      Text_Destino === ""
    ) {
      Alert.alert("Dados em branco!", "Verifique os campos e tente novamente.");
    } else {
      fetch("http://mybus.projetoscomputacao.com.br/updateTrip_api.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_viagem: Text_Id_Viagem,
          data: Text_Data,
          horario: Text_Horario,
          origem: Text_Origem,
          destino: Text_Destino,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == "Viagem atualizada!") {
            Alert.alert(responseJson);
            this.props.navigation.navigate("Viagem");
          } else {
            Alert.alert(responseJson);
          }
        })
        .catch((error) => {
          Alert.alert("Erro na conexão", "Verifique sua internet!");
        });
    }
  }

  return (
    <ScrollView animated="false" style={{ marginHorizontal: 0 }}>
      <NewContainer>
        <Form>
          <FormMaskInput
            icon3="calendar"
            type={"datetime"}
            value={Text_Data}
            options={{
              format: "YYYY/MM/DD",
            }}
            placeholder="Data"
            placeholderTextColor="rgba(0,0,255,0.4)"
            onChangeText={(data) => setText_Data(data)}
          />

          <FormMaskInput
            icon="access-time"
            type={"datetime"}
            value={Text_Horario}
            options={{
              format: "HH:mm",
            }}
            placeholder="Horario"
            placeholderTextColor="rgba(0,0,255,0.4)"
            onChangeText={(data) => setText_Horario(data)}
          />

          <FormInput
            icon3="map-marker"
            autoCapitalize="none"
            autoCorrect={true}
            placeholder="Origem"
            onChangeText={(data) => setText_Origem(data)}
          />
          <FormInput
            icon3="map-marker-radius"
            autoCorrect={true}
            autoCapitalize="sentences"
            placeholder="Destino"
            onChangeText={(data) => setText_Destino(data)}
          />
        </Form>
        <SignLink>
          <SubmitButton onPress={updateTrip}>Confirmar</SubmitButton>
        </SignLink>
      </NewContainer>
    </ScrollView>
  );
}
/*
export class EditTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      horario: "",
      origem: "",
      destino: "",
      id_viagem: "",

      text_data: "",
      text_horario: "",
      text_origem: "",
      text_destino: "",
    };
  }

  componentDidMount() {
    this.setState({
      id_viagem: this.props.navigation.state.params.id_viagem,
      text_data: this.props.navigation.state.params.data,
      text_horario: this.props.navigation.state.params.horario,
      text_origem: this.props.navigation.state.params.origem,
      text_destino: this.props.navigation.state.params.destino,
    });
  }

  UpdateTrip = () => {
    if (
      this.state.data == "" ||
      this.state.horario == "" ||
      this.state.origem == "" ||
      this.state.destino == ""
    ) {
      Alert.alert("Dados em branco, tente novamente!");
    } else {
      fetch("http://mybus.projetoscomputacao.com.br/updateTrip_api.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_viagem: this.state.id_viagem,
          data: this.state.data,
          horario: this.state.horario,
          origem: this.state.origem,
          destino: this.state.destino,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == "Viagem atualizada!") {
            Alert.alert(responseJson);
            this.props.navigation.navigate("Viagem");
          } else {
            Alert.alert(responseJson);
          }
        })
        .catch((error) => {
          Alert.alert('Erro na conexão', 'Verifique sua internet!');
        });
    }
  };

  render() {
    return (
      <ScrollView animated="false" style={styles.scrollView}>
        <StatusBar backgroundColor="#283593" barStyle="light-content" />
        <Container>
          <Form>
          <Text style={{margin: 5, marginTop: 20}}>Data: </Text>
            <View style={styles.campoStyle}>
              <TextInputMask
                style={styles.text}
                type={"datetime"}
                options={{
                  format: "YYYY/MM/DD",
                }}
                value={this.state.data}
                placeholder={this.state.text_data}
                placeholderTextColor="rgba(0,0,255,0.4)"
                onChangeText={(data) => {
                  this.setState({
                    data: data,
                  });
                }}
              />
            </View>
            <Text style={{margin: 5}}>Horário: </Text>
            <View style={styles.campoStyle}>
              <TextInputMask
                style={styles.text}
                type={"datetime"}
                options={{
                  format: "HH:mm",
                }}
                value={this.state.horario}
                placeholder={this.state.text_horario}
                placeholderTextColor="rgba(0,0,255,0.4)"
                onChangeText={(data) => {
                  this.setState({
                    horario: data,
                  });
                }}
              />
            </View>
            
            <Text style={{margin: 5}}>Origem: </Text>
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              autoCompleteType="off"
              placeholder={this.state.text_origem}
              data={this.state.origem}
              onChangeText={(data) => this.setState({ origem: data })}
            />

            <Text style={{margin: 5}}>Destino: </Text>
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              autoCompleteType="off"
              placeholder={this.state.text_destino}
              onChangeText={(data) => this.setState({ destino: data })}
            />
            <Button
              style={styles.button}
              onPress={this.UpdateTrip}
              title="Confirmar"
            >
              <Text style={styles.textButton}>Confirmar</Text>
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
  campoStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    height: 46,
  },
  text: {
    fontSize: 15,
    color: "rgba(0,0,255,0.8)",
    marginLeft: 25,
    marginTop: 10,
  },
  button: {
    height: 40,
    borderRadius: 10,
    marginLeft: 60,
    marginRight: 60,
    marginTop: 10,
    justifyContent: "center",
    backgroundColor: "#283593",
  },

  textButton: {
    color: "#fff",
    textTransform: "capitalize",
    fontSize: 16,
  },
  textSubmit: {
    marginTop: 10,
    marginBottom: 15,
    justifyContent: "center",
    color: "#283593",
    fontSize: 16,
    fontWeight: "bold",
  },
});
*/
