import React from 'react';
import {Text, View} from 'react-native';
import GoBack from './components/goBack/GoBack';
import UserProfile from './components/UserProfile/UserProfile';

function Profile({route, navigation}: any) {
  let userId = Number(route.params.userId);

  return (
    <View>
      <UserProfile userId={userId} />
    </View>
  );
}

export default Profile;
