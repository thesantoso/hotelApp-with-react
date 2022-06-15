import React, {useEffect} from 'react';
import {View, ScrollView, StyleSheet, Pressable, FlatList} from 'react-native';
import CustomText from '../components/CustomText';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {CogIcon} from 'react-native-heroicons/solid';
import HeroIcon from '../components/HeroIcon/HeroIcon';
import HotelCard from '../components/HotelCard';
import {useNavigation} from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import {useSelector, useDispatch} from 'react-redux';
import {addWishlist, updateWishlist} from './../stores/wishlistReducer';
import {setDetail, setLoading} from './../stores/hotelReducer';
import {
  formatCurrency,
  getSupportedCurrencies,
} from 'react-native-format-currency';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {fullName, isAuth} = useSelector(state => state.user);
  const {paymentHistory} = useSelector(state => state.booking);
  const {wishlist} = useSelector(state => state.wishlist);

  const checkItem = query => {
    const found = wishlist.some(el => el.name === query.name);
    return found;
  };

  const savePressed = item => {
    if (isAuth) {
      if (!checkItem(item)) {
        dispatch(addWishlist(item));
      } else {
        const newWishlist = wishlist.filter(el => el.name !== item.name);
        dispatch(updateWishlist(newWishlist));
      }
    } else {
      navigation.navigate('Login');
    }
  };

  const hotelPressed = async item => {
    await dispatch(setDetail(item));
    // dispatch(setLoading());
    navigation.navigate('Hotel');
  };

  const renderHotels = (
    {item}, //item ini refer ke DATA
  ) => (
    <HotelCard
      imageUrl={item.hotelImg}
      hotelName={`$${item.pay}`}
      country={item.hotelName}
      rating={`${item.room} ROOM, ${item.night} NIGHT`}
      hideRatingIcon={true}
      hideSaveIcon={true}
      // onPress={() => hotelPressed(item)}
      // onSave={() => savePressed(item)}
      // saved={checkItem(item) ? true : false}
    />
  );

  // const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] =
  //   formatCurrency({
  //     amount: sum(),
  //     code: 'USD',
  //   });

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headline}>
          <HeroIcon icon="UserOutline" />
          <View style={{marginLeft: 16}}>
            <CustomText
              label={isAuth ? fullName : 'Belum Masuk'}
              type="headline"
              color="black"
            />
          </View>
        </View>
        {isAuth ? (
          <>
            <Pressable onPress={() => navigation.push('Setting')}>
              <CogIcon size={24} color="black" />
            </Pressable>
          </>
        ) : (
          <></>
        )}
      </View>
      {isAuth ? (
        <>
          <View style={{margin: 16}}>
            <CustomText
              label="Riwayat Pemesanan"
              type="subheadline"
              color="black"
            />
          </View>

          <ScrollView>
            <View style={styles.list}>
              <FlatList
                data={paymentHistory}
                // horizontal={true}
                renderItem={renderHotels}
                // keyExtractor={item => item.id}
              />
            </View>
          </ScrollView>
        </>
      ) : (
        <>
          <View style={{height: 40}}>
            <CustomButton
              label="MASUK"
              onPress={() => navigation.push('Login')}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 16,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default ProfileScreen;
