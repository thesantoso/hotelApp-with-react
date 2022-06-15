import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CustomText = ({label, type, color}) => {
  const RenderText = () => {
    if (type === 'headline') {
      return <Text style={[styles.headline, {color: color}]}>{label}</Text>;
    } else if (type === 'subheadline') {
      return <Text style={[styles.subheadline, {color: color}]}>{label}</Text>;
    } else if (type === 'link') {
      return <Text style={[styles.link, {color: color}]}>{label}</Text>;
    } else if (type === 'caption') {
      return <Text style={[styles.caption, {color: color}]}>{label}</Text>;
    } else {
      return <Text style={[styles.body, {color: color}]}>{label}</Text>;
    }
  };
  return <View>{RenderText()}</View>;
};

const styles = StyleSheet.create({
  headline: {
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: -0.96,
  },
  subheadline: {
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.64,
  },
  body: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.24,
  },
  link: {
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.24,
  },
  caption: {
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.24,
  },
});

export default CustomText;
