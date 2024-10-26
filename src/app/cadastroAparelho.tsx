import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  TextInput,
  Modal, 

} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

const CadastroAparelho = () => {
  // Armazenamento de dados
  const [nomeAparelho, setNomeAparelho] = useState('');
  const [tipoAparelho, setTipoAparelho] = useState('Eletrodoméstico');
  const [voltagemAparelho, setVoltagemAparelho] = useState('200V');

  // Ícones/imagens usadas
  //const iconAparelho = require('@/assets/images/geladeira.png');
  //const iconTipo = require('@/assets/images/televisao.png');
  //const iconVoltagem = require('@/assets/images/voltagem.png');
  //const iconConfirmar = require('@/assets/images/confirmar.png');

  // Controle de Formulário
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalAtual, setModalAtual] = useState(1);

  const navigateTo = (nextModal : number) => {
    if (nextModal === 3 && !nomeAparelho) {
      alert('Por favor, insira um nome para o aparelho.');
      return;
    }
    setModalAtual(nextModal);
  };

  const endCadastro = () => {
    console.log('Finalizando cadastro e navegando para AparelhosCadastrados');
    setModalVisible(false);
    router.replace('/aparelhos');
  };

  const cancelCadastro = ()=>{
    setModalVisible(false);
    router.replace('/aparelhos');
  };

  // Funções

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botao} onPress={() => setModalVisible(true)}>
        <Text style={styles.txtbotao}>Vamos adicionar um aparelho?</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {modalAtual === 1 && (
            <>
              <Text style={styles.title}>Cadastro de Aparelho</Text>
              <Text style={styles.subtitle}>Possui o nosso sistema de tomadas para monitoramento?</Text>
              <View style={styles.navigation}>
                <TouchableOpacity style={styles.botao}>
                  <Text style={styles.txtbotao}>Saiba Mais</Text>
                </TouchableOpacity>              
                <TouchableOpacity style={styles.botao} onPress={() => navigateTo(2)}>
                  <Text style={styles.txtbotao}>Prosseguir</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {modalAtual === 2 && (
            <>
              <Text style={styles.title}>O Meu Aparelho</Text>
              {/*<Image source={iconAparelho} style={styles.icon}/>*/}
              <TextInput
                style={styles.textbox}
                autoCapitalize="sentences"
                autoFocus={true}
                placeholder="Nome"
                value={nomeAparelho}
                onChangeText={setNomeAparelho}
              />
              <View style={styles.navigation}>
                <TouchableOpacity style={styles.botao} onPress={cancelCadastro}>
                  <Text style={styles.txtbotao}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao} onPress={() => navigateTo(3)}>
                  <Text style={styles.txtbotao}>Próximo</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {modalAtual === 3 && (
            <>
              <Text style={styles.title}>O Meu Aparelho</Text>
              {/*<Image source={iconTipo} style={styles.icon} />*/}
              <Text style={styles.textAuxilio}>Tipo do Aparelho:</Text>
              <Picker
                selectedValue={tipoAparelho}
                style={styles.picker}
                onValueChange={(itemValue : string) => setTipoAparelho(itemValue)}
              >
                <Picker.Item label="Eletrodoméstico" value="Eletrodoméstico" />
                <Picker.Item label="Eletrônico" value="Eletrônico" />
              </Picker>
              <View style={styles.navigation}>
                <TouchableOpacity style={styles.botao} onPress={() => setModalAtual(2)}>
                  <Text style={styles.txtbotao}>Anterior</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao} onPress={() => navigateTo(4)}>
                  <Text style={styles.txtbotao}>Próximo</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {modalAtual === 4 && (
            <>
              <Text style={styles.title}>O Meu Aparelho</Text>
              {/*<Image source={iconVoltagem} style={styles.icon} />*/}
              <Text style={styles.textAuxilio}>Selecione a voltagem do seu Aparelho:</Text>
              <Picker
                selectedValue={voltagemAparelho}
                style={styles.picker}
                onValueChange={(itemValue : string) => setVoltagemAparelho(itemValue)}
              >
                <Picker.Item label="200V" value="200V" />
                <Picker.Item label="110V" value="110V" />
                <Picker.Item label="BiVolt" value="BiVolt" />
              </Picker>
              <View style={styles.navigation}>
                <TouchableOpacity style={styles.botao} onPress={() => setModalAtual(3)}>
                  <Text style={styles.txtbotao}>Anterior</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao} onPress={() => navigateTo(5)}>
                  <Text style={styles.txtbotao}>Próximo</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {modalAtual === 5 && (
            <>
              <Text style={styles.title}>Confirme os Dados</Text>
              {/*<Image source={iconConfirmar} style={styles.icon} />*/}
              <View style={styles.cardStyle}>
                <Text style={styles.dados}>Nome: {nomeAparelho}</Text>
                <Text style={styles.dados}>Tipo: {tipoAparelho}</Text>
                <Text style={styles.dados}>Voltagem: {voltagemAparelho}</Text>
              </View>
              <View style={styles.navigation}>
                <TouchableOpacity style={styles.botao} onPress={() => navigateTo(2)}>
                  <Text style={styles.txtbotao}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao} onPress={endCadastro}>
                  <Text style={styles.txtbotao}>Finalizar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  botao: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 6, 
    maxWidth: 320,
    alignItems: 'center',
  },
  txtbotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginVertical: 6,
  },
  textAuxilio: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
  },
  textbox: {
    borderWidth: 1,
    borderColor: '#6200EE',
    padding: 10,
    width: '100%',
    borderRadius: 5,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#6200EE',
    borderRadius: 5,
    marginVertical: 10,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  dados: {
    fontSize: 14,
    marginVertical: 2,
  },
  cardStyle: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#FFF',
  },
});

export default CadastroAparelho;