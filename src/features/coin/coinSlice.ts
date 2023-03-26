import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import CoinType from "./CoinType";
interface CoinState {
  coins: CoinType[],
  status: string
}

const initialState: CoinState = {
  coins: [],
  status: 'loading',
};

export const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    updateCoins: (state, action: PayloadAction<CoinType[]>) => {
      state.coins = action.payload;
    },
    updateStatus: (state, action:PayloadAction<string>) => {
      state.status = action.payload;
    }
  },
});

export const {updateCoins,updateStatus} = coinSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.coin.value)`
export const selectCoins = (state: RootState) => state.coin.coins;

export default coinSlice.reducer;
