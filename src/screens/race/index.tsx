import React from 'react';
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  FlatList,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRacesOneSeason, raceSelectors} from '@src/store';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {get} from 'lodash';
import {RaceItem} from './RaceItem';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@src/appNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Race'>;

interface Styles {
  container: (bottom: number, isIOS: boolean) => StyleProp<ViewStyle>;
  subContainer: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
  contentContainerStyle: StyleProp<ViewStyle>;
}

const styles: Styles = {
  container: (bottom, isIOS) => ({
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingBottom: isIOS ? bottom : 16,
  }),
  subContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'red',
  },
  contentContainerStyle: {
    paddingTop: 8,
    gap: 8,
    paddingHorizontal: 16,
  },
};

interface Constructor {
  constructorId: string;
  name: string;
  nationality: string;
  url: string;
}

interface Driver {
  driverId: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
}

interface Result {
  Constructor: Constructor;
  Driver: Driver;
  grid: string;
  laps: string;
  number: string;
  points: string;
  position: string;
  positionText: string;
  status: string;
}

export interface RaceProps {
  season: string;
  date: string;
  raceName: string;
  round: string;
  Results: Result[];
}

type AppDispatch = ThunkDispatch<any, undefined, Action>;

export const RaceScreen: React.FC<Props> = props => {
  const dispatch = useDispatch<AppDispatch>();
  const {bottom} = useSafeAreaInsets();
  const isIOS = React.useMemo(() => Platform.OS === 'ios', []);

  const driverId = get(props, ['route', 'params', 'driverId'], '');
  const title = get(props, ['route', 'params', 'title'], '');

  const items = useSelector(raceSelectors.itemsSelector);
  const loading = useSelector(raceSelectors.loadingSelector);
  const error = useSelector(raceSelectors.errorSelector);

  React.useEffect(() => {
    dispatch(fetchRacesOneSeason({driverId, season: title}));
  }, [driverId, title, dispatch]);

  const renderItem = React.useCallback(
    ({item}: {item: RaceProps}) => <RaceItem {...item} />,
    [],
  );
  const keyExtractor = React.useCallback((item: RaceProps) => item.round, []);

  return (
    <View style={styles.container(bottom, isIOS)}>
      <View style={styles.subContainer}>
        {loading && <ActivityIndicator size={'large'} />}
        {error && <Text>Error: {error}</Text>}
        {!loading && !error && (
          <>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              contentContainerStyle={styles.contentContainerStyle}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </View>
  );
};
