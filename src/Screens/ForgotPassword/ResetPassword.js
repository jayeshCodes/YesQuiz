import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import headerImage from '../../../assets/header-image.png';
import {RenderError, reg} from '../../Constants/Util';
import {forgotPassword, login} from '../../Services/Auth';
import Ionicon from 'react-native-vector-icons/Ionicons';

const ResetPassword = ({navigation, route}) => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [hidePassword, setHidePassword] = useState(true);
  const disable = code.length === 0 || password.length === 0;

  const {userEmail} = route.params;

  const resetPassword = async () => {
    const res = await forgotPassword(userEmail, true, code, password);
    if (res === 200) {
      Alert.alert(
        'Reset Successful',
        'Your password has been reset successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ],
      );
    }
  };
  

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#374259'}}
      keyboardShouldPersistTaps="always">
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
        <Text style={{fontSize: 20, fontWeight: '500', color: 'white'}}>
          Enter Credentials
        </Text>

        <Text
          style={{
            fontSize: 12,
            fontWeight: '300',
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
          value={userEmail}
          editable={false}
        />

        <Text
          style={{
            fontSize: 12,
            fontWeight: '300',
            color: 'white',
            marginTop: 30,
          }}>
          Your Code
        </Text>
        <TextInput
          autoCapitalize="none"
          placeholder="Enter code"
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
            setCode(text.trim());
            setError(prev => ({...prev, code: !text}));
          }}
        />
        {error.code && <RenderError message="Enter your code" />}

        <Text
          style={{
            fontSize: 12,
            fontWeight: '300',
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
              position: 'relative',
            }}
            onChangeText={text => {
              setPassword(text.trim());
              setError(prev => ({...prev, password: !text}));
            }}
          />
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
          marginVertical: 50,
        }}
        onPress={() => {
          resetPassword();
        }}
        disabled={disable}>
        <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>
          Continue
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ResetPassword;
