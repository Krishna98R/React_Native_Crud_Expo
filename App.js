import { StatusBar } from 'expo-status-bar';
import {  SafeAreaView, StyleSheet, Text, View } from 'react-native';
import TodoScreen from './src/screens/TodoScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <View >
    <TodoScreen></TodoScreen>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
