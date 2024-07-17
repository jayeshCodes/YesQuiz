import axios from 'axios';
import { api } from './Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = "http://yesquiz-stage.eba-gwufjrqj.ap-south-1.elasticbeanstalk.com/api/v1"

export const getAllQuizzes = async () => {
  
    const token = await AsyncStorage.getItem('token');
    // (token);

    const response = await axios.get(`${BASE_URL}/quiz`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // (response?.data)
    
    return response?.data;
    
     };

export const getQuizbyID = async id => {
  try {
    const token = await AsyncStorage.getItem('token');
    // (token);

    const response = await axios.get(`${BASE_URL}/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    console.error('Error fetching API data', error);
  }
};
export const submitQuiz = async (id, data) => {
  try {
    const token = await AsyncStorage.getItem('token');
    (data)
    // (token);

    if (token) {
      const response = await axios.post(`${BASE_URL}/quiz/submit/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      (response);

      return response?.data;
    }
  } catch (error) {
    console.error('Error fetching API data', error);
    return null;
  }
};
