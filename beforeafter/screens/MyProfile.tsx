import React, {useState} from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import Auth from './components/Auth/Auth';
import MyProfileComponent from './components/MyProfile/MyProfile';
import Register from './components/Register/Register';

function MyProfile() {
  let id = useSelector((state: any) => state.user.user.id);
  const [auth, setAuth] = useState(true);
  return id ? (
    <MyProfileComponent />
  ) : auth ? (
    <Auth setAuth={setAuth} />
  ) : (
    <Register setAuth={setAuth} />
  );
}

export default MyProfile;
