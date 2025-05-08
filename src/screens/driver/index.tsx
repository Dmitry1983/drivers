import React from 'react';
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  ScrollView,
  ActivityIndicator,
  Button,
  Linking,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {fetchDriver, driverSelectors} from '@src/store/driverSlice';
import {get, isEmpty} from 'lodash';

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

  const givenName = get(driver, ['givenName'], '');
  const familyName = get(driver, ['familyName'], '');
  const dateOfBirth = get(driver, ['dateOfBirth'], '');
  const nationality = get(driver, ['nationality'], '');
  const url = get(driver, ['url'], '');

  const loading = useSelector(driverSelectors.loadingSelector);
  const error = useSelector(driverSelectors.errorSelector);

  React.useEffect(() => {
    dispatch(fetchDriver({driverId}));
  }, [driverId, dispatch]);

  const alertShowHandler = () => Alert.alert('url is Empty!');

  const goToUrlHandler = () => {
    if (isEmpty(url)) {
      return alertShowHandler();
    }
    Linking.openURL(url);
  };

  return (
    <View style={[styles.container, {paddingBottom: bottom}]}>
      {loading && <ActivityIndicator size={'large'} />}
      {error && <Text>Error: {error}</Text>}
      {!loading && !error && (
        <ScrollView>
          <Text style={styles.text}>driverId: {driverId}</Text>
          <Text style={styles.text}>givenName: {givenName}</Text>
          <Text style={styles.text}>familyName: {familyName}</Text>
          <Text style={styles.text}>dateOfBirth: {dateOfBirth}</Text>
          <Text style={styles.text}>nationality: {nationality}</Text>
          <Button title="GOTO Wiki" onPress={goToUrlHandler} />
        </ScrollView>
      )}
    </View>
  );
};
