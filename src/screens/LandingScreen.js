import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const LandingScreen = ({navigation}) => {
  const state = ['focus', 'relax', 'sleep'];
  return (
    <View style={styles.container}>
      {state.map((item, index) => (
        <TouchableOpacity
          style={styles.buttonContainer}
          key={index}
          onPress={() =>
            navigation.navigate('AudioPlayer', {mentalState: item})
          }>
          <Text style={styles.buttonText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#0f0',
    paddingVertical: 10,
    alignItems: 'center',
    width: '80%',
    marginBottom: 40,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 24,
    textTransform: 'uppercase',
  },
});

export default LandingScreen;
