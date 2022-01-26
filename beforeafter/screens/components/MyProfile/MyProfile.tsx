import React, {useEffect, useState} from 'react';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {getSubsInfo, getUserGoals, updateAva} from '../../redux/actions';
import {MyProfileStyles} from '../../../src/styles/styles';
import {useNavigation} from '@react-navigation/native';
import {IGoal} from '../../../interfaces/goal';

const MyProfileHeader = () => {
  const me = useSelector((state: any) => state.user.user);

  const openCamara = () => {
    const options: any = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
    };

    launchCamera(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:

        sendImageOnServer(response.assets[0]);
      }
    });
  };

  const dispatch = useDispatch();

  const sendImageOnServer = (image: any) => {
    dispatch(updateAva(image));
  };

  const openGallery = () => {
    const options: any = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      //includeBase64: true,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:

        sendImageOnServer(response.assets[0]);
      }
    });
  };

  const loading = useSelector((state: any) => state.app.loading);
  const [iFollow, setIFollow] = useState(0);
  const [followMe, setFoolowMe] = useState(0);
  const [goals, setGoals] = useState(0);

  const [tab, setTab] = useState('goals');

  const countSubs = (data: any) => {
    setIFollow(data['i_follow']);
    setFoolowMe(data['follow_me']);
    setGoals(data['goals']);
  };

  useEffect(() => {
    getSubsInfo(me.id, countSubs);
  }, [me]);

  const navigation = useNavigation();

  return (
    <ScrollView style={{backgroundColor: '#fff', padding: 20}}>
      <SafeAreaView style={{marginBottom: 15}}>
        <View style={MyProfileStyles.imageViewWrapper}>
          <View>
            <Image
              style={MyProfileStyles.profileImage}
              source={
                me.image_url
                  ? {uri: me.image_url}
                  : require('../../../src/images/image_placeholder.png')
              }
            />
          </View>
          <View style={MyProfileStyles.btnWrapper}>
            <TouchableOpacity
              onPress={() => {
                openCamara();
              }}>
              <Text style={MyProfileStyles.btnText}>Сделать фото</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                openGallery();
              }}>
              <Text style={MyProfileStyles.btnText}>Выбрать из галереи</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={MyProfileStyles.userName}>
            {me?.firstname + ' ' + me?.lastname}
          </Text>
          <Text style={MyProfileStyles.emailText}>{me?.email}</Text>
        </View>
        <View style={MyProfileStyles.tabsWrapper}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FollowersScreen', {userId: me.id})
            }
            style={MyProfileStyles.singleTab}>
            <Text style={MyProfileStyles.singleTabText}>
              Подписчики({followMe})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('IFollowScreen', {
                userId: me.id,
                withUnsubscribe: true,
              })
            }
            style={MyProfileStyles.singleTab}>
            <Text style={MyProfileStyles.singleTabText}>
              Подписки({iFollow})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={MyProfileStyles.singleTab}>
            <Text style={MyProfileStyles.singleTabText}>Настройки</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Goals goalsCount={goals} />
    </ScrollView>
  );
};

export default MyProfileHeader;

const Goals = ({goalsCount}: any) => {
  const me = useSelector((state: any) => state.user.user);
  let userId = me.id;
  const goals: any = useSelector((state: any) => state.goals.goals);
  let thisGoals = goals.filter((goal: IGoal) => goal.user_id === userId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (thisGoals.length < 10) {
      dispatch(getUserGoals(userId, 0));
    }
  }, []);

  const setNextFetchPortion = () => {
    dispatch(getUserGoals(userId, thisGoals.length));
  };

  return (
    <View style={{marginTop: 20}}>
      {thisGoals.length > 0 ? (
        thisGoals.map((goal: IGoal) => <Goal key={goal.id} goal={goal} />)
      ) : (
        <>
          <Text>Нету целей</Text>
        </>
      )}
      {goalsCount > thisGoals.length ? (
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 50,
            justifyContent: 'center',
          }}
          onPress={() => setNextFetchPortion()}>
          <Text style={{color: '#6997d3', fontWeight: '600'}}>Еще цели</Text>
          <Image
            style={{width: 16, height: 16, marginLeft: 5, marginTop: 3}}
            source={require('../../../src/images/trangleDown.png')}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

//export default MyProfile;

const Goal = ({goal}: any) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CreateStage', {goalId: goal.id})}
      style={{marginBottom: 30}}>
      <View style={MyProfileStyles.singleGoalWrapp}>
        <View style={{width: '90%'}}>
          <Text style={MyProfileStyles.singleGoalTitle}>{goal.title}</Text>
          <Text style={MyProfileStyles.singleGoalDesc}>
            {goal?.description}
          </Text>
        </View>
        <Image
          style={MyProfileStyles.singleGoalImage}
          source={require('../../../src/images/goForward.png')}
        />
      </View>
    </TouchableOpacity>
  );
};

/*
<Image
            style={MyProfileStyles.singleTabImage}
            source={require('../../../src/images/goForward.png')}
          />

*/
