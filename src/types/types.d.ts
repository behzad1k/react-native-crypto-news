export type Coin = {
    name: string,
    symbol: string,
    price: number
    statusDiffer?:string
}
export type UpdateAction = {
    type : string
    payload : any
}
