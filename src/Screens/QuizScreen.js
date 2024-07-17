import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  BackHandler,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useContext, useRef} from 'react';
import {CommonActions} from '@react-navigation/native';
import ratingStar from '../../assets/rating-star.png';
// import OptionsCard from '../Components/OptionsCard';
import {quizScreenStyles} from '../Styles/QuizScreenStyles';
import {QuestionContext} from '../Constants/ApiContext';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {getQuizbyID, submitQuiz} from '../Services/Quiz';
import {Modalize} from 'react-native-modalize';
import {Dimensions} from 'react-native';

/*{"Business Communication": [{"options": [Array], "question": "Question 1"}, {"options": [Array], "question": "Question 2"}, {"options": [Array], "question": "Question 3"}], "Business Environment": [{"options": [Array], "question": "Question 1"}, {"options": [Array], "question": "Question 2"}, {"options": [Array], "question": "Question 3"}], "Current Affairs": [{"options": [Array], "question": "Question 1"}, {"options": [Array], "question": "Question 2"}, {"options": [Array], "question": "Question 3"}], "Economics": [{"options": [Array], "question": "Question 1"}, {"options": [Array], "question": "Question 2"}, {"options": [Array], "question": "Question 3"}], "Legal Aptitude": [{"options": [Array], "question": "Question 1"}, {"options": [Array], "question": "Question 2"}, {"options": [Array], "question": "Question 3"}], "Logical Reasoning": [{"options": [Array], "question": "Question 1"}, {"options": [Array], "question": "Question 2"}, {"options": [Array], "question": "Question 3"}]} */
const QuizScreen = ({route, navigation}) => {
  // id of quiz from navigation
  const [currrentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(59);
  const [timeTaken, settimeTaken] = useState(0);
  const [disable, setDisable] = useState(false);
  const [randOption1, setRandOption1] = useState();
  const [randOption2, setRandOption2] = useState();
  const [fiftyFifty, setFiftyFifty] = useState(false);
  const [disableFifty, setDisableFifty] = useState(false);
  const [quiz, setQuiz] = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [IncorrectOptions, setIncorrectOptions] = useState([]);
  const [audiencePollUsed, setAudiencePollUsed] = useState(false);
  const [disableaudiencepoll, setdisableaudiencepoll] = useState(false);
  const [edjecaseState, setedjecaseState] = useState(false);
  const [optionStates, setOptionStates] = useState([]);
  // const {height: screenHeight} = Dimensions.get('window');

  const {
    getCurrentQuestion,
    getCurrentOptions,
    handleNextQuestion,
    currentQuestionIndex,
    questions,
    setCorrectOption,
    quizName,
  } = useContext(QuestionContext);
  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  function generateVotePercentages(options, correctAnswer) {
    // Generate random percentages for each option
    const percentages = options.map(() => Math.random() * 10 + 10); // Lower the maximum random value for incorrect answers

    // Find the index of the correct answer
    const correctIndex = options.indexOf(correctAnswer);

    // Set the correct answer percentage to a random value greater than 70
    percentages[correctIndex] = Math.random() * 10 + 70; // Increase the minimum random value for the correct answer

    // Normalize the percentages so they add up to 100
    const sum = percentages.reduce((a, b) => a + b, 0);
    const normalizedPercentages = percentages.map(val => (val / sum) * 100);

    return normalizedPercentages;
  }
  const [selectedOption, setSelectedOption] = useState(null);
  const getCurrentQuiz = async () => {
    const {quizId} = route.params;
    const quiz = await getQuizbyID(quizId);
    quiz.quiz['Business Communication'];
    const extractedQuestions = Object.entries(quiz.quiz).flatMap(
      subjectQuestions => {
        '00000????', subjectQuestions[1];
        return subjectQuestions[1].map(questionObj => ({
          //save Object keys as array
          key: subjectQuestions[0],
          answer: '',
          correct_answer: questionObj.answer,
          options: questionObj.options,
          votes: generateVotePercentages(
            questionObj.options,
            questionObj.answer,
          ),
          question: questionObj.question,
        }));
      },
    );
    '--->', extractedQuestions;
    setQuizQuestions(extractedQuestions);
    // for(let key in quiz.quiz){

    //     setQuizQuestions(prev => [...prev, ...quiz.quiz[key]]);
    // }

    setQuiz(quiz);
  };

  const onPressOption = value => {
    const newQuizQuestions = [...quizQuestions];

    newQuizQuestions[currrentIndex].answer = value;
    setedjecaseState(true);
    setQuizQuestions(newQuizQuestions);
    setDisable(true);
    setSelectedOption(value);
  };
  const onPress50 = () => {
    setFiftyFifty(true);
    setDisable(false);
    setedjecaseState(false);
    setDisableFifty(true);
    setSelectedOption("");

    // Get the current question
    const currentQuestion = quizQuestions[currrentIndex];

    // Get all incorrect options
    const incorrectOptions = currentQuestion.options.filter(
      option => option !== currentQuestion?.correct_answer,
    );

    // Randomly select one incorrect option
    const randIndex = Math.floor(Math.random() * incorrectOptions.length);
    const randomIncorrectOption = incorrectOptions[randIndex];

    // Set the correct option in RandOption1 and incorrect option in RandOption2
    setRandOption1(currentQuestion?.correct_answer);
    setRandOption2(randomIncorrectOption);
    setIncorrectOptions(incorrectOptions);
  };

  const onPressAudiencePoll = () => {
    setAudiencePollUsed(true);
    setFiftyFifty(false);
    setDisable(false);
    if (!disableaudiencepoll) {
      onOpen();
    }
    setdisableaudiencepoll(true);
    setSelectedOption("");
  };

  // (quiz);
  const onQuizSubmit = async () => {
    try {
      const {quizId} = route.params;
      console.log(quizId, 'quiz id'); // Assuming this was meant for logging

      // Refactor data aggregation using reduce
      const quizData = quizQuestions.reduce((acc, question) => {
        if (question) {
          const key = question.key;
          acc[key] = acc[key] || [];
          acc[key].push({
            response: question.answer,
            question: question.question,
            options: question.options,
          });
        }
        return acc;
      }, {});

      console.log('-->quizData', quizData);

      const data = {
        response: quizData,
        time_taken: timeTaken,
        lives_used: 2,
      };

      const submitResponsedata = await submitQuiz(quizId, data);
      console.log(submitResponsedata, 'submitResponsedata');

      if (submitResponsedata) {
        // Success: Navigate to Result
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {name: 'AllQuizes'},
              {
                name: 'Result',
                params: {
                  correct_answers: submitResponsedata.correct_responses,
                  total_questions: submitResponsedata.total_questions,
                  time_taken: timeTaken,
                },
              },
            ],
          }),
        );
      } else {
        // No data returned: Treat as an error
        throw new Error('quiz was not not submitted try again');
      }
    } catch (error) {
      // Error handling
      console.error(error);
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };
  const onPressNext = () => {
    if (currrentIndex + 1 < quizQuestions.length) {
      setCurrentIndex(currrentIndex + 1);

      setTimeLeft(59);
    } else {
      onQuizSubmit();
    }
    setTimeLeft(59);
  };
  const startTimer = () => {
    timer = setTimeout(() => {
      if (timeLeft <= 0) {
        clearTimeout(timer);
        return false;
      }
      setTimeLeft(timeLeft - 1);
      settimeTaken(timeTaken + 1);
    }, 1000);
  };
  // useEffect(() => {
  //   getCurrentQuiz();
  // }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to end the quiz?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            // Reset the navigation stack to have 'HomePage' as the only screen
            navigation.reset({
              index: 0,
              routes: [{name: 'AllQuizes'}],
            });
            onQuizSubmit();
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      ('focus called on navigation');
      getCurrentQuiz();
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    startTimer();
    if (timeLeft === 0) {
      onPressNext();
    }
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    setDisable(false);
    setFiftyFifty(false);
    setAudiencePollUsed(false);
  }, [currrentIndex]);

  return (
    <View style={{...quizScreenStyles.quizContainer, height: `100%`}}>
      <View style={quizScreenStyles.timerContainer}>
        <Text style={quizScreenStyles.timer}>00:{timeLeft}</Text>
      </View>
      <View
        style={{
          position: 'absolute',
          zIndex: 10,
          top: 69,
          left: 60,
          width: 55,
          height: 55,
          backgroundColor: disableaudiencepoll ? '#0000001A' : '#0C3A5B',
          justifyContent: 'center',
          alignItems: 'center',
          transformOrigin: {x: 0, y: 0},
          overflow: 'visible',
          borderColor: disableaudiencepoll ? '#0000001A' : '#FFF200',
          elevation: 10,
          borderRadius: 38,
          shadowColor: '#00000021',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.2,
          shadowRadius: 30,
          borderWidth: 4,
          borderStyle: 'solid',
          opacity: 1,
        }}>
        <TouchableOpacity
          onPress={onPressAudiencePoll}
          disabled={disableaudiencepoll}>
          <Ionicon
            name="people"
            size={30}
            color={disableaudiencepoll ? '#0000001A' : '#FFF200'}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          zIndex: 10,
          top: 69,
          right: 60,
          width: 55,
          height: 55,
          backgroundColor: disableFifty ? '#0000001A' : '#0C3A5B',
          justifyContent: 'center',
          alignItems: 'center',
          transformOrigin: {x: 0, y: 0},
          overflow: 'visible',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: disableFifty ? '#0000001A' : '#FFF200',
          elevation: 10,
          borderRadius: 38,
          shadowColor: '#00000021',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.2,
          shadowRadius: 30,
          borderWidth: 4,
          borderStyle: 'solid',
          opacity: 1,
        }}
        onPress={onPress50}
        disabled={disableFifty}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: disableFifty ? '#0000001A' : '#FFF200',
          }}>
          50:50
        </Text>
      </TouchableOpacity>
      <View style={quizScreenStyles.headingContainer}>
        <Text style={quizScreenStyles.heading}>{quiz?.name}</Text>
      </View>
      <View
        style={{marginVertical: 10, marginHorizontal: 10, borderRadius: 10}}>
        <View style={quizScreenStyles.questionsContainer}>
          <Text style={quizScreenStyles.questionText}>
            {quizQuestions[currrentIndex]?.question}
          </Text>
        </View>
      </View>

      <ScrollView
        style={{marginVertical: 10, marginHorizontal: 10, borderRadius: 10}}>
        <View style={quizScreenStyles.optionsContainer}>
          <FlatList
            data={quizQuestions[currrentIndex]?.options}
            keyExtractor={(item, index) => item.id || index.toString()}
            renderItem={({item, index}) => {
              const votePercentage = quizQuestions[currrentIndex]?.votes[index];
              // (item)

              return fiftyFifty ? (
                IncorrectOptions.includes(item) ? (
                  <>
                    <OptionsCard
                      option={item}
                      answer={quizQuestions[currrentIndex]?.correct_answer}
                      onPress={() => onPressOption(item)}
                      wrong={
                        item.toLowerCase() == IncorrectOptions[0].toLowerCase()
                          ? false
                          : true
                      }
                      disabled={
                        selectedOption?selectedOption==item:false
                      }
                      questionIndex={currrentIndex}
                    />
                  </>
                ) : (
                  <>
                    <OptionsCard
                      option={item}
                      answer={quizQuestions[currrentIndex]?.correct_answer}
                      wrong={false}
                      onPress={() => onPressOption(item)}
                      disabled={
                        selectedOption?selectedOption==item:false
                      }
                      questionIndex={currrentIndex}
                    />
                  </>
                )
              ) : (
                <OptionsCard
                  option={item}
                  answer={quizQuestions[currrentIndex]?.correct_answer}
                  wrong={false}
                  onPress={() => onPressOption(item)}
                  disabled={
                    selectedOption?selectedOption==item:false
                  }
                  questionIndex={currrentIndex}
                />
              );
            }}
            ListFooterComponent={() => (
              <TouchableOpacity
                style={{
                  ...quizScreenStyles.nextButton,
                  display: disable ? 'flex' : 'none',
                  backgroundColor: disable ? '#00A0E3' : 'grey',
                  borderBottomWidth: 3,
                  borderStyle: 'solid',
                  borderColor: '#0F3B5A',
                }}
                disabled={disable ? false : true}
                onPress={() => onPressNext()}>
                <Text style={quizScreenStyles.nextText}>
                  {currrentIndex + 1 === quizQuestions.length
                    ? 'Submit'
                    : 'Next'}
                </Text>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
      <Modalize
        ref={modalizeRef}
        modalStyle={{
          marginTop: 10,
          paddingVertical: 45,
          paddingHorizontal: 50,
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
        withHandle={true}>
        <View style={quizScreenStyles.optionsContainer}>
          <FlatList
            data={quizQuestions[currrentIndex]?.options}
            keyExtractor={(item, index) => item.id || index.toString()}
            renderItem={({item, index}) => {
              const votePercentage = quizQuestions[currrentIndex]?.votes[index];
              const optionLetter = String.fromCharCode(65 + index);
              // (item)
              return (
                <OptionsCard
                  option={optionLetter}
                  answer={item}
                  onPress={() => onPressOption(item)}
                  disabled={false}
                  questionIndex={currrentIndex}
                  votePercentage={votePercentage}
                  audiencePollUsed={audiencePollUsed}
                />
              );
            }}
            scrollEnabled={false}
          />
        </View>
      </Modalize>
    </View>
  );
};

const OptionsCard = ({
  disabled,
  option,
  answer,
  wrong = false,
  onPress,
  questionIndex,
  votePercentage = 0,
  audiencePollUsed = false,
}) => {
  const value = answer;
  // ("--->",value);
  const [optionSelect, setOptionSelect] = useState(false);
  const onPressOption = () => {
    setOptionSelect(true);
    onPress(value);
  };
  useEffect(() => {
    setOptionSelect(false);
  }, [questionIndex, audiencePollUsed]);

  const optionColor = disabled
      ? '#00A0E3'
      : '#0F3B5A'
  return (
    <View style={{overflow: 'hidden', position: 'relative', borderRadius: 5}}>
      {wrong == true ? (
        <></>
      ) : (
        <>
          <TouchableOpacity
            style={{
              position: 'relative',
              flex: 1,
              paddingVertical: 12,
              paddingLeft: 12,
              backgroundColor: optionColor,
              alignItems: 'stretch',
              marginBottom: 15,
              borderRadius: 5,
            }}
            onPress={onPressOption}
            disabled={disabled}>
            <Text style={{fontSize: 12, fontWeight: 500, color: '#FFFFFF'}}>
              {option}
            </Text>
            {audiencePollUsed && (
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  borderBottomLeftRadius: 10,
                  backgroundColor: '#00A0E3',
                  width: `${votePercentage}%`,
                  zIndex: -1,
                }}
              />
            )}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default QuizScreen;
