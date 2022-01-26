import React from 'react';
import {Text, View} from 'react-native';
import FollowersComponent from './components/FollowersComponent/FollowersComponent';
import GoBack from './components/goBack/GoBack';

function FollowersScreen({route}: any) {
  let userId = Number(route.params.userId);
  return (
    <View style={{padding: 20, backgroundColor: '#fff'}}>
      <GoBack />
      <FollowersComponent userId={userId} />
    </View>
  );
}

export default FollowersScreen;
