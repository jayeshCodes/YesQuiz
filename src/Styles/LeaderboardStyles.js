import {StyleSheet} from 'react-native';

const leaderboardStyles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#ffffff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 500,
    color: '#374259',
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    padding: 13,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardInsideView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 12,
    fontWeight: 500,
    color: '#000000',
  },
  cardDetailsView: {
    flexDirection: 'row',
    marginLeft: 40,
    alignItems: 'center',
  },
  cardDetailsImage: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginRight: 15,
  },
  cardDetailsText: {
    fontSize: 12,
    fontWeight: 500,
    color: '#000000',
  },
  cardScore: {
    fontSize: 12,
    fontWeight: 500,
    color: '#000000',
  },
  allTimeRankContainer: {
    flex: 1,
    marginHorizontal: 8,
    marginTop: 20,
  },
  yourRankContainer: {
    backgroundColor: '#374259',
    padding: 13,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  yourRankText: {
    fontSize: 10,
    fontWeight: 500,
    color: '#ffffff',
  },
  yourRankDetailsContainer: {
    flexDirection: 'row',
    marginLeft: 40,
    alignItems: 'center',
  },
  yourRankImage: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginRight: 15,
  },
  youText: {
    fontSize: 10,
    fontWeight: 500,
    color: '#ffffff',
  },
  yourRankScore: {
    fontSize: 10,
    fontWeight: 500,
    color: '#ffffff',
  },
  leadersContainer: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
  },
  leadersInsideView: {
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageRiya: {
    width: 55,
    height: 55,
    marginRight: 45,
  },
  riyaText: {
    fontSize: 12,
    color: '#374259',
    fontWeight: 400,
    marginLeft: 15,
    marginTop: 10,
  },
  leadersScoreContainer: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'center',
  },
  leadersScore: {
    fontSize: 15,
    fontWeight: 500,
    color: '#374259',
  },
  kuldeepImage: {
    width: 70,
    height: 70,
    marginRight: 45,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#F3AE3D',
  },
  kuldeepText: {
    fontSize: 12,
    color: '#374259',
    fontWeight: 400,
    marginTop: 10,
  },
  imageKaran: {
    width: 45,
    height: 45,
  },
  karanText: {
    fontSize: 12,
    color: '#374259',
    fontWeight: 400,

    marginTop: 10,
  }
});

export {leaderboardStyles};
