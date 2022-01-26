import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import moment from 'moment';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {controls} from '../../../src/styles/styles';
import {createGoal} from '../../redux/actions';
import BlueBtn from '../SubscribeBtn/BlueBtn';

function CreateGoalComponent() {
  const navigation = useNavigation();
  const redirect = (data: any) => {
    navigation.navigate('CreateStage', {goalId: data.data.id});
  };

  const alert = useSelector((state: any) => state.app.alert);
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.app.loading);

  const [doned, setDoned] = useState(false);

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View>
      <Text
        style={{
          fontSize: 20,
          color: '#2d2d2f',
          marginTop: 20,
          marginBottom: 20,
        }}>
        Создайте цель или расскажите о уже достигнутой
      </Text>
      <Formik
        initialValues={{
          title: '',
          description: '',
          tags: '',
          done: false,
        }}
        onSubmit={(fields: any) => {
          if (doned) {
            fields.done = 1;
          } else {
            fields.done = 0;
          }
          fields.created_at = moment().format('YYYY-MM-DD');
          let tagsArr = fields.tags.split(' ');

          let newTagsString = '';
          if (tagsArr.length > 0) {
            tagsArr.map((tag: string, i: number) => {
              if (i < 5) {
                newTagsString = newTagsString + ' ' + tag;
              }
            });
          }
          fields.tags = newTagsString;

          dispatch(createGoal(fields, redirect));
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <View>
              <TextInput
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                style={controls.input}
                placeholder="Название цели"
              />
              <TextInput
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                secureTextEntry={true}
                style={controls.input}
                placeholder="Описание цели"
                multiline={true}
                numberOfLines={4}
              />
              <TextInput
                onChangeText={handleChange('tags')}
                onBlur={handleBlur('tags')}
                value={values.tags}
                style={controls.input}
                placeholder="Теги"
              />
              <Text style={{fontSize: 12, marginTop: -10}}>
                *Укажите не более 5 тегов через пробел
              </Text>
              <View
                style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
                <TouchableOpacity
                  style={{
                    width: 25,
                    height: 25,
                    borderColor: '#2d2d2f',
                    borderWidth: 1,
                    borderRadius: 15,
                  }}
                  onPress={() => setDoned(!doned)}>
                  {doned ? (
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        marginLeft: -3,
                        marginTop: -5,
                      }}
                      source={require('../../../src/images/galka.png')}
                    />
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>
                <Text style={{marginTop: 3, marginLeft: 5}}>
                  Достигнутая цель?
                </Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 15,
                }}>
                <BlueBtn callback={handleSubmit} text="Создать цель" />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default CreateGoalComponent;
