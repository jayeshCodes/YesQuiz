import React, {useState, useEffect, useRef} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import QuizCard from '../Components/QuizCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {getAllQuizzes} from '../Services/Quiz';
import {create} from 'react-test-renderer';
import {Modalize} from 'react-native-modalize';
import {homeStyles} from '../Styles/HomeStyles';
import ratingStar from '../../assets/rating-star.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createMaterialTopTabNavigator();

const countTotalQuestions = quiz => {
  let totalQuestions = 0;
  for (const label in quiz.quiz) {
    totalQuestions += quiz.quiz[label].length;
  }
  return totalQuestions;
};

const QuizScreen = ({navigation}) => {
  const [data, setData] = useState({});
  const [quiz, setQuiz] = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);
  const bottomsheetRef = useRef(null);

  const onPlay = quiz => {
    const {_id, start_time, end_time} = quiz;
    'quizz ', quiz;
    // navigation.navigate('QuizScreen', {quizId: _id});
    //   ("=====>",quiz);

    '-', _id;
    let currentDate = new Date();
    let startDateObj = new Date(start_time);

    let endDateObj = end_time ? new Date(end_time) : null;

    if (startDateObj > currentDate) {
      Alert.alert('Quiz has not yet started');
    } else if (
      startDateObj.toDateString() === currentDate.toDateString() &&
      startDateObj.getTime() > currentDate.getTime()
    ) {
      Alert.alert('Quiz has not yet started');
    } else if (endDateObj && endDateObj < currentDate) {
      Alert.alert('Quiz has already ended');
    } else {
      navigation.navigate('QuizScreen', {quizId: quiz._id});
    }
  };

  const fetchAllQuizzes = async () => {
    try {
      const response = await getAllQuizzes();
      response;
      setData(response && response);
    } catch (error) {
      console.error('Error fetching API data', error);
    }
  };
  const onQuizPress = quiz => {
    setQuiz(quiz);
    bottomsheetRef.current?.open();
  };

  // const fetchData = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     const url =
  //       'http://yesquiz-stage.eba-gwufjrqj.ap-south-1.elasticbeanstalk.com/api/v1/quiz';
  //     const response = await axios.get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     // (response.data)
  //     setData(response?.data);
  //   } catch (error) {
  //     console.error('Error fetching API data', error);
  //   }
  //   // (data && data)
  // };

  useEffect(() => {
    fetchAllQuizzes();
  }, []);

  return (
    <View>
      {data && data.length === 0 && (
        <Text style={{color: 'black', margin: 80, textAlign: 'center'}}>
          No Quizes Available
        </Text>
      )}
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        renderItem={item => {
          let rendereditem = item.item;
          return (
            <QuizCard
              onPress={() => onPlay(rendereditem)}
              quizId={rendereditem?._id}
              title={rendereditem?.name}
              createdAt={rendereditem?.created_at}
              startTime={rendereditem?.start_time}
              questionNumber={countTotalQuestions(rendereditem)}
            />
          );
        }}
      />
      {/* <Modalize
          ref={bottomsheetRef}
          // adjustToContentHeight
          handlePosition="inside"
          onOverlayPress={() => bottomsheetRef.current.close()}>
          <View style={{...homeStyles.bottomSheetContainer}}>
            <Text style={{...homeStyles.bottomSheetHeader}}>QUIZ RULES</Text>
            <View style={{...homeStyles.pointsContainer}}>
              <Image source={ratingStar} />
              <Text style={{...homeStyles.pointsText}}>Points</Text>
            </View>
            <Text style={{...homeStyles.bottomSheetSubText}}>
              For each correct answer you are given 3 points. Point’s add up and
              increase your level.
            </Text>
            <View style={{...homeStyles.lifelinesContainer}}>
              <View style={{...homeStyles.pollsIconContainer}}>
                <Text style={{...homeStyles.lifelineIcon}}>P</Text>
              </View>
              <Text style={{...homeStyles.lifelineText}}>Poll</Text>
            </View>
            <Text style={{...homeStyles.bottomSheetSubText}}>
              Allows you to get hint from the other player poll, allowed once
              per quiz
            </Text>
            <View style={{...homeStyles.lifelinesContainer}}>
              <View style={{...homeStyles.fiftyFiftyIconContainer}}>
                <Text style={{...homeStyles.lifelineIcon}}>F</Text>
              </View>
              <Text style={{...homeStyles.lifelineText}}>50:50</Text>
            </View>
            <Text style={{...homeStyles.bottomSheetSubText}}>
              Removes 2 Wanted Options.
            </Text>
            <TouchableOpacity
              style={{...homeStyles.startButton}}
              onPress={()=>{onPlay(quiz)}}>
              <Text style={{...homeStyles.startText}}>Start</Text>
            </TouchableOpacity>
          </View>
        </Modalize> */}
    </View>
  );
};

const QuizCompletedScreen = () => {
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const url =
        'http://yesquiz-stage.eba-gwufjrqj.ap-south-1.elasticbeanstalk.com/api/v1/quiz?submitted=true';
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // (response.data)
      setData(response?.data);
    } catch (error) {
      console.error('Error fetching API data', error);
    }
    // (data && data)
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View>
      {data && data.length === 0 && (
        <Text style={{color: 'black', margin: 80, textAlign: 'center'}}>
          No Quizes Completed
        </Text>
      )}
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          item;
          return (
            <QuizCard
              submittedData={item.submission}
              quizId={item._id}
              title={item.name}
              questionNumber={countTotalQuestions(item)}
              createdAt={item.created_at}
              isCompleted={true}
            />
          );
        }}
      />
    </View>
  );
};

const Header = ({onPress}) => (
  <View
    style={{paddingHorizontal: 20, paddingTop: 20, backgroundColor: 'white'}}>
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Ionicons name="chevron-back-outline" size={24} color={'#000000'} />
    </TouchableOpacity>
  </View>
);

const AllQuizes = ({navigation}) => {
  return (
    <>
      <Header onPress={() => navigation.navigate('HomePage')} />
      <Tab.Navigator
        screenOptions={{
          labelStyle: {fontSize: 14, fontWeight: 500},
          indicatorStyle: {borderBottomColor: '#374259', borderBottomWidth: 4},
          activeTintColor: '#374259',
          inactiveTintColor: 'grey',
        }}>
        <Tab.Screen name="Quiz" component={QuizScreen} />
        <Tab.Screen name="Quiz Completed" component={QuizCompletedScreen} />
      </Tab.Navigator>
    </>
  );
};

export default AllQuizes;
