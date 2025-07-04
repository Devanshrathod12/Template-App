import React, {useRef, useEffect} from 'react';
import {Text, View, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import { moderateScale,moderateScaleVertical } from '../../styles/styleconfig';

const Dot = ({delay}) => {
  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(bounce, {
          toValue: -8,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bounce, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounce]);

  return <Animated.View style={[styles.dot, {transform: [{translateY: bounce}]}]} />;
};

const LoadingButton = ({onPress, isLoading, text, buttonStyle}) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, isLoading && {opacity: 0.7}]}
      onPress={onPress}
      disabled={isLoading}>
      {isLoading ? (
        <View style={styles.dotsContainer}>
          <Dot delay={0} />
          <Dot delay={150} />
          <Dot delay={300} />
        </View>
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default LoadingButton;
// || '#28a745',
const styles = StyleSheet.create({
  button: {
    backgroundColor:colors.button,
    paddingVertical: moderateScaleVertical(14),
    borderRadius: 10,
    width: '100%',
     backgroundColor: '#28a745',
    paddingVertical: moderateScaleVertical(14),
    borderRadius: 10,
    elevation: 2,
    marginTop: moderateScaleVertical(10),
    minHeight: 50,
    justifyContent: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
