import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text, Touchable, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QuizCard from '../Components/QuizCard';
import { HeaderComp } from '../Components/QuizReview/Header';
import DetailCard from '../Components/QuizReview/DetailCard';
import { getQuizbyID } from '../Services/Quiz';
import QuizInfoCard from '../Components/QuizReview/QuizInfoCard';

const QuizReview = ({ route }) => {
  const navigation = useNavigation();
  
  const { quizId ,title,createdAt,startTime,questionNumber,submittedData} = route.params;
  //  let a = await getQuizbyID(quizId);
  //  ("quiz",a);
  ('quizId', quizId, 'title', title, 'questionNumber', questionNumber, 'submittedData', submittedData);
  const data = Array.from({ length: questionNumber }, (_, i) => i + 1);
  ('data', data);
  const [questionMap, setQuestionMap] = useState({});

  useEffect(() => {
    const map = {};
    let questionNumber = 1;
    Object.keys(submittedData.response).forEach((label) => {
      submittedData.response[label].forEach((item) => {
        map[questionNumber] = { ...item, label };
        questionNumber++;
      });
    });
    setQuestionMap(map);
  }, [submittedData]);

  const renderItem = ({ item }) => {
    const question = questionMap[item];
    const isCorrect = question?.answer == question?.response;
    ('question', question, 'isCorrect', isCorrect);
    
    return (
      <TouchableOpacity  style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5,
      height: 40, // You can adjust this value
      width: 40, // You can adjust this value
      backgroundColor: isCorrect ? '#D4EACA' : '#E9CDCD',
      borderRadius: 5, // Add border radius
      
      }}
      onPress={() => {
      ('item', typeof item,item);
      }}
      >
      <Text style={{fontWeight: 'bold',fontSize:12,color:'#374259'} }>{item.toString()}</Text>
      </TouchableOpacity>
    );
    };

  return (
    <>
    <HeaderComp name="Report" onPress={() => navigation.navigate('AllQuizes')} />
    <View style={{display:'flex',flexDirection:'column'}}>
      <QuizInfoCard quizId={quizId} title={title} questionNumber={questionNumber} createdAt={createdAt} startTime={startTime}/>
      <DetailCard questionNumber={questionNumber} livesUsed={submittedData.lives_used} correctAnswers={submittedData.correct_responses}  />
     <View style={styles.grid}>
     <Text style={{ fontSize: 24,
    color: '#374259',
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 10,
    fontFamily: 'Poppins',
    marginBottom: 20,}}>
          Questions
        </Text>
      <View style={styles.container}>
      <FlatList
          data={Object.keys(questionMap)}
          renderItem={renderItem}
          keyExtractor={(item) => item.toString()}
          numColumns={6} // Change this to the number of columns you want
        />
        </View>
      </View>
    </View>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  gridHeading: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  correctAnswersText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionNumber: {
    flex: 1,
    height: 50,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    color: 'white',
    fontSize: 18,
  },
  questionNumberGrid: {
    color: 'white',
    fontSize: 18,
  },
  grid:{
    marginHorizontal: 8,
    marginTop: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  }
});

export default QuizReview;