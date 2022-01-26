import React from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import {TextInput} from 'react-native-gesture-handler';
import Alert from '../Alert/Alert';
import {controls} from '../../../src/styles/styles';
import BlueBtn from '../SubscribeBtn/BlueBtn';
import GrayBtn from '../SubscribeBtn/GrayBtn';
import {login, showAlert} from '../../redux/actions';

type TAuth = {
  setAuth: any;
};

function Auth({setAuth}: TAuth) {
  const dispatch = useDispatch();

  const loading = useSelector((state: any) => state.app.loading);
  const alert = useSelector((state: any) => state.app.alert);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{backgroundColor: '#fff', padding: 20, height: '100%'}}>
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
            dispatch(showAlert('Заполните поля'));
          } else {
            dispatch(login(fields));
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
      {alert && <Alert text={alert} />}
    </View>
  );
}

export default Auth;
