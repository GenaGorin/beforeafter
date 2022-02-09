import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {navbar} from '../src/styles/styles';
import GoBack from './components/goBack/GoBack';
import SearchGoals from './components/Search/SearchGoals';
import SearchTags from './components/Search/SearchTags';

function Search() {
  const [searchFor, setSearchFor] = useState('goals');
  return (
    <View style={{backgroundColor: '#fff', padding: 20}}>
      <GoBack />
      <Text style={{fontSize: 18, color: '#2d2d2f'}}>Поиск по:</Text>
      <View
        style={{
          ...navbar.wrapper,
          justifyContent: 'flex-start',
          borderTopWidth: 0,
          paddingLeft: 0,
        }}>
        <TouchableOpacity onPress={() => setSearchFor('goals')}>
          <Text
            style={
              searchFor === 'goals' ? navbar.activeIcons : navbar.inactiveIcons
            }>
            Целям
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginLeft: 16}}
          onPress={() => setSearchFor('tags')}>
          <Text
            style={
              searchFor === 'tags' ? navbar.activeIcons : navbar.inactiveIcons
            }>
            Тегам
          </Text>
        </TouchableOpacity>
      </View>
      {searchFor === 'goals' ? <SearchGoals /> : <></>}
      {searchFor === 'tags' ? <SearchTags /> : <></>}
    </View>
  );
}

export default Search;
