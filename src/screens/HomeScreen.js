import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, FlatList} from 'react-native';
import CustomText from './../components/CustomText';
import CustomButton from './../components/CustomButton';
import CustomInput from './../components/CustomInput';
import CityCard from './../components/CityCard';
import HotelCard from './../components/HotelCard';
import {useNavigation} from '@react-navigation/native';
import {
  fetchHotel,
  updateSearchQuery,
  setDetail,
  getFeatures,
} from './../stores/hotelReducer';
import {addWishlist, updateWishlist} from './../stores/wishlistReducer';
import {useSelector, useDispatch} from 'react-redux';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [city, setCity] = useState(null);
  const {isLoading, hotelList, cityList} = useSelector(state => state.hotel);
  const {wishlist} = useSelector(state => state.wishlist);
  const {isAuth} = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchHotel());
  }, []);

  const checkItem = query => {
    const found = wishlist.some(el => el.name === query.name);
    return found;
  };

  const searchPressed = async () => {
    const createQuery = {
      city: city,
      currency: 'usd',
    };
    await dispatch(updateSearchQuery(createQuery));
    navigation.navigate('Search');
  };

  const cityPressed = async query => {
    const createQuery = {
      city: query,
      currency: 'usd',
    };
    await dispatch(updateSearchQuery(createQuery));
    navigation.navigate('Search');
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
    await dispatch(
      getFeatures(
        `https://hotels4.p.rapidapi.com/properties/get-details?id=${item.id}`,
      ),
    );
    await dispatch(setDetail(item));
    navigation.navigate('Hotel');
  };

  const renderCities = (
    {item}, //item ini refer ke DATA
  ) => (
    <CityCard
      imageUrl={item.imageUrl}
      cityName={item.cityName}
      onPress={() => cityPressed(item.cityValue)}
    />
  );

  const renderHotels = (
    {item}, //item ini refer ke DATA
  ) => (
    <HotelCard
      imageUrl={item.optimizedThumbUrls.srpDesktop}
      hotelName={item.name}
      country={item.address.countryName}
      rating={item.starRating}
      onPress={() => hotelPressed(item)}
      onSave={() => savePressed(item)}
      saved={checkItem(item) ? true : false}
    />
  );

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView>
        <View style={{backgroundColor: 'white', flex: 1}}>
          {/* Heading */}
          {isLoading ? (
            <>
              <View style={styles.loading}>
                <CustomText
                  label="Tunggu sebentar..."
                  type="headline"
                  color="black"
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.heading}>
                <CustomText
                  label="Temukan Hotel"
                  type="headline"
                  color="black"
                />
              </View>

              {/* Form */}
              <CustomInput
                placeholder="Country/City"
                value={city}
                onChangeText={city => setCity(city)}
              />
              <View style={styles.buttonContainer}>
                {/* <CustomDropdown /> */}
                <CustomButton
                  label="CARI HOTEL"
                  onPress={() => searchPressed()}
                />
              </View>

              {/* Countries */}
              <View style={styles.countries}>
                <View style={styles.heading}>
                  <CustomText
                    label="Kota-kota di Indonesia"
                    type="subheadline"
                    color="black"
                  />
                </View>
                <View style={styles.cards}>
                  {/* <ScrollView style={styles.scroll} horizontal={true}> */}
                  <View style={styles.wrapped}>
                    <FlatList
                      data={cityList}
                      horizontal={true}
                      renderItem={renderCities}
                      // keyExtractor={item => item.id}
                    />
                  </View>
                  {/* </ScrollView> */}
                </View>
              </View>

              <View style={styles.heading}>
                <CustomText
                  label="Destinasi Populer"
                  type="subheadline"
                  color="black"
                />
              </View>
              <FlatList
                data={hotelList}
                // horizontal={true}
                renderItem={renderHotels}
                // keyExtractor={item => item.id}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    margin: 16,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cards: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  wrapped: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    overflow: 'visible',
  },
  loading: {
    flex: 1,
    margin: 16,
    marginVertical: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
