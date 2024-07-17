import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Teacher from '../../assets/teachers/teacher1.jpeg';
import {leaderboardStyles} from '../Styles/LeaderboardStyles';
import TopLeaders from '../Components/TopLeaders';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
const Tab = createMaterialTopTabNavigator();

const Header = ({onPress}) => (
  <View style={leaderboardStyles.headerContainer}>
     <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
    <Ionicons name="chevron-back-outline" size={24} color={'#000000'} />
      </TouchableOpacity>
  </View>
);

const Card = ({rank, score, name}) => (
  <View>
    <View style={leaderboardStyles.cardContainer}>
      <View style={leaderboardStyles.cardInsideView}>
        <Text style={leaderboardStyles.rankText}>{rank}</Text>
        <View style={leaderboardStyles.cardDetailsView}>
          {/* <Image source={Teacher} style={leaderboardStyles.cardDetailsImage} /> */}
          <Text style={leaderboardStyles.cardDetailsText}>{name}</Text>
        </View>
      </View>
      <Text style={leaderboardStyles.cardScore}>{score}</Text>
    </View>
  </View>
);

const cardData = {
  rank: 3,
  score: 285,
};

const AllTime = ({route}) => {
  const {leaderBoard} = route.params;
  ('leaderBoard in AllTime', leaderBoard);
  return (
    <ScrollView>
      <View style={leaderboardStyles.allTimeRankContainer}>
        {/* <View style={leaderboardStyles.yourRankContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={leaderboardStyles.yourRankText}>3</Text>
            <View style={leaderboardStyles.yourRankDetailsContainer}>
              <Image source={Teacher} style={leaderboardStyles.yourRankImage} />
              <Text style={leaderboardStyles.youText}>You</Text>
            </View>
          </View>
          <Text style={leaderboardStyles.yourRankScore}>285</Text>
        </View> */}
        <View style={leaderboardStyles.leadersContainer}>
          <TopLeaders
            first={leaderBoard[1]}
            second={leaderBoard[0]}
            third={leaderBoard[2]}
          />
        </View>
        <View style={{marginTop: 23}}>
          {leaderBoard &&
            leaderBoard?.map((student, index) => {
              return (
                <Card
                  key={`card-${index}`}
                  rank={student?.rank}
                  score={student?.total_points_earned}
                  name={`${student?.first_name} ${student?.last_name}`}
                />
              );
            })}
        </View>
      </View>
    </ScrollView>
  );
};

const Weekly = () => <></>;

const Monthly = () => <></>;

const Leaderboard = ({navigation, route}) => {
  const {leaderBoard} = route.params;
  return (
    <>
      <Header onPress={() => navigation.goBack()} />
      <Tab.Navigator
        screenOptions={{
          labelStyle: {fontSize: 14, fontWeight: 500},
          indicatorStyle: {borderBottomColor: '#374259', borderBottomWidth: 4},
          activeTintColor: '#374259',
          inactiveTintColor: 'grey',
          tabBarStyle: {
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingTop: 20,
          },
        }}>
        <Tab.Screen
          name="All Time"
          component={AllTime}
          initialParams={{leaderBoard: leaderBoard}}
        />
        <Tab.Screen
          name="Weekly"
          component={AllTime}
          initialParams={{leaderBoard: leaderBoard}}
        />
        <Tab.Screen
          name="Monthly"
          component={AllTime}
          initialParams={{leaderBoard: leaderBoard}}
        />
      </Tab.Navigator>
    </>
  );
};

export default Leaderboard;
