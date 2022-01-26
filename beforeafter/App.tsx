/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {store, persistor} from './screens/redux/store';
import Main from './screens/Main';
import CreateGoal from './screens/CreateGoal';
import MyProfile from './screens/MyProfile';
import Contacts from './screens/Contacts';
import Footer from './screens/components/Footer/Footer';
import Popular from './screens/Popular';
import Subs from './screens/Subs';
import Doned from './screens/Doned';
import Profile from './screens/Profile';
import {setToken} from './screens/api/api';
import {getUserData} from './screens/redux/actions';
import {ActivityIndicator} from 'react-native';
import Settings from './screens/Settings';
import FollowersScreen from './screens/FollowersScreen';
import IFollowScreen from './screens/IFolllowScreen';
import AboutProfile from './screens/AboutProfile';
import GoalByTag from './screens/GoalByTag';
import Goal from './screens/Goal';
import CreateStage from './screens/CreateStage';
import GoalComments from './screens/GoalComments';
import Authors from './screens/Authors';

type RootStackParamList = {
  Main: undefined;
  Popular: undefined;
  Subs: undefined;
  Doned: undefined;
  CreateGoal: undefined;
  MyProfile: undefined;
  Contacts: undefined;
  Profile: {userId: string};
  Settings: undefined;
  FollowersScreen: {userId: string};
  IFollowScreen: {userId: string; withUnsubscribe: boolean};
  AboutProfile: {userData: any};
  GoalByTag: {tagId: number};
  Goal: {goalId: number; commentsCount: number};
  CreateStage: {goalId: number};
  GoalComments: {goalId: number};
  Authors: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppScreens = () => {
  let token = useSelector((state: any) => state.user.user.access_token);
  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (token) {
      setToken(token);
      dispatch(getUserData());
      setLoaded(true);
    } else {
      setLoaded(true);
    }
  }, [token]);
  return loaded ? (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Popular" component={Popular} />
        <Stack.Screen name="Subs" component={Subs} />
        <Stack.Screen name="Doned" component={Doned} />
        <Stack.Screen name="CreateGoal" component={CreateGoal} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="FollowersScreen" component={FollowersScreen} />
        <Stack.Screen name="IFollowScreen" component={IFollowScreen} />
        <Stack.Screen name="AboutProfile" component={AboutProfile} />
        <Stack.Screen name="GoalByTag" component={GoalByTag} />
        <Stack.Screen name="Goal" component={Goal} />
        <Stack.Screen name="CreateStage" component={CreateStage} />
        <Stack.Screen name="GoalComments" component={GoalComments} />
        <Stack.Screen name="Authors" component={Authors} />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  ) : (
    <ActivityIndicator />
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppScreens />
      </PersistGate>
    </Provider>
  );
};

export default App;
