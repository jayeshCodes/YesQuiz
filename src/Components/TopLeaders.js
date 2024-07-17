import React from 'react';
import {Image, Text, View} from 'react-native';
import {homeStyles} from '../Styles/HomeStyles';
import ratingStar from '../../assets/rating-star.png';
import {leaderboardStyles} from '../Styles/LeaderboardStyles';
import LinearGradient from 'react-native-linear-gradient';

export const getInitials = name => {
  const names = name.split(' ');
  const initials = names.map(n => n[0]).join('');
  return initials.toUpperCase();
};

const TopLeaders = ({first, second, third}) => {
  // Function to get initials
  

  return (
    <View style={homeStyles.leaderboardCard}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 10,
        }}>
        {/* Initials for first leader */}
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['rgba(147, 170, 218, 0.5)', '#FFFFFF']}
          locations={[0.2, 0.7]}
          style={{...homeStyles.initialsCircle, borderColor: 'crimson'}}>
          <Text style={homeStyles.initialsText}>
            {getInitials(`${first?.first_name} ${first?.last_name}`)}
          </Text>
        </LinearGradient>
        <Text style={homeStyles.riyaText}>{first?.first_name}</Text>
        <View style={leaderboardStyles.leadersScoreContainer}>
          <Text style={leaderboardStyles.leadersScore}>
            {first?.total_points_earned}
          </Text>
          <Image
            source={ratingStar}
            style={{marginTop: 2, height: 15, width: 15}}
          />
        </View>
      </View>
      <View style={{top: -12}}>
        {/* Initials for second leader */}
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['rgba(147, 170, 218, 0.5)', '#FFFFFF']}
          style={{...homeStyles.initialsCircle, borderColor: 'darkblue'}}>
          <Text style={homeStyles.initialsText}>
            {getInitials(`${second?.first_name} ${second?.last_name}`)}
          </Text>
        </LinearGradient>
        <Text style={{...homeStyles.kuldeepText, alignSelf: 'center'}}>
          {second?.first_name}
        </Text>
        <View style={leaderboardStyles.leadersScoreContainer}>
          <Text style={leaderboardStyles.leadersScore}>
            {second?.total_points_earned}
          </Text>
          <Image
            source={ratingStar}
            style={{marginTop: 2, height: 15, width: 15}}
          />
        </View>
      </View>
      <View style={{top: 15}}>
        {/* Initials for third leader */}
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['rgba(147, 170, 218, 0.5)', '#FFFFFF']}
          style={{...homeStyles.initialsCircle, borderColor: 'green'}}>
          <Text style={homeStyles.initialsText}>
            {getInitials(`${third?.first_name} ${third?.last_name}`)}
          </Text>
        </LinearGradient>
        <Text style={homeStyles.karanText}>{third?.first_name}</Text>
        <View style={leaderboardStyles.leadersScoreContainer}>
          <Text style={leaderboardStyles.leadersScore}>
            {third?.total_points_earned}
          </Text>
          <Image
            source={ratingStar}
            style={{marginTop: 2, height: 15, width: 15}}
          />
        </View>
      </View>
    </View>
  );
};

export default TopLeaders;
