import { Container, Picker } from './style';
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

function PickerStates ({style, icon, ...rest}, ref) {
  return (
    <Container style={style}>
        {icon && <Icon name={icon} size={20} color="rgba(0,0,255,0.6)"/>}
        <Picker {... rest} ref={ref}>
              <Picker.Item label="Estado" value="UF"/>
              <Picker.Item label="Acre" value="AC"/>
              <Picker.Item label="Alagoas" value="AL" />
              <Picker.Item label="Amazonas" value="AM" />
              <Picker.Item label="Amapá" value="AP" />
              <Picker.Item label="Bahia" value="BA" />
              <Picker.Item label="Ceará" value="CE" />
              <Picker.Item label="Distrito Federal" value="DF" />
              <Picker.Item label="Espírito Santo" value="ES" />
              <Picker.Item label="Goiás" value="GO" />
              <Picker.Item label="Maranhão" value="MA" />
              <Picker.Item label="Minas Gerais" value="MG" />
              <Picker.Item label="Mato Grosso do Sul" value="MS" />
              <Picker.Item label="Mato Grosso" value="MT" />
              <Picker.Item label="Pará" value="PA" />
              <Picker.Item label="Paraíba" value="PB" />
              <Picker.Item label="Pernambuco" value="PE" />
              <Picker.Item label="Piauí" value="PI" />
              <Picker.Item label="Paraná" value="PR" />
              <Picker.Item label="Rio de Janeiro" value="RJ" />
              <Picker.Item label="Rio Grande do Norte" value="RN" />
              <Picker.Item label="Rondônia" value="RO" />
              <Picker.Item label="Roraíma" value="RR" />
              <Picker.Item label="Rio Grande do Sul" value="RS" />
              <Picker.Item label="Santa Catarina" value="SC" />
              <Picker.Item label="Sergipe" value="SE" />
              <Picker.Item label="São Paulo" value="SP" />
              <Picker.Item label="Tocantins" value="TO" />
            </Picker>  
    </Container>
  );
}
PickerStates.PropTypes = {
    icon: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
PickerStates.defaultProps = {
    icon: null,
    style: {},
};

export default forwardRef (PickerStates);
