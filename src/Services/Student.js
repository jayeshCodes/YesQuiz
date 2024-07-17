import axios from 'axios';
import {getToken} from './Auth';

const BASE_URL =
  'http://yesquiz-stage.eba-gwufjrqj.ap-south-1.elasticbeanstalk.com/api/v1';

export const getStudentProfile = async () => {
  const token = await getToken();
  const url = `${BASE_URL}/students`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching API data', error);
  }
  return response.data;
};


export const getLeaderboard = async id => {
  try {
    const token = await getToken();

    const response = await axios.get(`${BASE_URL}/metrics/students/leaderboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    (response?.data);
    return response?.data;
  } catch (error) {
    console.error('Error fetching API data', error);
  }
};

