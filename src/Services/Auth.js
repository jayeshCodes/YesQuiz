import axios from 'axios';
import {api} from './Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const BASE_URL =
  'http://yesquiz-stage.eba-gwufjrqj.ap-south-1.elasticbeanstalk.com/api/v1';

export const redirectToLogin = async ({navigation}) => {
  await AsyncStorage.removeItem('token');

  navigation.navigate('Login');
};

export const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    return token;
  }
  return null;
};

export const checkToken = async () => {
  try {
    const response = await api.get('/auth/');
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    // (error);
  }
  return false;
};

export const logout = async () => {
  try {
    const response = await api.get('/auth/logout');
    if (response.status === 200) {
      localStorage.removeItem('token');
      //   window.location.replace(
      //     `https://auth.cs.yesquiz.in/logout?response_type=code&client_id=${
      //       import.meta.env.VITE_APP_COGNITO_APP_CLIENT_ID
      //     }&redirect_uri=${import.meta.env.VITE_APP_COGNITO_REDIRECT_URI}`,
      //   );
      return true;
    }
  } catch (error) {
    // (error);
  }
  return false;
};
export const login = async (
  email,
  password,
  isNewLogin = false,
  new_password,
) => {
  try {
    const body = isNewLogin
      ? {
          email: email,
          password: password,
          new_password: new_password,
        }
      : {
          email: email,
          password: password,
        };
    const response = await axios.post(`${BASE_URL}/auth`, body);
    (response.data.token);
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
      // navigation.navigate("HomePage");
    }
    return response;
  } catch (error) {
    (error.response);

    Alert.alert('Login Error', error.response?.data.message);
  }
};
export const signup = async (
  firstName,
  lastName,
  email,
  mobileNumber,
  programme,
  yesAcademy,
  enrollNumber,
) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: mobileNumber,
      programme: programme,
      batch: 'January',
      yes_academy: yesAcademy,
    });
    return response;
  } catch (error) {
    (error.response);
    Alert.alert(error.response?.data?.message);
  }
  return null;
};

export const forgotPassword = async (
  email,
  codeReceived = false,
  code,
  new_password,
) => {
  try {
    const body = codeReceived
      ? {
          email: email,
          code: code,
          new_password: new_password,
        }
      : {
          email: email,
        };
    const response = await axios.post(`${BASE_URL}/auth/forgot`, body);
    (response?.status, 'statussssss');
    return response.status;
  } catch (error) {
    (error.response);
    Alert.alert(error.response?.data.message);
  }
};
