import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ITag} from '../../../interfaces/tag';
import {controls} from '../../../src/styles/styles';
import {searchTags} from '../../redux/actions';

function SearchTags() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);

  const find = (text: string) => {
    if (text.length > 3) {
      searchTags(text, setResult);
    } else {
      setResult([]);
    }
    setSearch(text);
  };

  return (
    <View>
      <Text style={{marginBottom: 16}}>Поиск по тегам:</Text>
      <TextInput
        onChangeText={find}
        value={search}
        placeholder="Название тега"
        style={controls.input}
      />
      <View
        style={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {result.length > 0 ? (
          result.map((tag: ITag) => <Tag key={tag.id} tag={tag} />)
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

export default SearchTags;

type TTag = {
  tag: ITag;
};

const Tag = ({tag}: TTag) => {
  const navigation = useNavigation();
  let color =
    '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('GoalByTag', {tagId: tag.id})}
      style={{
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        backgroundColor: color,
        marginRight: 16,
        marginBottom: 10,
      }}>
      <Text>{tag.text}</Text>
    </TouchableOpacity>
  );
};
