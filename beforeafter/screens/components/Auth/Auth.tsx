import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import {TextInput} from 'react-native-gesture-handler';
import {controls} from '../../../src/styles/styles';
import BlueBtn from '../SubscribeBtn/BlueBtn';
import GrayBtn from '../SubscribeBtn/GrayBtn';
import {login, showAlert} from '../../redux/actions';
import GoBack from '../goBack/GoBack';

type TAuth = {
  setAuth: any;
};

function Auth({setAuth}: TAuth) {
  const dispatch = useDispatch();

  const loading = useSelector((state: any) => state.app.loading);
  const alert = useSelector((state: any) => state.app.alert);

  if (alert) {
    Alert.alert(alert);
  }

  if (loading) {
    return <ActivityIndicator />;
  }
  const validateEmail = (email: any) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  };

  return (
    <View style={{backgroundColor: '#fff', padding: 20, height: '100%'}}>
      <GoBack />
      <Text
        style={{
          fontSize: 20,
          color: '#909090',
          marginBottom: 30,
          marginTop: 20,
        }}>
        Авторизация
      </Text>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={fields => {
          if (!fields.email || !fields.password) {
            Alert.alert('Заполните поля');
          } else {
            if (validateEmail(fields.email)) {
              dispatch(login(fields));
            } else {
              Alert.alert('Некорректный email');
            }
          }
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <View>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={controls.input}
                placeholder="email"
              />
              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true}
                style={controls.input}
                placeholder="password"
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 15,
                }}>
                <BlueBtn callback={handleSubmit} text="Войти" />
                <GrayBtn callback={() => setAuth(false)} text="Регистрация" />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default Auth;
