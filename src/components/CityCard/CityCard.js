import React from 'react';
import {Pressable, Text, Image, View, StyleSheet} from 'react-native';
import CustomText from '../CustomText';

const CityCard = ({imageUrl, cityName, onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {/* Image */}
      <Image
        style={styles.image}
        source={{
          uri: imageUrl,
        }}
      />
      {/* Label */}
      <View style={styles.labelContainer}>
        <CustomText label={cityName} type="caption" color="black" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 128,
    height: 128,
    overflow: 'hidden',
    borderRadius: 12,
    marginHorizontal: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  labelContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 8,
    width: '100%',
    height: 35,
    backgroundColor: '#FFC947',
  },
});
export default CityCard;
