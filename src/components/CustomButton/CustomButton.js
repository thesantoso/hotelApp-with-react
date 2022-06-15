import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import CustomText from './../CustomText';

const CustomButton = ({onPress, label, type = 'PRIMARY'}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}>
      <CustomText
        type="link"
        color={type === 'PRIMARY' ? '#0A1931' : '#FF4747'}
        label={label}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,

    // padding: 15,
    height: 40,
    justifyContent: 'center',

    alignItems: 'center',
    borderRadius: 40,
  },

  container_PRIMARY: {
    backgroundColor: '#FFC947',
  },

  container_SECONDARY: {
    backgroundColor: 'transparent',
    borderColor: '#FFF7EF',
    borderWidth: 2,
  },
});

export default CustomButton;
