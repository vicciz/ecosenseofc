import React from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import Navbar from '../components/navbar';
import AparelhosCadastrados from '../app/aparelhosCadastrados';

const TelaAparelhos = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AparelhosCadastrados/>
      <Navbar activeRoute="/aparelhos" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Use a cor correta para o fundo
    padding: 16, // Aumentado para melhor espaçamento
  },
});

export default TelaAparelhos;