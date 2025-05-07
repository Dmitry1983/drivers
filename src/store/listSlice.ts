import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {get} from 'lodash';

// Асинхронный thunk для загрузки водителей
export const fetchDrivers = createAsyncThunk(
  'list/fetchDrivers',
  async ({limit, offset}: {limit: number; offset: number}) => {
    const response = await axios.get(
      `https://ergast.com/api/f1/drivers.json?limit=${limit}&offset=${offset}`,
    );
    const {data} = response;
    // console.log({data});
    // Возвращаем массив водителей
    const result = get(data, ['MRData', 'DriverTable', 'Drivers']);
    return result;
    // return data.MRData.DriverTable.Drivers;
  },
);

type InitialState = {
  items: any[];
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

export default listSlice;

// Селекторы
export const itemsSelector = (state: InitialState) => state.list.items;
export const currentPageSelector = (state: InitialState) =>
  state.list.currentPage;
export const pageSizeSelector = (state: InitialState) => state.list.pageSize;
export const loadingSelector = (state: InitialState) => state.list.loading;
export const errorSelector = (state: InitialState) => state.list.error;

export const listSelectors = {
  itemsSelector,
  currentPageSelector,
  pageSizeSelector,
  loadingSelector,
  errorSelector,
};
