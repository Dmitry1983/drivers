import React from 'react';
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {fetchDriver, driverSelectors} from '@src/store/driverSlice';
import {get} from 'lodash';

interface Styles {
  container: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
}

const styles: Styles = {
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    paddingVertical: 8,
    fontSize: 18,
  },
};

export const DriverScreen = (props: any) => {
  const driverId = get(props, ['route', 'params', 'driverId'], '');
  const {bottom} = useSafeAreaInsets();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const driver = useSelector(driverSelectors.itemSelector);
  const loading = useSelector(driverSelectors.loadingSelector);
  const error = useSelector(driverSelectors.errorSelector);

  React.useEffect(() => {
    dispatch(fetchDriver({driverId}));
  }, [driverId, dispatch]);

  return (
    <View style={[styles.container, {paddingBottom: bottom}]}>
      {loading && <ActivityIndicator size={'large'} />}
      {error && <Text>Error: {error}</Text>}
      {!loading && !error && (
        <ScrollView>
          <Text style={styles.text}>driverId: {driver.driverId}</Text>
          <Text style={styles.text}>givenName: {driver.givenName}</Text>
          <Text style={styles.text}>familyName: {driver.familyName}</Text>
          <Text style={styles.text}>dateOfBirth: {driver.dateOfBirth}</Text>
          <Text style={styles.text}>nationality: {driver.nationality}</Text>
        </ScrollView>
      )}
    </View>
  );
};
