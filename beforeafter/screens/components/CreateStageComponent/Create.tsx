import moment from 'moment';
import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {controls, MyProfileStyles} from '../../../src/styles/styles';
import {createStage, showAlert} from '../../redux/actions';
import Alert from '../Alert/Alert';
import BlueBtn from '../SubscribeBtn/BlueBtn';

type TCreate = {
  goalId: number;
};

function Create({goalId}: TCreate) {
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<any>();
  const alert = useSelector((state: any) => state.app.alert);

  const openCamara = () => {
    const options: any = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
    };

    launchCamera(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:

        setImage(response.assets[0]);
      }
    });
  };

  const dispatch = useDispatch();

  const openGallery = () => {
    const options: any = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      //includeBase64: true,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:

        setImage(response.assets[0]);
      }
    });
  };

  const clearFields = () => {
    setImage('');
    setDescription('');
  };

  const saveStageClick = () => {
    if (!image || !date || !description) {
      dispatch(showAlert('Заполните этап'));
      return false;
    }
    let workedObg = {
      uri: image.uri,
      name: image.fileName,
      //filename: 'imageTest.jpg',
      type: image.type,
    };
    let data = {
      file: workedObg,
      date: date,
      description: description,
    };

    dispatch(createStage(data, goalId, clearFields));
  };

  return (
    <View style={{marginTop: 20}}>
      <View>
        {image ? (
          <Image
            style={{resizeMode: 'cover', height: 250}}
            source={{uri: image.uri}}
          />
        ) : (
          <Image
            style={{width: '100%', height: 250}}
            source={require('../../../src/images/photoplaceholder.jpg')}
          />
        )}

        <View
          style={{
            ...MyProfileStyles.btnWrapper,
            marginBottom: 20,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              openCamara();
            }}>
            <Text style={MyProfileStyles.btnText}>Сделать фото</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              openGallery();
            }}>
            <Text style={MyProfileStyles.btnText}>Выбрать из галереи</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DatePicker
        style={{width: 200}}
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
          // ... You can check the source to find the other keys.
        }}
        onDateChange={date => {
          setDate(date);
        }}
      />
      <View style={{marginTop: 20}}>
        <TextInput
          onChangeText={(text: string) => setDescription(text)}
          value={description}
          style={controls.input}
          placeholder="Опишите этап"
          multiline={true}
          numberOfLines={4}
        />
      </View>
      {alert && <Alert text={alert} />}
      <View style={{marginBottom: 50, marginTop: 20}}>
        <BlueBtn callback={saveStageClick} text="Сохранить" />
      </View>
    </View>
  );
}

export default Create;
