import React, { useEffect, useState, useCallback } from "react";
import { RefreshControl, ScrollView, Alert } from "react-native";
import { ButtonView, InfoContainer, Form, FormText, SubButton } from "./styles";

import { parseISO, format } from "date-fns";

export default function InfoTrip({ navigation }) {
  const { Text_Data } = navigation.state.params;
  const { Text_Horario } = navigation.state.params;
  const { Text_Origem } = navigation.state.params;
  const { Text_Destino } = navigation.state.params;
  const { Text_Id_Viagem } = navigation.state.params;

  const [refreshing, setRefreshing] = useState(false);

  const parsedDate = parseISO(Text_Data);
  const formattedDate = format(parsedDate, "dd/MM/yyyy");

  function DropTrip() {
    fetch("http://mybus.projetoscomputacao.com.br/deleteTrip_api.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_viagem: Text_Id_Viagem,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == "Viagem deletada!") {
          Alert.alert(responseJson);
          navigation.goBack();
        } else {
          Alert.alert(responseJson);
        }
        // Showing response message coming from server after inserting records.
      })
      .catch((error) => {
        Alert.alert("Erro na conexão", "Verifique sua internet!");
      });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
  }, [refreshing]);

  return (
    <ScrollView
      animated="false"
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <InfoContainer>
        <Form>
          <FormText icon3="calendar" text={formattedDate} />
          <FormText icon="access-time" text={Text_Horario} />
          <FormText icon3="map-marker" text={Text_Origem} />
          <FormText icon3="map-marker-radius" text={Text_Destino} />
        </Form>
        <ButtonView>
          <SubButton
            onPress={() =>
              navigation.navigate("EditTrip", {
                Text_Id_Viagem: Text_Id_Viagem,
              })
            }
          >
            Editar
          </SubButton>
          <SubButton onPress={DropTrip}>Deletar</SubButton>
        </ButtonView>
      </InfoContainer>
    </ScrollView>
  );
}

/*

export class InfoTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_viagem: "",

      text_data: "",
      text_horario: "",
      text_origem: "",
      text_destino: "",
      text_id_viagem: "",
    };
  }

  DeletarTrip = () => {
    fetch("http://mybus.projetoscomputacao.com.br/deleteTrip_api.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_viagem: this.state.text_id_viagem,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == "Viagem deletada!") {
          Alert.alert(responseJson);
          this.props.navigation.goBack();
        } else {
          Alert.alert(responseJson);
        }
        // Showing response message coming from server after inserting records.
      })
      .catch((error) => {
        Alert.alert('Erro na conexão', 'Verifique sua internet!');
      });
  };

  componentDidMount() {
    this.setState({
      text_data: this.props.navigation.state.params.data,
      text_horario: this.props.navigation.state.params.horario,
      text_origem: this.props.navigation.state.params.origem,
      text_destino: this.props.navigation.state.params.destino,
      text_id_viagem: this.props.navigation.state.params.id_viagem,
    });
  }

  render() {
    return (
      <ScrollView animated="false" style={styles.scrollView}>
        <StatusBar backgroundColor="#283593" barStyle="light-content" />
        <Container>
          <Form>
            <Text style={{margin: 5, marginTop: 20}}>Data: </Text>
            <View style={styles.campoStyle}>
              <Text style={styles.text}>{this.state.text_data}</Text>
            </View>
            
            <Text style={{margin: 5}}>Horário: </Text>
            <View style={styles.campoStyle}>
              <Text style={styles.text}>{this.state.text_horario}</Text>
            </View>

            <Text style={{margin: 5}}>Origem: </Text>
            <View style={styles.campoStyle}>
              <Text style={styles.text}>{this.state.text_origem}</Text>
            </View>

            <Text style={{margin: 5}}>Destino: </Text>
            <View style={styles.campoStyle}>
              <Text style={styles.text}>{this.state.text_destino}</Text>
            </View>
          </Form>
          <View style={styles.viewbutton}>
            <Button
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate("EditTrip", {
                  data: this.state.text_data,
                  horario: this.state.text_horario,
                  origem: this.state.text_origem,
                  destino: this.state.text_destino,
                  id_viagem: this.state.text_id_viagem,
                });
              }}
            >
              <Icon name="create" color="#fff" />
              <Text style={styles.textButton}>Editar</Text>
            </Button>
            <Button style={styles.button} onPress={this.DeletarTrip}>
              <Icon name="delete" color="#fff" />
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
    marginTop: 40,
    margin: 5,
    justifyContent: "center",
    backgroundColor: "#283593",
  },
  textButton: {
    color: "#fff",
    textTransform: "capitalize",
    fontSize: 16,
  },
  campoStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    height: 46,
  },
  text: {
    fontSize: 15,
    color: "rgba(0,0,255,0.6)",
    marginLeft: 25,
  },
  viewbutton: {
    alignItems: "center",
    flexDirection: "row",
  },
});
*/
