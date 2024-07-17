import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const QuestionContext = createContext();

export const QuestionProvider = ({children}) => {
  //   const navigation = useNavigation(); // React Navigation hook for navigation

  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(59);
  const [quizName, setQuizName] = useState('');
  const [quizData, setQuizData] = useState({});
  const [quizzes, setQuizzes] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     //   (token);
  //     const url =
  //       'http://yesquiz-stage.eba-gwufjrqj.ap-south-1.elasticbeanstalk.com/api/v1/quiz';
  //     const response = await axios.get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (response.data) {
  //       (Object.entries(response.data[0].quiz));
  //     }

  //     const extractedQuestions = Object.entries(response.data[0].quiz).flatMap(
  //       subjectQuestions => {
  //         return subjectQuestions[1].map(questionObj => ({
  //           //save Object keys as array
  //           key: subjectQuestions[0],
  //           answer: '',
  //           options: questionObj.options,
  //           question: questionObj.question,
  //         }));
  //       },
  //       //   subjectQuestions.map(questionObj => ({
  //       //     //save Object keys as array

  //       //     answer: '',
  //       //     options: questionObj.options,
  //       //     question: questionObj.question,
  //       //   })),
  //     );
  //     (extractedQuestions);
  //     setQuestions(extractedQuestions);
  //   } catch (error) {
  //     console.error('Error fetching API data', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //     // Fetch data from the API when the component mounts
  //     axios.get('http://quiz-app-dev-env.eba-fvnk6fkv.ap-south-1.elasticbeanstalk.com/api/v1//quiz/659dcce9592b8846dbe81b27/6575effc13906711ea001bed')
  //         .then(response => {
  //             // Handle the response data
  //             ("yesssss")
  //             setQuestions(response.data)
  //             (questions, "osinajsn")
  //         })
  //         .catch(error => {
  //             console.error('Error fetching data:', error);
  //         });
  // }, []);
  // (questions[0]);

  // useEffect(() => {
  //     // Decrease the timer every second
  //     const countdown = setInterval(() => {
  //         setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
  //     }, 1000);

  //     // Move to the next question when the timer reaches 0
  //     if (timer === 0) {
  //         handleNextQuestion();
  //     }

  //     // Clear the interval on component unmount or when timer reaches 0
  //     return () => clearInterval(countdown);
  // }, [timer]);

  // (questions)
  // const handleOptionSelection = (selectedOptionId) => {
  //     setSelectedOptions(prev => ({ ...prev, currentQuestionIndex: selectedOptionId}))
  // };

  const handleNextQuestion = () => {
    // return questions[currentQuestionIndex + 1].question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setTimer(59); // Reset the timer to 59 seconds for the next question
  };

  const handleRemoveOptions = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const correctOptionId = currentQuestion.correctOptionId;

    let removedCount = 0;
    const updatedOptions = currentQuestion.options.filter(option => {
      if (option.id !== correctOptionId && removedCount < 2) {
        removedCount++;
        return false;
      }
      return true;
    });

    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].options = updatedOptions;
    setQuestions(updatedQuestions);
  };

  const getCurrentQuestion = () => {
    return questions[currentQuestionIndex].question;
  };

  const getCurrentOptions = () => {
    return questions[currentQuestionIndex].options;
  };
  const setCorrectOption = value => {
    questions[currentQuestionIndex].answer = value;
    (questions[currentQuestionIndex]);
  };

  return (
    <QuestionContext.Provider
      value={{
        questions,
        setQuestions,
        currentQuestionIndex,
        score,
        timer,
        handleRemoveOptions,
        getCurrentQuestion,
        getCurrentOptions,
        handleNextQuestion,
        setCorrectOption,
        quizName,
        setQuizName,
        quizzes,
        setQuizzes,
      }}>
      {children}
    </QuestionContext.Provider>
  );
};
