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
import React, {useState} from 'react';
import headerImage from '../../assets/header-image.png';
import {RenderError, reg} from '../Constants/Util';
import useRequest from '../Hooks/useRequest';
import {login} from '../Services/Auth';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from '@react-navigation/native';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const disable = !reg.test(email);

  const {makeRequest} = useRequest();

  const loginUser = async () => {
    try {
      const res = await login(email, password, false, '');

      // (res && res);
      if (res?.status === 200) {
        if (
          res?.data?.message &&
          res?.data?.message === 'NEW_PASSWORD_REQUIRED'
        ) {
          navigation.navigate('NewLogin');
        } else {
          const token = await AsyncStorage.getItem('token');
          if (token) navigation.navigate('HomePage');
          // else Alert.alert('Incorrect Credentials')
        }
      }
    } catch (e) {
      (e);
    }
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    const isValidLength = password.length >= 5;
    return hasUpperCase && hasSpecialChar && isValidLength;
  };
  const validate = () => {
    setLoading(true);
    makeRequest({
      endPoint: '/auth/forgot',
      method: 'POST',
      body: {
        email: email,
      },
      onSuccess: async res => {
        const token = res?.token;
        if (token) {
          await AsyncStorage.setItem('token', token);
          navigation.navigate('HomePage');
        } else {
          Alert.alert('Incorrect Credentials');
        }
        setEmail('');
        setPassword('');
        setLoading(false);
      },
      onError: () => {
        Alert.alert('Please Try again');
        setLoading(false);
      },
    });
  };

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#374259'}}
      keyboardShouldPersistTaps="always">
      <Image
        source={headerImage}
        style={{alignSelf: 'flex-end', right: -40, top: -15}}
      />
      <View style={{paddingHorizontal: 20}}>
        <Text style={{fontSize: 20, fontWeight: 500, color: 'white'}}>
          Login
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
          placeholder="Email"
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

        <Text
          style={{
            fontSize: 12,
            fontWeight: 300,
            color: 'white',
            marginTop: 30,
          }}>
          Password
        </Text>
        <View>
          <TextInput
            autoCapitalize="none"
            secureTextEntry={hidePassword}
            placeholder="password"
            placeholderTextColor={'#000000'}
            style={{
              backgroundColor: 'white',
              borderRadius: 6,
              paddingLeft: 16,
              paddingRight: 40,
              width: '100%',
              marginTop: 11,
              height: 45,
              position: 'relative',
              color: '#000000',
            }}
            onChangeText={text => {
              setPassword(text.trim());
              setError(prev => ({...prev, password: !validatePassword(text)}));
            }}
          />
          {error.password && <RenderError message="Password must have at least 1 uppercase letter, 1 special character, and be at least 5 characters long" />}
          <TouchableOpacity
            style={{position: 'absolute', right: 10, top: 20}}
            onPress={() => setHidePassword(!hidePassword)}>
            {hidePassword ? (
              <Ionicon name="eye-outline" size={24} color={'#000000'} />
            ) : (
              <Ionicon name="eye-off-outline" size={24} color={'#000000'} />
            )}
          </TouchableOpacity>
        </View>
   
        <TouchableOpacity
          style={{marginTop: 4, alignSelf: 'flex-end'}}
          onPress={() => navigation.navigate('EnterEmail')}>
          <Text style={{fontSize: 14, fontWeight: 500, color: '#FFFFFF'}}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
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
          loginUser();
          // setEmail('')
          // setPassword('')
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

      <Text
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: '#FFFFFF',
          marginTop: 10,
          textAlign: 'center',
        }}>
        If you're new here ,
         
        <Link style={{
          color: 'lightblue',
          fontWeight: 600,
          textDecorationLine: 'underline',
        }} to="/SignUp">Click Here!</Link>
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: '#FFFFFF',
          marginTop: 10,
          textAlign: 'center',
        }}>
        For Login using phone number ,
         
        <Link style={{
          color: 'lightblue',
          fontWeight: 600,
          textDecorationLine: 'underline',
        }} to="/LoginMobile">Click Here!</Link>
      </Text>
    </ScrollView>
  );
};

export default Login;