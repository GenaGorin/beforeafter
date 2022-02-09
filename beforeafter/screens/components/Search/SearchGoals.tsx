import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {IGoal} from '../../../interfaces/goal';
import {controls} from '../../../src/styles/styles';
import {searchGoals} from '../../redux/actions';

function SearchGoals() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);

  const find = (text: string) => {
    if (text.length > 3) {
      searchGoals(text, setResult);
    } else {
      setResult([]);
    }
    setSearch(text);
  };

  return (
    <View>
      <Text style={{marginBottom: 16}}>Поиск по целям:</Text>
      <TextInput
        onChangeText={find}
        value={search}
        placeholder="Название цели"
        style={controls.input}
      />
      <View style={{marginTop: 30}}>
        {result.length > 0 ? (
          result.map((goal: IGoal) => <Goal key={goal.id} goal={goal} />)
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

export default SearchGoals;

type TGoal = {
  goal: IGoal;
};

const Goal = ({goal}: TGoal) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Goal', {goalId: goal.id})}
      style={{display: 'flex', flexDirection: 'row', marginTop: 16}}>
      <View style={{width: '90%'}}>
        <Text style={{fontSize: 18, color: '#2d2d2f'}}>
          {goal.title?.substr(0, 30)}
        </Text>
        <Text style={{fontSize: 12}}>{goal.description?.substr(0, 40)}</Text>
      </View>
      <View>
        <Image
          style={{marginTop: 15}}
          source={require('../../../src/images/goForward.png')}
        />
      </View>
    </TouchableOpacity>
  );
};
