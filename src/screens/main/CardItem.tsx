import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {useNavigation} from '@src/hooks';
import {get} from 'lodash';
import {Driver} from './';

interface Styles {
  container: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
}

const styles: Styles = {
  container: {
    height: 60,
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  text: {
    color: 'black',
  },
};

export const CardItem = React.memo((props: Driver) => {
  console.log('CardItem:', {props});
  const familyName = get(props, ['familyName'], '');
  const givenName = get(props, ['givenName'], '');
  const driverId = get(props, ['driverId'], '');

  const {handleGoTo} = useNavigation();

  const title = `${givenName} ${familyName}`;

  const goToDriver = () => {
    handleGoTo({
      screen: 'Driver',
      params: {driverId, title},
    });
  };

  return (
    <TouchableOpacity
      onPress={goToDriver}
      activeOpacity={0.6}
      style={styles.container}>
      <Text style={styles.text}>{familyName}</Text>
      <Text style={styles.text}>{givenName}</Text>
    </TouchableOpacity>
  );
});
