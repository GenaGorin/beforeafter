import React from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import GoBack from '../goBack/GoBack';
import {Formik} from 'formik';
import {Logout, updateUserData} from '../../redux/actions';
import {controls} from '../../../src/styles/styles';
import {TextInput} from 'react-native-gesture-handler';
import BlueBtn from '../SubscribeBtn/BlueBtn';
import GrayBtn from '../SubscribeBtn/GrayBtn';
import {useNavigation} from '@react-navigation/native';

function SettingsComponent() {
  const dispatch = useDispatch();
  const me = useSelector((state: any) => state.user.user);
  const navigation = useNavigation();
  const loading = useSelector((state: any) => state.app.loading);

  const logout = () => {
    dispatch(Logout());
    navigation.navigate('MyProfile');
  };

  return (
    <ScrollView style={{backgroundColor: '#fff', padding: 20}}>
      <View style={{height: 20}}></View>
      <GoBack text="Настройки" />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Formik
          initialValues={{
            firstname: me?.firstname,
            lastname: me?.lastname,
            description: me?.description,
            vk: me?.vk,
            instagram: me?.instagram,
            telegram: me?.telegram,
            whatsapp: me?.whatsapp,
          }}
          onSubmit={fields => {
            //console.log(fields);
            dispatch(updateUserData(fields));
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View>
              <TextInput
                onChangeText={handleChange('firstname')}
                onBlur={handleBlur('firstname')}
                value={values.firstname}
                style={controls.input}
                placeholder="firstname"
              />
              <TextInput
                onChangeText={handleChange('lastname')}
                onBlur={handleBlur('lastname')}
                value={values.lastname}
                style={controls.input}
                placeholder="Фамилия"
              />
              <TextInput
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                style={controls.input}
                placeholder="Описание профиля"
                multiline={true}
                numberOfLines={4}
              />
              <TextInput
                onChangeText={handleChange('vk')}
                onBlur={handleBlur('vk')}
                value={values.vk}
                style={controls.input}
                placeholder="ссылка - vk"
              />
              <TextInput
                onChangeText={handleChange('instagram')}
                onBlur={handleBlur('instagram')}
                value={values.instagram}
                style={controls.input}
                placeholder="ссылка - instagram"
              />
              <TextInput
                onChangeText={handleChange('telegram')}
                onBlur={handleBlur('telegram')}
                value={values.telegram}
                style={controls.input}
                placeholder="telegram"
              />
              <TextInput
                onChangeText={handleChange('whatsapp')}
                onBlur={handleBlur('whatsapp')}
                value={values.whatsapp}
                style={controls.input}
                placeholder="WhatsApp"
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 15,
                }}>
                <BlueBtn callback={handleSubmit} text="Сохранить" />
                <GrayBtn callback={logout} text="Выйти" />
              </View>
            </View>
          )}
        </Formik>
      )}
    </ScrollView>
  );
}

export default SettingsComponent;
