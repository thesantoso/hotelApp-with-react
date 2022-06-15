import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import CustomText from '../components/CustomText';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {userLogin, userLogout, authLogin} from './../stores/userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {isAuth} = useSelector(state => state.user);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    if (isAuth) {
      navigation.pop();
    }
  }, [isAuth]);

  const loginPressed = async () => {
    const user = {
      username: usernameInput,
      password: passwordInput,
    };

    await dispatch(userLogin(user));
  };

  const logoutPressed = () => {
    dispatch(userLogout());
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.headline}>
        <CustomText label="Login" type="headline" color="black" />
      </View>
      <View style={styles.form}>
        <CustomInput
          placeholder="Username"
          onChangeText={e => setUsernameInput(e)}
        />
        <CustomInput
          placeholder="Password"
          onChangeText={e => setPasswordInput(e)}
          secureTextEntry={true}
        />
        <View style={styles.buttonContainer}>
          <CustomButton label="LOGIN" onPress={() => loginPressed()} />
          <CustomButton
            label="LOGOUT"
            onPress={() => logoutPressed()}
            type="SECONDARY"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headline: {
    margin: 16,
  },
  form: {
    // borderWidth: 2,
    // margin: 16,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    // borderWidth: 2,
    alignItems: 'center',
  },
});

export default LoginScreen;
