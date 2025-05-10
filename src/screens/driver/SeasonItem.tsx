import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

interface Styles {
  container: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
}

const styles: Styles = {
  container: {
    height: 48,
    borderRadius: 48 / 2,
    paddingHorizontal: 8,
    backgroundColor: 'green',
    justifyContent: 'center',
    minWidth: 60,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
};

type Props = PropsWithChildren<{
  title: string;
  driverId: string;
  onPress: (title: string, driverId: string) => void;
}>;

export const SeasonItem: React.FC<Props> = props => {
  const {title = '', driverId = '', onPress} = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(title, driverId)}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
