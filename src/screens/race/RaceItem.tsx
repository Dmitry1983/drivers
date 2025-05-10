import React from 'react';
import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {get} from 'lodash';
import {RaceProps} from './';

interface Styles {
  container: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
  block: StyleProp<ViewStyle>;
}

const styles: Styles = {
  container: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'grey',
    height: 100,
  },
  text: {
    color: 'white',
  },
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

export const RaceItem = React.memo((props: RaceProps) => {
  const date = get(props, ['item', 'date'], '');
  const raceName = get(props, ['item', 'raceName'], '');
  const round = get(props, ['item', 'round'], '');

  const laps = get(props, ['item', 'Results', 0, 'laps'], '');
  const number = get(props, ['item', 'Results', 0, 'number'], '');
  const points = get(props, ['item', 'Results', 0, 'points'], '');
  const position = get(props, ['item', 'Results', 0, 'position'], '');
  const status = get(props, ['item', 'Results', 0, 'status'], '');

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Text style={styles.text}>{round}</Text>
        <Text style={styles.text}>{raceName}</Text>
        <Text style={styles.text}>{date}</Text>
      </View>
      <Text style={styles.text}>number: {number}</Text>
      <View style={styles.block}>
        <Text style={styles.text}>laps: {laps}</Text>
        <Text style={styles.text}>points: {points}</Text>
        <Text style={styles.text}>position: {position}</Text>
      </View>
      <Text style={styles.text}>status: {status}</Text>
    </View>
  );
});
