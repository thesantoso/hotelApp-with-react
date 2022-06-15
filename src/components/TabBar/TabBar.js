import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {SearchIcon, HeartIcon, UserIcon} from 'react-native-heroicons/outline';

const TabBar = ({searchPress, wishlistPress, profilePress}) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.tab} onPress={searchPress}>
        <SearchIcon size={20} color="#FFC947" />
        <Text style={styles.text}>Search</Text>
      </Pressable>
      <Pressable style={styles.tab} onPress={wishlistPress}>
        <HeartIcon size={20} color="#FFC947" />
        <Text style={styles.text}>Wishlist</Text>
      </Pressable>
      <Pressable style={styles.tab} onPress={profilePress}>
        <UserIcon size={20} color="#FFC947" />
        <Text style={styles.text}>Profile</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#0A1931',
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFC947',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: -0.2,
  },
});

export default TabBar;
