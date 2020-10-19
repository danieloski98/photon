import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform, Animated, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function App() {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [animatedState, setAnimatedState] = React.useState(0);

  // color interpolation

  const buttonColor = animatedValue.interpolate({
    inputRange: [0, 0.005, 0.5, 1],
    outputRange: ['grey', 'grey', 'gold', 'gold']
  })

  const containerBg = animatedValue.interpolate({
    inputRange: [0, 0.005, 0.5, 1],
    outputRange: ['gold', 'gold', 'grey', 'grey'],
  })

  const startAnimation = () => {
    setAnimatedState(prev => prev === 0 ? 1 : 0);

    Animated.timing(animatedValue, {
      toValue: animatedState === 0 ? 1 : 0,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }

  return (
    <Animated.View style={[styles.container, {backgroundColor: containerBg}]}>
      <StatusBar style="auto" />
      <View style={styles.btnView}>
        <Animated.View style={[
          styles.btn,
          {
          backgroundColor: buttonColor,
          transform: [
            {perspective: 400},
            { scale: animatedValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 8, 1]
            }),
          },
          {
            rotateY: animatedValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: ['0deg', '-90deg', '-180deg' ]
            })
          }
          ]
          }]}>
        <TouchableOpacity
          onPress={startAnimation}
          style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
        >
          <Feather name="arrow-right"  size={30} color="#fff"/>
        </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 50 : 0,
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },

  btnView: {
    width: '100%',
    alignItems: 'center'
  },

  btn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray'
  }
});
