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
import {showAlert, signup} from '../../redux/actions';

type TAuth = {
  setAuth: any;
};

function Register({setAuth}: TAuth) {
  const dispatch = useDispatch();

  const loading = useSelector((state: any) => state.app.loading);
  const alert = useSelector((state: any) => state.app.alert);

  const validateEmail = (email: any) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  };

  if (alert) {
    Alert.alert(alert);
  }

  return (
    <View style={{backgroundColor: '#fff', padding: 20, height: '100%'}}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text
            style={{
              fontSize: 20,
              color: '#909090',
              marginBottom: 30,
              marginTop: 20,
            }}>
            Регистрация
          </Text>
          <Formik
            initialValues={{
              firstname: '',
              email: '',
              password: '',
              password_repeat: '',
            }}
            onSubmit={fields => {
              if (
                !fields.email ||
                !fields.password ||
                !fields.firstname ||
                !fields.password_repeat
              ) {
                Alert.alert('Заполните поля');
              } else {
                if (validateEmail(fields.email)) {
                  if (fields.password !== fields.password_repeat) {
                    Alert.alert('Пароли не совпадают');
                  } else {
                    dispatch(signup(fields));
                  }
                } else {
                  Alert.alert('Некорректный email');
                }
              }
            }}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View>
                <View>
                  <TextInput
                    onChangeText={handleChange('firstname')}
                    onBlur={handleBlur('firstname')}
                    value={values.firstname}
                    style={controls.input}
                    placeholder="Имя"
                  />
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
                    placeholder="Пароль"
                  />
                  <TextInput
                    onChangeText={handleChange('password_repeat')}
                    onBlur={handleBlur('password_repeat')}
                    value={values.password_repeat}
                    secureTextEntry={true}
                    style={controls.input}
                    placeholder="Повторите пароль"
                  />
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 15,
                    }}>
                    <BlueBtn
                      callback={handleSubmit}
                      text="Зарегистрироваться"
                    />
                    <GrayBtn
                      callback={() => setAuth(true)}
                      text="Авторизация"
                    />
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </>
      )}
    </View>
  );
}

export default Register;
