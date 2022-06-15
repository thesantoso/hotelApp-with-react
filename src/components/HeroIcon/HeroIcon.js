import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  HeartIcon as HeartSolid,
  StarIcon as StarSolid,
} from 'react-native-heroicons/solid';
import {
  HeartIcon as HeartOutline,
  UserIcon as UserOutline,
} from 'react-native-heroicons/outline';

const HeroIcon = ({icon}) => {
  const renderIcon = type => {
    if (type === 'HeartSolid') {
      return <HeartSolid size={20} color="#FFC947" />;
    } else if (type === 'HeartOutline') {
      return <HeartOutline size={20} color="#FFC947" />;
    } else if (type === 'UserOutline') {
      return <UserOutline size={20} color="#FFC947" />;
    }
  };
  return <View style={styles.container}>{renderIcon(icon)}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#0A1931',
    borderRadius: 56,
    alignSelf: 'flex-start',
  },
});

export default HeroIcon;
