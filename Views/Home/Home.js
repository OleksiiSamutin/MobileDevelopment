import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
function Home() {
  return (
    <View style={styles.container}>
      <Text>Самутін Олексій</Text>
      <Text>Група ІО-82</Text>
      <Text>ЗК ІО-8220</Text>

    </View>
  );
}

export default Home;