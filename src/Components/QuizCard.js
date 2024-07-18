import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import ratingStar from '../../assets/rating-star.png';
import Science from '../../assets/science-image.png';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
const QuizCard = ({
  onPress,
  title,
  quizId,
  createdAt,
  questionNumber,
  isCompleted = false,
  startTime,
  submittedData = {},
}) => {
  const navigation = useNavigation();
  const modalRef = useRef(null);
  'in Quiz card', quizId;
  const startDate = new Date(startTime);
  const start_time = startDate.toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
  });
  // (start_time);
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };
  // (typeof(createdAt))
  const gmtDate = new Date(createdAt);
  const created_at = gmtDate.toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
  });

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={['rgba(147, 170, 218, 0.5)', '#FFFFFF']}
      locations={[0.2, 0.7]}
      style={{
        marginHorizontal: 8,
        marginTop: 10,
        padding: 15,
        backgroundColor: 'transparent',
        borderRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Text style={{fontSize: 12, fontWeight: '500', color: '#0E0E0E'}}>
          {title}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 18,
              color: '#394257',
              fontWeight: '700',
              marginRight: 10,
            }}>
            {questionNumber}
          </Text>
          <Image source={ratingStar} style={{width: 25, height: 25}} />
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#374259',
          height: 2,
          width: '100%',
          borderColor: '#93AADA',
          borderWidth: 1,
          borderRadius: 5,
          marginTop: 10,
          opacity: 0.1,
        }}
      />
      <View
        style={{
          marginTop: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicon name="pencil" size={24} color="#93AADA" />
          {/* <Image source={Science} style={{borderRadius: 10, marginRight: 12}} /> */}
          <View style={{marginLeft: 5}}>
            <Text style={{fontSize: 10, fontWeight: '400', color: '#000000'}}>
              Questions - {questionNumber}
            </Text>
            <Text style={{fontSize: 10, fontWeight: '400', color: '#000000'}}>
              {created_at}
            </Text>
          </View>
        </View>
        {isCompleted ? (
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              backgroundColor: '#93AADA',
              justifyContent: 'center',
              alignItems: 'center',
              height: 25,
              borderRadius: 5,
            }}
            onPress={() =>
              navigation.navigate('QuizReview', {
                quizId: quizId,
                title: title,
                startTime: startTime,
                createdAt: created_at,
                questionNumber: questionNumber,
                submittedData: submittedData,
              })
            }>
            <Text style={{fontSize: 12, color: 'white'}}>Review</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              backgroundColor: '#374259',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#667CAA',
              height: 25,
              borderRadius: 5,
            }}
            onPress={() => onPress(quizId, start_time, created_at)}>
            <Text style={{fontSize: 12, color: 'white'}}>Play Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

export default QuizCard;
