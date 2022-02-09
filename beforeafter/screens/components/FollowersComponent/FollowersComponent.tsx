import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {getFollowers} from '../../redux/actions';
import GoalAuthor from '../SingleGoal/GoalAuthor/GoalAuthor';

type TFollowersComponent = {
  userId: number;
};

function FollowersComponent({userId}: TFollowersComponent) {
  const [userIds, setUserIds] = useState<any>([]);

  const setFollowers = (data: any) => {
    let newIds = [...userIds, ...data];

    setUserIds(newIds);
  };

  useEffect(() => {
    getFollowers(userId, 0, setFollowers);
  }, []);

  const setNextFetchPortion = () => {
    getFollowers(userId, userIds.length, setFollowers);
  };
  return userIds.length > 0 ? (
    <FlatList
      data={userIds}
      renderItem={({item, index}) => (
        <View style={{marginTop: 10}}>
          <GoalAuthor userId={item.follower_id} />
        </View>
      )}
      keyExtractor={(item, index) => item.id.toString()}
      onEndReached={setNextFetchPortion}
      onEndReachedThreshold={0.1}
      ListHeaderComponent={Header}
      //refreshing={this.state.refreshing}
    />
  ) : (
    <>
      <Text>Нет подписчиков</Text>
    </>
  );
}

export default FollowersComponent;

const Header = () => {
  return (
    <View>
      <Text style={{fontSize: 20, color: '#2d2d2f', marginBottom: 20}}>
        Подписчики
      </Text>
    </View>
  );
};
