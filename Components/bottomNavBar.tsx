import React, { FC, useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ToastAndroid,
  StyleSheet,
  ViewStyle,
  StyleProp
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { colors, icons } from '../Globals';
import { selectHttpOptionsAndBody } from '@apollo/client';
import { color } from 'react-native-reanimated';

interface Props {
  primary?: boolean;
  secondary?: boolean;
  disabled?: boolean;

  callback?: () => void;
  textStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  icon?: any;
  iconSize?: number;
  iconColor?: string;
  text?: string;
}

export const Clickable: FC<Props> = ({
  primary = false,
  secondary = false,
  disabled = false,
  callback = () => console.log('You clicked here !'),
  textStyle = {},
  iconStyle = {},
  style = {},
  icon = 'codesquareo',
  iconSize = 24,
  iconColor = 'empty',
  text = 'Click here',
}) => {
  const [iconFColor, setIconColor] = useState('');

  useEffect(() => {
    setIconColor(colors.black);
    if (iconColor !== 'empty')
      setIconColor(iconColor);
    else {
      if (primary)
        setIconColor(colors.white);
      else if (secondary)
        setIconColor(colors.primary);
      else if (disabled)
        setIconColor(colors.disabledText);
    }
  }, []);


  return (
    <TouchableOpacity
      onPress={() => callback()}
      disabled={disabled}
      style={[
        style,
        styles.container,
        primary && styles.primary,
        secondary && styles.secondary,
        disabled && {backgroundColor: '#aaa'}
      ]}
    >
      <View style={{
        flexDirection: 'row',
        alignSelf: 'center'
      }}>
        <AntDesign
          name={icon}
          size={iconSize}
          color={iconFColor}
          style={[
            iconStyle,
            styles.textStyle,
          ]}
        />
        <Text
          style={[
            textStyle,
            styles.textStyle,
            disabled && {color: colors.disabledText},
            primary && {color: colors.white},
            secondary && {color: colors.primary}
          ]}
        > {text} </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingVertical: 10,
    backgroundColor: colors.lightGrey
  },
  textStyle: {
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.lightGrey,
    borderColor: colors.primaryDark,
    borderWidth: 2
  },
  secondaryText: {
    color: colors.primary
  }
});