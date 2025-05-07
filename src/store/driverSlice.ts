import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {get} from 'lodash';

// Асинхронный thunk для загрузки водителя
export const fetchDriver = createAsyncThunk(
  'driver/fetchDriver',
  async ({driverId}: {driverId: string}) => {
    const response = await axios.get(
      `https://ergast.com/api/f1/drivers/${driverId}.json`,
    );

    const {data} = response;
    // Возвращаем информацию водителя по driverId
    const result = get(data, ['MRData', 'DriverTable', 'Drivers', 0]);
    return result;
  },
);

type InitialState = {
  item: {};
  loading: boolean;
  error: null | undefined | string;
};

const initialState: InitialState = {
  item: {},
  loading: false,
  error: null,
};

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    setReset: () => initialState,
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
      });
  },
});

export const driverActions = driverSlice.actions;

export default driverSlice;

// Селекторы
export const itemSelector = (state: InitialState) => state.driver.item;
export const loadingSelector = (state: InitialState) => state.driver.loading;
export const errorSelector = (state: InitialState) => state.driver.error;

export const driverSelectors = {
  itemSelector,
  loadingSelector,
  errorSelector,
};
