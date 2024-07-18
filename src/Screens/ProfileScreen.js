import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { profileStyles } from '../Styles/ProfileStyles';
import ProfilePicture from '../../assets/profile-pic.png';
import RatingStar from '../../assets/rating-star.png';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getStudentProfile } from '../Services/Student';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { homeStyles } from '../Styles/HomeStyles';
import { getInitials } from '../Components/TopLeaders';
const ProfileScreen = ({ navigation }) => {
  const [data, setData] = useState({});

  const [isEditEnabled, setIsEditEnabled] = useState(false);

  const fetchData = async () => {
    const profile = await getStudentProfile();
    // (profile.yes_academy);
    setData(profile);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Splash');
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={{ backgroundColor: '#F5F5F5', flex: 1 }}>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          padding: 16,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}>
        <Header onPress={() => navigation.navigate('HomePage')} />
        <View style={{ alignItems: 'center' }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['rgba(147, 170, 218, 0.5)', '#FFFFFF']}
          locations={[0.2, 0.7]}
          style={{...homeStyles.initialsCircle, borderColor: 'crimson'}}>
          <Text style={homeStyles.initialsText}>
            {getInitials(`${data.first_name} ${data.last_name}`)}
          </Text>
        </LinearGradient>
          <Text
            style={{
              marginVertical: 7,
              fontSize: 14,
              fontWeight: 500,
              color: '#374259',
            }}>
            {data.first_name} {data.last_name}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: '400', color: '#748AA1' }}>
            Beginner
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          marginTop: 26,
          marginHorizontal: 7,
          borderRadius: 11,
          paddingVertical: 16,
          paddingHorizontal: 14,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{ width: '65%' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}>
            <Text style={{ fontSize: 12, fontWeight: '500', color: '#748AA1' }}>
              Email:
            </Text>
            <Text style={{ fontSize: 12, fontWeight: '600', color: '#031645' }}>
              {data.email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}>
            <Text style={{ fontSize: 12, fontWeight: '500', color: '#748AA1' }}>
              Phone Number:
            </Text>
            <Text style={{ fontSize: 12, fontWeight: '600', color: '#031645' }}>
              {data.phone}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}>
            <Text style={{ fontSize: 12, fontWeight: '500', color: '#748AA1' }}>
              Programme:
            </Text>
            <Text style={{ fontSize: 12, fontWeight: '600', color: '#031645' }}>
              {data.programme}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 16
            }}>
            <Text style={{ fontSize: 12, fontWeight: '500', color: '#748AA1' }}>
              Batch:
            </Text>
            <Text style={{ fontSize: 12, fontWeight: '600', color: '#031645' }}>
              {data.batch}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 12, fontWeight: '500', color: '#748AA1' }}>
              Student of Yes Academy:
            </Text>
            <Text style={{ fontSize: 12, fontWeight: '600', color: '#031645' }}>
              {data.yes_academy ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '35%',
          }}>
          <Image source={RatingStar} style={{ height: 41, width: 41 }} />
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#394257' }}>
            500
          </Text>
        </View>
      </View>
      {/* <View
        style={{
          backgroundColor: '#FFFFFF',
          marginVertical: 15,
          marginHorizontal: 7,
          borderRadius: 11,
          paddingVertical: 16,
          paddingHorizontal: 14,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 14, fontWeight: 500, color: '#394257'}}>
          Edit Profile
        </Text>
        <TouchableOpacity>
          <Ionicon name="create-outline" size={20} color={'#000000'} />
        </TouchableOpacity>
      </View> */}

      <TouchableOpacity
        style={{
          backgroundColor: '#FFFFFF',
          marginHorizontal: 7,
          borderRadius: 11,
          paddingVertical: 16,
          paddingHorizontal: 14,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 24
        }}
        onPress={logout}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#394257' }}>
          Logout
        </Text>
        <Ionicon name="arrow-forward-outline" size={20} color={'#000000'} />
      </TouchableOpacity>
    </View>
  );
};

const Header = ({ onPress }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      }}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Ionicons name="chevron-back-outline" size={24} color={'#000000'} />
      </TouchableOpacity>
      {/* <Text
        style={{
          fontSize: 19,
          fontWeight: 600,
          color: '#374259',
          marginLeft: 6,
        }}>
        Profile
      </Text> */}
    </View>
  );
};

export default ProfileScreen;
