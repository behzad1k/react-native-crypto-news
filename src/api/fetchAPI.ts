import axios from "axios";

export default function fetchApi(url?:string,path?:string,params?:any) {
    const baseUrl:string = url || "https://api.coingecko.com/api/v3/coins/";
    const basePath:string = path || "markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
    const baseParams:any = params || {timeout : 5000}
    return (axios.get(baseUrl + basePath, {
       ...baseParams
  }))
}
