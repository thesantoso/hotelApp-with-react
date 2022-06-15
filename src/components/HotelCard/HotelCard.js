import React from 'react';
import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import CustomText from '../CustomText';
import {StarIcon} from 'react-native-heroicons/solid';
import HeroIcon from '../HeroIcon/HeroIcon';

const HotelCard = ({
  imageUrl,
  hotelName,
  country,
  rating,
  onPress,
  onSave,
  saved = false,
  hideRatingIcon = false,
  hideSaveIcon = false,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {/* Hotel Image */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: imageUrl,
          }}
        />
        {hideSaveIcon ? (
          <></>
        ) : (
          <Pressable style={styles.loveIcon} onPress={onSave}>
            <HeroIcon icon={!saved ? 'HeartOutline' : 'HeartSolid'} />
          </Pressable>
        )}
      </View>
      {/* Hotel Info */}
      <View style={styles.info}>
        {/* Country */}
        <View style={styles.country}>
          <CustomText label={country} type="body" color="#FFF7EF" />
        </View>
        {/* Hotel Name */}
        <View style={styles.hotel}>
          <CustomText label={hotelName} type="subheadline" color="#FFF7EF" />
        </View>
        {/* Hotel Rating */}
        <View style={styles.ratingContainer}>
          {rating ? (
            <>
              {hideRatingIcon ? <></> : <StarIcon size={16} color="#FFC947" />}
              <View style={styles.rating}>
                <CustomText label={rating} type="caption" color="#FFC947" />
              </View>
            </>
          ) : (
            <></>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // borderWidth: 2,
    height: 128,
    marginHorizontal: 16,
    backgroundColor: '#0A1931',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  imageContainer: {
    width: '50%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    flex: 1,
    // borderWidth: 2,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  country: {
    opacity: 0.4,
  },
  hotel: {
    marginVertical: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  rating: {
    marginHorizontal: 4,
  },
  loveIcon: {
    // borderWidth: 2,
    // borderColor: 'white',
    alignSelf: 'flex-start',
    position: 'absolute',
    right: 0,
    margin: 8,
  },
});
export default HotelCard;
