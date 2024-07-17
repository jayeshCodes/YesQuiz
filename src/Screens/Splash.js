import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import backgroundImage from '../../assets/splash-screen.png';
import {splashStyles} from '../Styles/SplashStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  const handle = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('token');
    if (token) {
      navigation.navigate('HomePage');
    } else {
      navigation.navigate('Login');
    }
    setIsLoading(false);
  };
  const [logoAnim] = useState(new Animated.Value(0));
  const [getStartedAnim] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.timing(getStartedAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={splashStyles.mainContainer}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={splashStyles.backgroundImage}
      />
      <Animated.Image
        source={require('../../assets/Logo.png')}
        style={{
          ...splashStyles.logo,
          opacity: logoAnim, // Bind opacity to animated value
          transform: [
            {
              translateY: logoAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-500, 0], // 0 : 150, 0.5 : 75, 1 : 0
              }),
            },
          ],
        }}
      />
      <Animated.View
        style={{
          ...splashStyles.getStartedButton,
          opacity: getStartedAnim, // Bind opacity to animated value
          transform: [
            {
              translateY: getStartedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [500, 0], // 0 : 500, 0.5 : 250, 1 : 0
              }),
            },
          ],
        }}>
        <TouchableOpacity onPress={handle}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={splashStyles.getStartedText}>Get Started</Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};


export default Splash;
