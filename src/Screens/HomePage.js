import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  BackHandler,
  FlatList,
} from 'react-native';
import React, {useState, useContext, useEffect, useRef} from 'react';
import {Dimensions} from 'react-native';
import headerImage from '../../assets/header-image.png';
import profilePicture from '../../assets/profile-pic.png';
import ratingStar from '../../assets/rating-star.png';
import Carousel from 'react-native-snap-carousel';
import Teacher from '../../assets/teachers/teacher2.jpeg';
import CountdownTimer from '../Components/CountdownTimer';
import QuizCard from '../Components/QuizCard';
import {homeStyles} from '../Styles/HomeStyles';
import {QuestionContext} from '../Constants/ApiContext';
import axios from 'axios';
import {Modalize} from 'react-native-modalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {getAllQuizzes} from '../Services/Quiz';
import useRequest from '../Hooks/useRequest';
import {getLeaderboard, getStudentProfile} from '../Services/Student';
import TopLeaders, {getInitials} from '../Components/TopLeaders';
import LinearGradient from 'react-native-linear-gradient';
const HomePage = ({navigation}) => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const bottomsheetRef = useRef(null);
  const [studentLeaderBoard, setStudentLeaderBoard] = useState([]);
  const [topStudents, setTopstudents] = useState([]);
  const {
    questions,
    setQuestions,
    currentQuestionIndex,
    setQuizName,
    quizName,
    quizzes,
    setQuizzes,
  } = useContext(QuestionContext);
  const [logoutstatus, setLogoutStatus] = useState(false);
  const {makeRequest} = useRequest();
  // (await AsyncStorage.getItem('token'));
  const onOpen = () => {
    if (bottomsheetRef.current) {
      bottomsheetRef.current.open();
    }
  };

  useEffect(() => {
    if (logoutstatus) {
      navigation.navigate('Login');
    }
  }, [logoutstatus]);

  const {width: screenWidth} = Dimensions.get('window');
  const onPlay = quiz => {
    '=====>', quiz;
    const {_id, start_time, end_time} = quiz;
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
  const countTotalQuestions = quiz => {
    let totalQuestions = 0;
    for (const label in quiz.quiz) {
      totalQuestions += quiz.quiz[label].length;
    }
    return totalQuestions;
  };
  // ...
  const fetchLeaderboard = async () => {
    const leaderboard = await getLeaderboard();
    setTopstudents(leaderboard?.slice(0, 3));
    setStudentLeaderBoard(leaderboard);

    '---leaderboard--home-page API CALL ', leaderboard;
  };
  const fetchAllQuizzes = async () => {
    try {
      ('000>');
      const response = await getAllQuizzes();
      'response', response;
      setQuizzes(response);
      ('--');
    } catch (error) {
      ('__-----__');
      'Error fetching API data==>', error.message;
      try {
        await AsyncStorage.clear();
        if (error.message === 'TOKEN_EXPIRED') {
          setLogoutStatus(true);
          ('logout ');
        }
      } catch (e) {
        console.error('Error clearing AsyncStorage', e);
      }
    }
  };
  // const fetchAllQuizzes = async () => {
  //   try {

  //     ("000>");
  //     const response = await getAllQuizzes();

  //     setQuizzes(response);
  //    ("--");
  //   } catch (error) {
  //     ("__-----__");
  //     ('Error fetching API data==>', error);
  //     try {
  //       await AsyncStorage.clear();
  //     } catch (e) {
  //       console.error('Error clearing AsyncStorage', e);
  //     }

  //     if (error.message === 'TOKEN_EXPIRED') {

  //       setLogoutStatus(true);
  //     ("logout ");
  //     }

  //   }
  // };

  // const fetchAllQuizzes = async () => {
  //   try {
  //     const response = await getAllQuizzes();
  //     setQuizzes(response && response);
  //     if (quizzes) {
  //       const extractedQuestions = Object.entries(quizzes[0]?.quiz).flatMap(
  //         subjectQuestions => {
  //           return subjectQuestions[1].map(questionObj => ({
  //             key: subjectQuestions[0],
  //             answer: '',
  //             options: questionObj.options,
  //             question: questionObj.question,
  //           }));
  //         },
  //       );
  //       setQuizQuestions(extractedQuestions);
  //       ('--->', quizQuestions.length);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching API dataaaaaaaaaaaa', error.response);
  //   }
  // };

  const openURL = () => {
    const url = 'https://www.yesacademy.co.in/';
    Linking.openURL(url).catch(err =>
      console.error('Error opening URL: ', err),
    );
  };
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [studentData, setStudentData] = useState({});

  const fetchData = async () => {
    const profile = await getStudentProfile();
    setStudentData(profile);
  };

  useEffect(() => {
    fetchData();
    fetchAllQuizzes();
    fetchLeaderboard();
    const backAction = () => {
      navigation.navigate('SplashScreen');
      return false; // This will prevent the app from going back
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prevIndex => {
        const nextIndex = prevIndex + 1 === quizzes.length ? 0 : prevIndex + 1;
        if (carouselRef.current) {
          carouselRef.current.snapToItem(nextIndex);
        }

        return nextIndex;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer); // Clean up on component unmount
  }, [quizzes]);
  const flag = true;

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#F7F7F7'}}>
      <View style={homeStyles.container}>
        <View style={homeStyles.firstBlock}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen')}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={['rgba(147, 170, 218, 0.5)', '#FFFFFF']}
              locations={[0.2, 0.7]}
              style={{
                ...homeStyles.initialsCircle,
                marginTop: 16,
                marginRight: 10,
              }}>
              <Text style={homeStyles.initialsText}>
                {getInitials(
                  `${studentData?.first_name} ${studentData?.last_name}`,
                )}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={{marginTop: 30, width: '100%'}}>
            <View style={homeStyles.insideView1}>
              <Text style={homeStyles.beginnerText}>CS EET</Text>
              {/* <View style={{flexDirection: 'row', paddingTop: 10}}>
                <Text style={homeStyles.Text500}>500</Text>
                <Image source={ratingStar} />
              </View> */}
            </View>
            <View style={homeStyles.blankView1}>
              <View style={homeStyles.blankView2}></View>
            </View>
          </View>
        </View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['rgba(147, 170, 218, 0.5)', '#FFFFFF']}
          locations={[0.2, 0.7]}
          style={homeStyles.secondBlock}>
          <View style={{width: '65%'}}>
            <Text style={homeStyles.aboutText}>About Yes Academy</Text>
            <Text style={homeStyles.descriptionText}>
              YES Quiz app is designed by Yes Academy to help and prepare you
              for your CSEET exam. The questions have been drafted keeping in
              mind the exact paper pattern and updates in the syllabus. Solving
              these MCQs will ensure that you get optimum level of practice and
              score the HIGHEST in this first step of your CS journey!
            </Text>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={Teacher}
              style={{
                height: 60,
                width: 50,
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#374259',
                paddingVertical: 4,
                paddingHorizontal: 6,
                borderRadius: 5,
                marginTop: 5,
              }}
              onPress={openURL}>
              <Text style={{color: '#ffffff', fontWeight: 500}}>
                Learn More
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        {/* <View style={homeStyles.thirdBlock}>
          <View style={homeStyles.insideView2}>
            <Text style={homeStyles.mainExamText}>Main Exam</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={homeStyles.Text500}>500</Text>
              <Image source={ratingStar} />
            </View>
          </View>
          <View style={homeStyles.blankView3} />
          <View style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
            <Text style={homeStyles.liveText}>Going live on</Text>
            <Text style={homeStyles.dateText}>13/072023</Text>
          </View>
          <CountdownTimer
            containerStyle={homeStyles.countdownContainer}
            boxStyle={homeStyles.countdownBox}
            numberStyle={homeStyles.countdownNumber}
            textStyle={homeStyles.countdownText}
          />
          <View style={homeStyles.reminderButton}>
            <Text style={homeStyles.reminderText}>
              Get Ready for the Quiz !
            </Text>
          </View>
        </View> */}
        <View style={homeStyles.fourthBlock}>
          {flag ? (
            <>
              <View style={homeStyles.headingLeaderboardView}>
                <Text style={homeStyles.headingLeaderboardText}>
                  Leaderboard
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Leaderboard', {
                      leaderBoard: studentLeaderBoard,
                    })
                  }>
                  <Text style={homeStyles.fullLeaderboard}>
                    View full {`>`}
                  </Text>
                </TouchableOpacity>
              </View>
              <TopLeaders
                first={topStudents[1]}
                second={topStudents[0]}
                third={topStudents[2]}
              />
            </>
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 600, color: '#93AADA'}}>
                Leader Board Coming Soon
              </Text>
              <Ionicon name="lock-closed" size={100} color="#93AADA" />
            </View>
          )}
        </View>
        <View style={homeStyles.headingQuizView}>
          <Text style={homeStyles.headingQuizText}>Quizes</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AllQuizes');
            }}>
            <Text style={{fontSize: 12, fontWeight: 400, color: '#374259'}}>
              View All {`>`}
            </Text>
          </TouchableOpacity>
        </View>
        {quizzes && quizzes.length > 0 && (
          <Carousel
            ref={carouselRef}
            layout={'default'}
            data={quizzes}
            sliderWidth={screenWidth}
            itemWidth={screenWidth - 60} // Adjust as needed
            onSnapToItem={setActiveIndex}
            renderItem={({item}) => (
              <QuizCard
                onPress={() => onPlay(item)}
                quizId={item._id}
                title={item.name}
                createdAt={item.created_at}
                startTime={item.start_time}
                questionNumber={countTotalQuestions(item)}
              />
            )}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default HomePage;
