import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

interface Aparelho {
  id: string;
  nome: string;
  voltagem: string;
  tipo: string;
}

const aparelhos: Aparelho[] = [
  { id: '1', nome: 'Ar Condicionado', voltagem: '220V', tipo: 'Eletrônico' },
  { id: '2', nome: 'Geladeira', voltagem: '110V', tipo: 'Eletrodoméstico' },
  { id: '3', nome: 'Micro-ondas', voltagem: '110V', tipo: 'Eletrodoméstico' },
];

const AparelhosCadastrados = () => {
  const router = useRouter();
  const [consumoRS] = useState('13,00');
  const [aparelhosState, setAparelhosState] = useState(aparelhos);

  const renderItem = ({ item }: { item: Aparelho }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nome}</Text>
      <Text>Voltagem: {item.voltagem}</Text>
      <Text>Tipo: {item.tipo}</Text>
      <Text>R$ {consumoRS}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Editar" onPress={() => handleEdit(item)} />
        <Button title="Excluir" onPress={() => handleDelete(item.id)} />
      </View>
    </View>
  );

  const handleEdit = (item: Aparelho) => {
    router.push({
      pathname: '/cadastroAparelho',
      params: { id: item.id, nome: item.nome, voltagem: item.voltagem, tipo: item.tipo },
    });
  };

  const handleDelete = (id: string) => {
    setAparelhosState((prev) => prev.filter((aparelho) => aparelho.id !== id));
  };

  const irCadastroDispositivo = () => {
    router.push('/cadastroAparelho');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Aparelhos Cadastrados</Text>
      <FlatList
        data={aparelhosState}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.botao} onPress={irCadastroDispositivo}>
        <Text style={styles.btnText}>Adicionar Novo Aparelho</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 80,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  botao: {
    backgroundColor: 'blue',
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AparelhosCadastrados;
