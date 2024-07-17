import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import headerImage from '../../assets/header-image.png';
import { RenderError, reg } from '../Constants/Util';
import { getToken, login } from '../Services/Auth';
import Ionicon from 'react-native-vector-icons/Ionicons';

const NewLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [oneTimePassword, setOneTimePassword] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [hidePassword, setHidePassword] = useState(true);
  const disable = !reg.test(email);

  const newLogin = async () => {
    try {
      const res = await login(email, oneTimePassword, true, password);
      (res);
      if (res?.status === 200) {
        if (getToken()) navigation.navigate('HomePage');
      }
    } catch (e) {
      (e);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#374259' }}>
      <Image
        source={headerImage}
        style={{ alignSelf: 'flex-end', right: -40, top: -15 }}
      />
      <TouchableOpacity
        style={{ margin: 16, position: 'absolute' }}
        onPress={() => navigation.navigate('Login')}>
        <Ionicon name="arrow-back-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>
          Enter Credentials
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
            setError(prev => ({ ...prev, email: !text }));
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
          One Time Password
        </Text>
        <TextInput
          autoCapitalize="none"
          placeholder="Enter one time password here"
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
            setOneTimePassword(text.trim());
            setError(prev => ({ ...prev, oneTimePassword: !text }));
          }}
          keyboardType="email-address"
        />
        {error.oneTimePassword && (
          <RenderError message="Enter your one time password" />
        )}

        <Text
          style={{
            fontSize: 12,
            fontWeight: 300,
            color: 'white',
            marginTop: 30,
          }}>
          New Password
        </Text>
        <View>
          <TextInput
            autoCapitalize="none"
            placeholder="Enter new password here"
            placeholderTextColor={'#000000'}
            secureTextEntry={hidePassword}
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
              setPassword(text.trim());
              setError(prev => ({ ...prev, password: !text }));
            }}
          />
          <TouchableOpacity
            style={{ position: 'absolute', right: 10, top: 20 }}
            onPress={() => setHidePassword(!hidePassword)}>
            {hidePassword ? (
              <Ionicon name="eye-outline" size={24} color={'#000000'} />
            ) : (
              <Ionicon name="eye-off-outline" size={24} color={'#000000'} />
            )}
          </TouchableOpacity>
        </View>
        {error.password && <RenderError message="Enter your new password" />}
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
          newLogin();
        }}
        disabled={disable}>
        <Text style={{ fontSize: 16, fontWeight: 500, color: 'white' }}>
          Continue
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NewLogin;
