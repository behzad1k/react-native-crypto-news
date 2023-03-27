import { createStore } from "redux";
import coinReducer from './reducers/coinReducer';
const store =  createStore(coinReducer);
export default store;
