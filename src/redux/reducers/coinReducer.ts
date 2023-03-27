import {UPDATE_SINGLE_COIN, UPDATE_COINS, UPDATE_STATUS} from "../actions";
import {Coin, UpdateAction} from "../../types/types";
interface CoinState {
  coins: Coin[],
  status: string
}

const initialState: CoinState = {
  coins: [],
  status: 'loading',
};
const coinReducer = (state = initialState, action:UpdateAction) => {
  switch (action.type) {
    case UPDATE_COINS: {
      return {
        ...state,
        coins: action.payload
      };
    }case UPDATE_SINGLE_COIN: {
      const newArray = state.coins.map((coin:Coin) => {
        if (coin.symbol.toUpperCase() === action.payload.FROMSYMBOL) {
          return {...coin, statusDiffer: coin.price >  action.payload.PRICE ? 'UP' : 'DOWN', price: action.payload.PRICE}
        }
        else return coin
      });
      return {
        ...state,
        coins: newArray
      };
    }
    case UPDATE_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    default:
      return state;
  }
}
export default coinReducer;
