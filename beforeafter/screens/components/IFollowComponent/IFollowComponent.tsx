import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {getMysubs} from '../../redux/actions';
import GoalAuthor from '../SingleGoal/GoalAuthor/GoalAuthor';

type TFollowersComponent = {
  userId: number;
  withUnsubscribe: boolean;
};

function IFollowComponent({userId, withUnsubscribe}: TFollowersComponent) {
  const [userIds, setUserIds] = useState<any>([]);
  const [offset, setOffset] = useState(0);

  const setFollowers = (data: any) => {
    let newIds = [...userIds, ...data];

    setUserIds(newIds);
  };

  useEffect(() => {
    getMysubs(userId, offset, setFollowers);
  }, []);

  const setNextFetchPortion = () => {
    setOffset(offset + 10);
    getMysubs(offset + 10);
  };
  return userIds.length > 0 ? (
    <FlatList
      data={userIds}
      renderItem={({item, index}) => (
        <View style={{marginTop: 10}}>
          <GoalAuthor userId={item.user_id} withUnsubscribe={withUnsubscribe} />
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
      <Header />
      <Text>Нет подписок</Text>
    </>
  );
}

export default IFollowComponent;

const Header = () => {
  return (
    <View>
      <Text style={{fontSize: 20, color: '#2d2d2f', marginBottom: 20}}>
        Подписки
      </Text>
    </View>
  );
};
