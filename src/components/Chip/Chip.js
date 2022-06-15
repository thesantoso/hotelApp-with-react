import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomText from '../CustomText';

const Chip = ({label}) => {
  return (
    <View style={styles.container}>
      <CustomText label={label} type="body" color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    // height: 40,
    borderWidth: 2,
    borderRadius: 40,
    alignSelf: 'flex-start',
    borderColor: '#FFF7EF',
    marginRight: 8,
  },
});

export default Chip;
