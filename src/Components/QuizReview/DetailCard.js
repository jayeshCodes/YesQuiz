import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ratingStar from '../../../assets/rating-star.png';
const DetailCard = ({ questionNumber, livesUsed, correctAnswers }) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftSide}>
        <View style={styles.detail}>
          <Text style={styles.text}>Total Question</Text>
          <Text style={{...styles.text,opacity:1}}>{questionNumber}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.text}>Correct Answers</Text>
          <Text style={{...styles.text,opacity:1}}>{correctAnswers}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.text}>Lives Used</Text>
          <Text style={{...styles.text,opacity:1}}>{livesUsed}</Text>
        </View>
   
      </View>
      <View style={styles.verticalLine} />
      <View style={styles.rightSide}>
      <Image  source={ratingStar} style={{width: 30, height: 30,marginRight:20}} />
        {/* <FontAwesome name="star" size={24} color="black" /> */}
        <Text style={{...styles.text,color:"#394257",fontSize:20,fontWeight:'bold',opacity:1, marginRight:20,marginTop:10}}>450</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 8,
    marginTop: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  leftSide: {
    flex: 1,
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  verticalLine: {
    width: 1,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#E3E3E3',
  
  },
  rightSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#031645',
    opacity: 0.7,
    fontFamily:'Poppins'

  },
});

export default DetailCard;