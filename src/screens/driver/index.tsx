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
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fetchDriver, driverSelectors, fetchSeasons} from '@src/store';
import {get, isEmpty} from 'lodash';
import {Season} from './Season';
import {SeasonItem} from './SeasonItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@src/appNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Driver'>;

interface Styles {
  container: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
  seasonsContainer: StyleProp<ViewStyle>;
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
  seasonsContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
};

type AppDispatch = ThunkDispatch<any, undefined, Action>;

export const DriverScreen: React.FC<Props> = props => {
  const driverId = get(props, ['route', 'params', 'driverId'], '');
  console.log('DriverScreen:', {props});
  const {bottom} = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const driver = useSelector(driverSelectors.itemSelector);
  const seasons = useSelector(driverSelectors.seasonsSelector);

  console.log({seasons});

  const givenName = get(driver, ['givenName'], '');
  const familyName = get(driver, ['familyName'], '');
  const dateOfBirth = get(driver, ['dateOfBirth'], '');
  const nationality = get(driver, ['nationality'], '');
  const url = get(driver, ['url'], '');

  const loading = useSelector(driverSelectors.loadingSelector);
  const error = useSelector(driverSelectors.errorSelector);

  React.useEffect(() => {
    const featching = async () => {
      await dispatch(fetchDriver({driverId}));
      await dispatch(fetchSeasons({driverId}));
    };
    featching();
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
        <>
          <ScrollView>
            <Text style={styles.text}>driverId: {driverId}</Text>
            <Text style={styles.text}>givenName: {givenName}</Text>
            <Text style={styles.text}>familyName: {familyName}</Text>
            <Text style={styles.text}>dateOfBirth: {dateOfBirth}</Text>
            <Text style={styles.text}>nationality: {nationality}</Text>
            <Button
              title="GOTO Wiki"
              onPress={goToUrlHandler}
              color={'green'}
            />
            <Text>Races by season</Text>
            <View style={styles.seasonsContainer}>
              {seasons.map(item => {
                return (
                  <React.Fragment key={item.season}>
                    <Season>
                      {goToSeasonHandle => {
                        return (
                          <SeasonItem
                            title={item.season}
                            driverId={driverId}
                            onPress={goToSeasonHandle}
                          />
                        );
                      }}
                    </Season>
                  </React.Fragment>
                );
              })}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};
