import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
//import {TouchableOpacity} from 'react-native-gesture-handler';
import {navbar} from '../../../src/styles/styles';

function Footer() {
  const navigation = useNavigation();
  const [activeScreen, setActiveScreen] = useState('Main');

  const setScreen = (screen: string) => {
    setActiveScreen(screen);
    navigation.navigate(screen);
  };

  return (
    <View style={navbar.wrapper}>
      <TouchableOpacity onPress={() => setScreen('Main')}>
        <Text
          style={
            activeScreen === 'Main' ? navbar.activeIcons : navbar.inactiveIcons
          }>
          Все цели
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('Authors')}>
        <Text
          style={
            activeScreen === 'Authors'
              ? navbar.activeIcons
              : navbar.inactiveIcons
          }>
          Топ авторов
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('CreateGoal')}>
        <Text
          style={
            activeScreen === 'CreateGoal'
              ? navbar.activeIcons
              : navbar.inactiveIcons
          }>
          Создать цель
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('MyProfile')}>
        <Text
          style={
            activeScreen === 'MyProfile'
              ? navbar.activeIcons
              : navbar.inactiveIcons
          }>
          Мой профиль
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('Contacts')}>
        <Text
          style={
            activeScreen === 'Contacts'
              ? navbar.activeIcons
              : navbar.inactiveIcons
          }>
          Контакты
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Footer;
