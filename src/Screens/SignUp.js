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
import headerImage from '../../assets/header-image.png';
import {RenderError, reg} from '../Constants/Util';
import CourseComponent from '../Components/CourseComponent';
import useRequest from '../Hooks/useRequest';
import {signup} from '../Services/Auth';
import Ionicon from 'react-native-vector-icons/Ionicons';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState({});
  const [programme, setProgramme] = useState('');
  const [course1, setCourse1] = useState(false);
  const [course2, setCourse2] = useState(false);
  const [course3, setCourse3] = useState(false);
  const [show, setShow] = useState(false);
  const [selectYes, setSelectYes] = useState(false);
  const [selectNo, setSelectNo] = useState(false);
  const [yesAcademy, setYesAcademy] = useState();
  const [enrollNumber, setEnrollNumber] = useState('');
  const disable =
    !reg.test(email) ||
    firstName.length === 0 ||
    lastName.length === 0 ||
    (course1 === false && course2 === false && course3 === false) ||
    programme.length === 0 ||
    mobileNumber.length < 10;

  const signUpUser = async () => {
    try {
      const res = await signup(
        firstName,
        lastName,
        email,
        mobileNumber,
        programme,
        yesAcademy,
        enrollNumber,
      );
      if (res && res.status === 200) {
        navigation.navigate('NewLogin');
      }
    } catch (e) {
      (e);
    }
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
          Your Info
        </Text>

        <Text
          style={{
            fontSize: 12,
            fontWeight: 300,
            color: 'white',
            marginTop: 40,
          }}>
          First Name
        </Text>
        <TextInput
          placeholder="Enter first name here"
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
            setFirstName(text);
            setError(prev => ({...prev, firstName: !text}));
          }}
        />
        {error.firstName && <RenderError message="Enter first name" />}

        <Text
          style={{
            fontSize: 12,
            fontWeight: 300,
            color: 'white',
            marginTop: 30,
          }}>
          Last Name
        </Text>
        <TextInput
          placeholder="Enter last name here"
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
            setLastName(text);
            setError(prev => ({...prev, lastName: !text}));
          }}
        />
        {error.lastName && <RenderError message="Enter last name" />}

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
          placeholder="Enter e-mail here"
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
          Mobile Number
        </Text>
        <TextInput
          placeholder="Your Mobile number"
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
          maxLength={10}
          keyboardType={'numeric'}
          onChangeText={text => {
            text = text ? text?.replace(/[,.-]/g, '').replace(/^0+/, '') : '';
            setMobileNumber(text.trim());
            setError(prev => ({...prev, mobileNumber: !text}));
          }}
        />
        {error.mobileNumber && <RenderError message="Enter Mobile Number" />}
        {mobileNumber && mobileNumber.length !== 10 && (
          <RenderError message="Enter Valid Mobile Number" />
        )}

        <Text
          style={{
            fontSize: 12,
            fontWeight: 300,
            color: 'white',
            marginTop: 30,
          }}>
          Select the course you are learning
        </Text>
        {/* <View style={{flexDirection: 'row', marginTop: 11}}>
          <CourseComponent
            text={'CS EET'}
            onPress={() => {
              setCourse1(!course1);
              setProgramme('CS EET');
            }}
            selected={course1}
            disable={course2 || course3 ? true : false}
          />

          <CourseComponent
            text={'CS Executive'}
            onPress={() => {
              setCourse2(!course2);
              setProgramme('CS Executive');
            }}
            selected={course2}
            disable={course1 || course3 ? true : false}
          />
          <CourseComponent
            text={'CS Professional'}
            onPress={() => {
              setCourse3(!course3);
              setProgramme('CS Professional');
            }}
            selected={course3}
            disable={course1 || course2 ? true : false}
          />
        </View> */}
         <View style={{flexDirection: 'row', marginTop: 11}}>
      <CourseComponent
        text={'CS EET'}
        onPress={() => {
          setCourse1(!course1);
          setProgramme('CS EET');
        }}
        selected={course1}
        disable={course2 || course3 ? true : false} // modified to include course3
      />

      <CourseComponent
        text={'CS Executive'}
        onPress={() => {
          setCourse2(!course2);
          setProgramme('CS Executive');
        }}
        selected={course2}
        disable={course1 || course3 ? true : false} // modified to include course3
      />

      <CourseComponent // new CourseComponent for the "Law" program
        text={'Law'}
        onPress={() => {
          setCourse3(!course3);
          setProgramme('Law');
        }}
        selected={course3}
        disable={course1 || course2 ? true : false}
      />
    </View>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 300,
            color: 'white',
            marginTop: 30,
          }}>
          Are you student of Yes Academy ?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 11,
          }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              paddingVertical: 14,
              backgroundColor: selectYes ? '#6A89CC' : 'white',
              borderRadius: 5,
              marginRight: 25,
            }}
            onPress={() => {
              setSelectYes(!selectYes);
              setYesAcademy(true);
            }}
            disabled={selectNo}>
            <Text style={{fontSize: 12, fontWeight: 400, color: 'black'}}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              paddingVertical: 14,
              backgroundColor: selectNo ? '#6A89CC' : 'white',
              borderRadius: 5,
            }}
            onPress={() => {
              setSelectNo(!selectNo);
              setYesAcademy(false);
            }}
            disabled={selectYes}>
            <Text style={{fontSize: 12, fontWeight: 400, color: 'black'}}>
              No
            </Text>
          </TouchableOpacity>
        </View>
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
          marginTop: 40,
          marginBottom: 20,
        }}
        onPress={() => {
          signUpUser();
        }}
        disabled={disable}>
        <Text style={{fontSize: 16, fontWeight: 500, color: 'white'}}>
          Continue
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignUp;
