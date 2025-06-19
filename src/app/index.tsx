import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {AppNavigation} from '@src/appNavigation';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {store, persistor} from '@src/store';

// if (__DEV__) {
//   require('react-native-devsettings/withAsyncStorage');
// }

export const App: React.FC = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};
