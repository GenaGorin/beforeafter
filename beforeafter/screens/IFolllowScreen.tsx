import React from 'react';
import {Text, View} from 'react-native';
import GoBack from './components/goBack/GoBack';
import IFollowComponent from './components/IFollowComponent/IFollowComponent';

function IFollowScreen({route}: any) {
  let userId = Number(route.params.userId);
  let withUnsubscribe = route.params.withUnsubscribe;
  return (
    <View style={{padding: 20, backgroundColor: '#fff'}}>
      <GoBack />
      <IFollowComponent userId={userId} withUnsubscribe={withUnsubscribe} />
    </View>
  );
}

export default IFollowScreen;
