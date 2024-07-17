import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import ratingStar from '../../../assets/rating-star.png';
import Science from '../../../assets/science-image.png';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const QuizInfoCard = ({
    onPress,
    title,
    quizId,
    createdAt,
    questionNumber,
    isCompleted = false,
    startTime,
  }) => {
    const navigation = useNavigation();
    // const modalRef = useRef(null);
  ("in Quiz card",quizId);
    const startDate = new Date(startTime);
    const start_time = startDate.toDateString();
    const gmtDate = new Date(createdAt);
    const created_at = gmtDate.toDateString();
    ("created_at", created_at, "start_time", start_time);
  
    return (
      <View
        style={{
          marginHorizontal: 8,
          marginTop: 10,
          padding: 15,
          backgroundColor: 'white',
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',

          }}>
            <View style={{display:'flex',flexDirection: 'row',justifyContent:"space-between", alignItems: 'center'}}>
          <Image source={Science} style={{width: 35, height: 35}} />
          <Text style={{fontSize: 12, fontWeight: 500, color: '#374259',paddingLeft:10}}>
            {title}
          </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            
            <Text
              style={{
                fontSize: 18,
                color: '#394257',
                fontWeight: 700,
                marginRight: 10,
              }}>
              500
            </Text>
            <Image source={ratingStar} style={{width: 25, height: 25}} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#E5E5E5',
            height: 1,
            width: '100%',
            borderRadius: 5,
            borderStyle: 'dashed',
            marginTop: 10,
          }}
        />
        <View
          style={{
            marginTop: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{ display:'flex',flexDirection:'row', alignItems: 'center',justifyContent:'space-around'}}>
            {/* <Image source={Science} style={{borderRadius: 10, marginRight: 12}} /> */}
            <View style={{marginLeft: 5}}>
              <Text style={{fontSize: 10, fontWeight: 400}}>
                Date publish - {createdAt.split(',')[0]}
              </Text>
              {/* <Text style={{fontSize: 10, fontWeight: 400}}>{created_at}</Text> */}
            </View>
            
          </View>
          {/* {isCompleted ?( <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                backgroundColor: '#93AADA',
                justifyContent: 'center',
                alignItems: 'center',
                height: 25,
                borderRadius: 5,
              }}
              onPress={() => navigation.navigate("QuizReview",{quizId:quizId,title:title,questionNumber:questionNumber})}>
              <Text style={{fontSize: 12, color: 'white'}}>Review</Text>
            </TouchableOpacity>)  : (
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                backgroundColor: '#93AADA',
                justifyContent: 'center',
                alignItems: 'center',
                height: 25,
                borderRadius: 5,
              }}
              onPress={() => onPress(quizId, start_time, created_at)}>
              <Text style={{fontSize: 12, color: 'white'}}>Play Now</Text>
            </TouchableOpacity>
          )} */}
        </View>
      </View>
    );
  };

export default QuizInfoCard