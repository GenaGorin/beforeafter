import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {navbar} from '../../../src/styles/styles';

type TGoalSwitcher = {
  active: string;
};

function GoalSwitcher({active}: TGoalSwitcher) {
  const navigation = useNavigation();

  const setScreen = (screen: string) => {
    navigation.navigate(screen);
  };
  return (
    <View style={navbar.wrapper}>
      <TouchableOpacity onPress={() => setScreen('Main')}>
        <Text style={active === 'Main' ? navbar.activeIcons : {}}>Свежее</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('Popular')}>
        <Text style={active === 'Popular' ? navbar.activeIcons : {}}>
          Популярное
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('Subs')}>
        <Text style={active === 'Subs' ? navbar.activeIcons : {}}>
          Подписки
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('Doned')}>
        <Text style={active === 'Doned' ? navbar.activeIcons : {}}>
          Завершенные
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default GoalSwitcher;
