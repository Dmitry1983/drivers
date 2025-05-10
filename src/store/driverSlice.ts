import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {get} from 'lodash';
import {BASE_URL} from '@src/config';

// Асинхронный thunk для загрузки водителя
export const fetchDriver = createAsyncThunk(
  'driver/fetchDriver',
  async ({driverId}: {driverId: string}) => {
    const {data} = await axios.get(`${BASE_URL}/drivers/${driverId}.json`);
    // Возвращаем информацию водителя по driverId
    return get(data, ['MRData', 'DriverTable', 'Drivers', 0], []);
  },
);

export const fetchSeasons = createAsyncThunk(
  'driver/fetchSeasons',
  async ({driverId}: {driverId: string}) => {
    const {data} = await axios.get(
      `${BASE_URL}/drivers/${driverId}/seasons.json?&limit=100`,
    );
    // Возвращаем информацию сезонов участия водителя по driverId
    return get(data, ['MRData', 'SeasonTable', 'Seasons'], []);
  },
);

type Season = {
  season: string;
  url: string;
};

type InitialState = {
  item: {};
  loading: boolean;
  error: null | undefined | string;
  seasons: Season[];
};

const initialState: InitialState = {
  item: {},
  loading: false,
  error: null,
  seasons: [],
};

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    setReset: () => initialState,
  },
  selectors: {
    itemSelector: (state: InitialState) => state.item,
    loadingSelector: (state: InitialState) => state.loading,
    errorSelector: (state: InitialState) => state.error,
    seasonsSelector: (state: InitialState) => state.seasons,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDriver.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDriver.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(fetchDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSeasons.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeasons.fulfilled, (state, action) => {
        state.loading = false;
        state.seasons = action.payload;
      })
      .addCase(fetchSeasons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const driverActions = driverSlice.actions;
export const driverSelectors = driverSlice.selectors;
export default driverSlice;
