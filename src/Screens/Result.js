import {View, Text, TouchableOpacity, Image, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import {resultStyles} from '../Styles/ResultStyles';
import profilePicture from '../../assets/profile-pic.png';
import Star from '../../assets/rating-star.png';
import Home from '../../assets/home-icon.png';
import Share from '../../assets/share-icon.png';
import { homeStyles } from '../Styles/HomeStyles';
import {getStudentProfile} from '../Services/Student';
import LinearGradient from 'react-native-linear-gradient';
import { getInitials } from '../Components/TopLeaders';
const Result = ({route, navigation}) => {
  const {correct_answers, total_questions, time_taken} = route.params;
  (correct_answers, 'correct_answers');
  //   const {total_questions} = route.params;
  const [student, setStudent] = useState({});
  const getStudent = async () => {
    const student = await getStudentProfile();
    (student, 'studentttttt');
    setStudent(student);
  };
  useEffect(() => {
    getStudent();
    const backAction = () => {
      navigation.navigate('AllQuizes');
      return true; // This will prevent the app from going back
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View style={{...resultStyles.resultContainer}}>
      <TouchableOpacity onPress={() => navigation.navigate('AllQuizes')}>
        <Text style={{...resultStyles.headerText}}>{`<`} </Text>
      </TouchableOpacity>
      <View style={{...resultStyles.imageContainer}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['rgba(147, 170, 218, 0.5)', '#FFFFFF']}
          style={{...homeStyles.initialsCircle, borderColor: 'green', width:70,height:70,borderRadius: 35}}>
          <Text style={homeStyles.initialsText}>
            {getInitials(`${student?.first_name} ${student?.last_name}`)}
          </Text>
        </LinearGradient>
        <Text style={{...resultStyles.userText}}>
          {student.first_name} {student.last_name}
        </Text>
        <Text style={{...resultStyles.congratsText}}>Congratulations</Text>
        <Text style={{...resultStyles.congratsSubText}}>Keep It Up </Text>
      </View>
      <View style={{...resultStyles.pointsView}}>
        <Text style={{...resultStyles.pointsText}}>
          Points- {correct_answers * 10}
        </Text>
        <Image source={Star} style={{height: 24, width: 24}} />
      </View>
      <View style={{...resultStyles.accuracyView}}>
        <Text style={{...resultStyles.accuracyText}}>
          {((Number(correct_answers) / Number(total_questions)) * 100).toFixed(
            2,
          )}{' '}
          % Accuracy
        </Text>
      </View>
      {/* <Text style={resultStyles.timeText}>Time Taken - {time_taken}</Text> */}
      <Text style={resultStyles.correctText}>
        Correct Answers - {correct_answers}/{total_questions}{' '}
      </Text>
      <View style={resultStyles.bottomIcons}>
        <View style={resultStyles.bottomContainer}>
          <TouchableOpacity
            style={resultStyles.homeIconContainer}
            onPress={() => navigation.navigate('HomePage')}>
            <Image source={Home} />
          </TouchableOpacity>
          <Text style={resultStyles.bottomText}>Home</Text>
        </View>
        {/* <View style={resultStyles.bottomContainer}>
          <TouchableOpacity
            style={resultStyles.shareIconContainer}
            activeOpacity={0}>
            <Image source={Share} />
          </TouchableOpacity>
          <Text style={resultStyles.bottomText}>Share</Text>
        </View> */}
      </View>
    </View>
  );
};

export default Result;
