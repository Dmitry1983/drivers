import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {get} from 'lodash';
import {BASE_URL} from '@src/config';

// Асинхронный thunk для загрузки заездов водителя  за выбранный сезон
export const fetchRacesOneSeason = createAsyncThunk(
  'race/fetchRacesOneSeason',
  async ({driverId, season}: {driverId: string; season: string}) => {
    const {data} = await axios.get(
      `${BASE_URL}/${season}/drivers/${driverId}/results.json?&limit=100`,
    );
    console.log('fetchRaces', {data});
    // Возвращаем массив заездов водителя за выбранный сезон
    return get(data, ['MRData', 'RaceTable', 'Races'], []);
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

const raceSlice = createSlice({
  name: 'race',
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
      .addCase(fetchRacesOneSeason.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRacesOneSeason.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRacesOneSeason.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const raceActions = raceSlice.actions;
export const raceSelectors = raceSlice.selectors;
export default raceSlice;
