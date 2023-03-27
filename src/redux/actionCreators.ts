import {UPDATE_STATUS, UPDATE_COINS, UPDATE_SINGLE_COIN} from "./actions"
import {Coin, UpdateAction} from "../types/types"
export function updateStatus(status: string) {
    const action: UpdateAction = {
        type: UPDATE_STATUS,
        payload: status,
    }
}
export function updateCoins(coins: Coin[]) {
    const action: UpdateAction = {
        type: UPDATE_COINS,
        payload: coins,
    }
}
export function updateSingleCoin(data:any) {
    const action: UpdateAction = {
        type: UPDATE_SINGLE_COIN,
        payload: data,
    }
}
