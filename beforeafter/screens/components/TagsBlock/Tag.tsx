import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {ITag} from '../../../interfaces/tag';

type TTag = {
  tag: ITag;
};

function Tag({tag}: TTag) {
  const navigation = useNavigation();

  let color =
    '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('GoalByTag', {tagId: tag.id})}
      style={{
        backgroundColor: color,
        paddingLeft: 6,
        paddingRight: 6,
        marginRight: 10,
        borderRadius: 5,
      }}>
      <Text style={{color: '#fff'}}>{tag.text}</Text>
    </TouchableOpacity>
  );
}

export default Tag;
