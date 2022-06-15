import React, {useState} from 'react';
import CustomText from './../CustomText';
import {Pressable, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const CustomDropdown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'USD', value: 'USD'},
    {label: 'IDR', value: 'IDR'},
  ]);
  return (
    <DropDownPicker
      open={open}
      value={value}
      setValue={setValue}
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

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
    // alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  wrapped: {
    borderRadius: 40,
    borderColor: '#FFF7EF',
    borderWidth: 2,
    // height: 40,
  },
});

export default CustomDropdown;
