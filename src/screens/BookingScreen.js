import React, {useState, useEffect} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import CustomText from '../components/CustomText';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../components/CustomInput';
import CustomDropdown from '../components/CustomDropdown';
import CustomButton from '../components/CustomButton';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector, useDispatch} from 'react-redux';
import {setBookingHistory, setPaymentHistory} from './../stores/bookingReducer';
import {
  formatCurrency,
  getSupportedCurrencies,
} from 'react-native-format-currency';

const BookingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [room, setRoom] = useState(1);
  const [night, setNight] = useState(1);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);

  const {currentBook} = useSelector(state => state.booking);

  // useEffect(() => {
  //   console.warn(currentBook);
  // }, []);

  // var formatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  // });

  const sum = () => {
    return night * room * currentBook.ratePlan.price.exactCurrent;
  };

  const RoomDropdown = () => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
      {label: '1 ROOM', value: 1},
      {label: '2 ROOM', value: 2},
      {label: '3 ROOM', value: 3},
    ]);
    return (
      <DropDownPicker
        placeholder="1 ROOM"
        open={open}
        value={room}
        setValue={setRoom}
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

  const NightDropdown = () => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
      {label: '1 NIGHT', value: 1},
      {label: '2 NIGHT', value: 2},
      {label: '3 NIGHT', value: 3},
    ]);
    return (
      <DropDownPicker
        placeholder="1 ROOM"
        open={open}
        value={night}
        setValue={setNight}
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

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const checkForm = () => {
    if (name !== null || name !== '') {
      if (emailRegex.test(email)) {
        if (phone !== null || phone !== '') {
          return true;
        }
      }
    } else {
      return false;
    }
  };

  const bookNowPressed = () => {
    const paymentInfo = {
      hotelId: currentBook.id,
      hotelName: currentBook.name,
      hotelImg: currentBook.optimizedThumbUrls.srpDesktop,
      name: name,
      email: email,
      phone: phone,
      room: room,
      night: night,
      pay: room * night * currentBook.ratePlan.price.exactCurrent,
    };
    if (checkForm()) {
      dispatch(setPaymentHistory(paymentInfo));
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeTabs'}],
      });
    }
  };

  const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] =
    formatCurrency({
      amount: sum(),
      code: 'USD',
    });

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-between',
      }}>
      {/* Heading & Form */}
      <View>
        {/* Heading */}
        <View style={styles.heading}>
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeftIcon color="black" size={24} />
          </Pressable>
          <View style={{marginLeft: 16}}>
            <CustomText
              label="Booking Information"
              type="headline"
              color="black"
            />
          </View>
        </View>
        {/* Form */}
        <View style={styles.formContainer}>
          <CustomInput
            placeholder="Name"
            value={name}
            onChangeText={name => setName(name)}
          />
          <CustomInput
            placeholder="Email"
            value={email}
            onChangeText={email => setEmail(email)}
          />
          <CustomInput
            placeholder="Phone"
            value={phone}
            onChangeText={phone => setPhone(phone)}
            numericKeyboard={true}
          />
          <View style={styles.buttonContainer}>
            <RoomDropdown />
            <NightDropdown />
          </View>
        </View>
      </View>

      {/* Action */}
      <View style={styles.action}>
        <View style={styles.price}>
          <View style={{opacity: 0.4}}>
            <CustomText label="Total Price" type="Caption" color="black" />
          </View>
          <CustomText
            label={valueFormattedWithSymbol}
            type="headline"
            color="black"
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton label="BOOK NOW" onPress={() => bookNowPressed()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  formContainer: {
    // borderWidth: 2,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  action: {
    marginVertical: 40,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 20,
  },
});

export default BookingScreen;
