import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {get} from 'lodash';
import {BASE_URL} from '@src/config';

// Асинхронный thunk для загрузки водителей
export const fetchDrivers = createAsyncThunk(
  'list/fetchDrivers',
  async ({limit, offset}: {limit: number; offset: number}) => {
    const {data} = await axios.get(
      `${BASE_URL}/drivers.json?limit=${limit}&offset=${offset}`,
    );
    // Возвращаем массив водителей
    return get(data, ['MRData', 'DriverTable', 'Drivers'], []);
  },
);

type InitialState = {
  items: [];
  currentPage: number;
  pageSize: number;
  loading: boolean;
  error: null | undefined | string;
};

const initialState: InitialState = {
  items: [],
  currentPage: 1,
  pageSize: 10,
  loading: false,
  error: null,
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    setReset: () => initialState,
  },
  selectors: {
    itemsSelector: (state: InitialState) => state.items,
    currentPageSelector: (state: InitialState) => state.currentPage,
    pageSizeSelector: (state: InitialState) => state.pageSize,
    loadingSelector: (state: InitialState) => state.loading,
    errorSelector: (state: InitialState) => state.error,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDrivers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const listActions = listSlice.actions;
export const listSelectors = listSlice.selectors;
export default listSlice;
