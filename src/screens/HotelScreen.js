import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Pressable, View, Image} from 'react-native';
import CustomText from './../components/CustomText';
import CustomButton from './../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeftIcon, StarIcon} from 'react-native-heroicons/solid';
import HeroIcon from '../components/HeroIcon/HeroIcon';
import Chip from '../components/Chip/Chip';
import {getFeatures, setDetail} from './../stores/hotelReducer';
import {setCurrentBook} from './../stores/bookingReducer';
import {useSelector, useDispatch} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {addWishlist, updateWishlist} from './../stores/wishlistReducer';
import {
  formatCurrency,
  getSupportedCurrencies,
} from 'react-native-format-currency';

const HotelScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {hotelDetail, hotelFeatures, isLoading} = useSelector(
    state => state.hotel,
  );
  const {isAuth} = useSelector(state => state.user);
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

  const bookPressed = async item => {
    const readyBook = {
      ...item,
      ratePlan: {
        price: {
          exactCurrent: item.ratePlan.price.exactCurrent
            ? item.ratePlan.price.exactCurrent
            : Object.values(hotelFeatures.featuredPrice.currentPrice)[1],
        },
      },
    };
    if (isAuth) {
      await dispatch(setCurrentBook(readyBook));
      navigation.navigate('Booking');
    } else {
      navigation.navigate('Login');
    }
  };

  const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] =
    formatCurrency({
      amount: hotelDetail.ratePlan.price.exactCurrent
        ? hotelDetail.ratePlan.price.exactCurrent
        : Object.values(hotelFeatures.featuredPrice.currentPrice)[1],
      code: 'USD',
    });

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView>
        <View style={{backgroundColor: 'white', flex: 1}}>
          {/* Heading */}
          <View style={styles.heading}>
            <Pressable onPress={() => navigation.goBack()}>
              <ArrowLeftIcon color="black" size={24} />
            </Pressable>
            <View style={{marginLeft: 16}}>
              <CustomText label="Hotel Detail" type="headline" color="black" />
            </View>
          </View>
          {/* Hotel Image */}
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: hotelDetail.optimizedThumbUrls.srpDesktop,
              }}
            />
            {hotelDetail.ratePlan.price.exactCurrent ? (
              <Pressable
                style={styles.loveIcon}
                onPress={() => savePressed(hotelDetail)}>
                <HeroIcon
                  icon={checkItem(hotelDetail) ? 'HeartSolid' : 'HeartOutline'}
                />
              </Pressable>
            ) : (
              <></>
            )}
          </View>

          {isLoading ? (
            <CustomText
              label="Tunggu Sebentar..."
              type="headline"
              color="black"
            />
          ) : (
            <>
              <View style={{margin: 16}}>
                <View style={styles.hotelInfo}>
                  <View style={styles.titleContainer}>
                    <CustomText
                      label={hotelFeatures.name}
                      type="headline"
                      color="black"
                    />
                  </View>
                  <View style={styles.ratingContainer}>
                    <StarIcon size={16} color="#FFC947" />
                    <View style={styles.rating}>
                      <CustomText
                        label={hotelFeatures.starRating}
                        type="caption"
                        color="#FFC947"
                      />
                    </View>
                  </View>
                  <View style={{opacity: 0.4}}>
                    <CustomText
                      label={`${hotelFeatures.address.addressLine1}, ${hotelFeatures.address.cityName}, ${hotelFeatures.address.countryName}`}
                      type="body"
                      color="black"
                    />
                  </View>
                </View>
                <View
                  style={{
                    marginVertical: 32,
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{opacity: 0.4}}>
                    <CustomText
                      label="Price per night"
                      type="body"
                      color="black"
                    />
                  </View>
                  <CustomText
                    label={valueFormattedWithSymbol}
                    type="subheadline"
                    color="black"
                  />
                </View>
              </View>

              <View style={{margin: 16}}>
                <ScrollView style={styles.hotelFeatures} horizontal={true}>
                  <Chip
                    label={
                      hotelFeatures.freebies
                        ? hotelFeatures.freebies
                        : 'Tidak ada fasilitas khusus'
                    }
                  />
                </ScrollView>
              </View>
            </>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            label="BOOK THIS HOTEL"
            onPress={() => bookPressed(hotelDetail)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    flex: 1,
    height: 128,
  },
  buttonContainer: {
    flex: 0,
    padding: 16,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    bottom: 0,
    alignItems: 'center',
  },
  loveIcon: {
    alignSelf: 'flex-start',
    position: 'absolute',
    right: 0,
    margin: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 4,
    borderRadius: 20,
    backgroundColor: '#5096a6',
    marginBottom: 16,
  },
  rating: {
    marginHorizontal: 4,
  },
  titleContainer: {
    flexDirection: 'column',
    marginBottom: 8,
  },
  hotelInfo: {
    flex: 1,
    marginBottom: 0,
  },
  hotelFeatures: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  carouselContainer: {
    height: 128,
    flexDirection: 'row',
    width: 172,
  },
});

export default HotelScreen;
