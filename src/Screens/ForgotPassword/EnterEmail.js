import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import headerImage from '../../../assets/header-image.png';
import {RenderError, reg} from '../../Constants/Util';
import useRequest from '../../Hooks/useRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {forgotPassword, login} from '../../Services/Auth';
import Ionicon from 'react-native-vector-icons/Ionicons';

const EnterEmail = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const disable = !reg.test(email);

  const {makeRequest} = useRequest();

  const resetPassword = async () => {
    const res = await forgotPassword(email);
    if (res === 200) {
      // await AsyncStorage.setItem('token', response.data.token);
      // navigation.navigate("HomePage");
      Alert.alert(
        'Reset Code has Been Sent to your Email',
        'Enter Code on Next screen.',
        [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('ResetPassword', {
                userEmail: email,
              }),
          },
        ],
      );
    } else {
      Alert.alert('Invalid details');
    }
  };

  const validate = () => {
    setLoading(true);
    makeRequest({
      endPoint: '/auth/forgot',
      method: 'POST',
      body: {
        email: email,
      },
      onSuccess: () => {
        navigation.navigate('ResetPassword');
        setEmail('');
      },
      onError: () => {
        Alert.alert('Please Enter valid email');
        setLoading(false);
      },
    });
  };
  

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#374259'}}>
      <Image
        source={headerImage}
        style={{alignSelf: 'flex-end', right: -40, top: -15}}
      />
      <TouchableOpacity
        style={{margin: 16, position: 'absolute'}}
        onPress={() => navigation.navigate('Login')}>
        <Ionicon name="arrow-back-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={{paddingHorizontal: 20}}>
        <Text style={{fontSize: 20, fontWeight: 500, color: 'white'}}>
          Enter Your Email
        </Text>

        <Text
          style={{
            fontSize: 12,
            fontWeight: 300,
            color: 'white',
            marginTop: 30,
          }}>
          E-mail
        </Text>
        <TextInput
          autoCapitalize="none"
          placeholder="Enter E-mail here"
          placeholderTextColor={'#000000'}
          style={{
            backgroundColor: 'white',
            borderRadius: 6,
            paddingHorizontal: 16,
            width: '100%',
            marginTop: 11,
            height: 45,
            color: '#000000',
          }}
          onChangeText={text => {
            setEmail(text.trim());
            setError(prev => ({...prev, email: !text}));
          }}
          keyboardType="email-address"
        />
        {error.email && <RenderError message="Enter your email" />}
        {email && !reg.test(email) && (
          <RenderError message="Enter Valid Email" />
        )}
      </View>

      <TouchableOpacity
        style={{
          paddingVertical: 15,
          width: '60%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: disable ? '#C4C4C4' : '#6989CC',
          alignSelf: 'center',
          borderRadius: 10,
          marginTop: 80,
        }}
        onPress={() => {
          resetPassword();
        }}
        disabled={disable}>
        {loading ? (
          <ActivityIndicator size={'small'} color={'#FFFFFF'} />
        ) : (
          <Text style={{fontSize: 16, fontWeight: 500, color: 'white'}}>
            Continue
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EnterEmail;
