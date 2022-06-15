import React, {useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import CustomText from '../components/CustomText';
import CustomInput from '../components/CustomInput';
// import CustomDropdown from '../components/CustomDropdown';
import CustomButton from '../components/CustomButton';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {userLogout, userInfoUpdate} from './../stores/userReducer';
import DropDownPicker from 'react-native-dropdown-picker';

const SettingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [genderInput, setGenderInput] = useState(null);

  const {fullName, email, gender} = useSelector(state => state.user);

  const updatePressed = async () => {
    // console.warn('Update');
    const userInfo = {
      fullName: nameInput !== '' ? nameInput : fullName,
      email: emailInput !== '' ? emailInput : email,
      gender: genderInput !== null ? genderInput : gender,
    };
    // console.warn(userInfo);
    await dispatch(userInfoUpdate(userInfo));
    navigation.reset({
      index: 0,
      routes: [{name: 'HomeTabs'}],
    });
  };

  const logoutPressed = async () => {
    await dispatch(userLogout());
    navigation.reset({
      index: 0,
      routes: [{name: 'HomeTabs'}],
    });
  };

  const CustomDropdown = () => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
      {label: 'MALE', value: 'MALE'},
      {label: 'FEMALE', value: 'FEMALE'},
    ]);
    return (
      <DropDownPicker
        placeholder={gender}
        open={open}
        value={genderInput}
        setValue={setGenderInput}
        items={items}
        setItems={setItems}
        setOpen={setOpen}
        style={{borderRadius: 40, borderColor: '#FFF7EF', borderWidth: 2}}
        containerStyle={{flex: 1, marginHorizontal: 8}}
        textStyle={{
          fontSize: 12,
          lineHeight: 14,
          letterSpacing: 0.24,
          fontWeight: '900',
          color: '#0A1931',
        }}
      />
    );
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View>
        {/* Heading */}
        <View style={styles.heading}>
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeftIcon color="black" size={24} />
          </Pressable>
          <View style={{marginLeft: 16}}>
            <CustomText label="Settings" type="headline" color="black" />
          </View>
        </View>

        {/* Form */}
        <CustomInput
          // placeholder="Name"
          value={fullName}
          onChangeText={e => setNameInput(e)}
        />
        <CustomInput
          // placeholder="Email"
          value={email}
          onChangeText={e => setEmailInput(e)}
        />
        <View style={styles.buttonContainer}>
          <CustomDropdown />
          <CustomButton label="SIMPAN" onPress={() => updatePressed()} />
        </View>
      </View>
      <View style={styles.logout}>
        <CustomButton
          type="SECONDARY"
          label="KELUAR"
          onPress={() => logoutPressed()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    // borderWidth: 2,
    alignItems: 'center',
  },
  heading: {
    // borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    // borderColor: 'white',
  },
  logout: {
    // borderWidth: 2,
    height: 40,
    marginVertical: 32,
  },
});

export default SettingScreen;
