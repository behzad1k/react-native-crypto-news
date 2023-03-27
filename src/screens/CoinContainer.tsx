import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Coin as CoinType} from "../types/types";
import fetchCoins from "../api/fetchAPI";
import {
    StyleSheet,
    ActivityIndicator,
    Text,
    View,
    FlatList,
} from 'react-native';
import Coin from "./Coin";
import {useTypedSelector} from "../hooks/useTypeSelector";
import {UPDATE_COINS, UPDATE_SINGLE_COIN, UPDATE_STATUS} from "../redux/actions";
export default function CoinContainer() {
    useEffect(() => {
        getInitialCoins();
    },[])
    const dispatch = useDispatch();
    const status = useTypedSelector((state) => state.status);
    const coins = useTypedSelector((state) => state.coins);
    const ws = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=f45c4cfd8c9bdc6f2fe459e4027a4d66e0fdeaba2cd1752547742472b1aa18aa');
    ws.onopen = () => {
        ws.send(JSON.stringify({
            "action": "SubAdd",
            "subs": ["2~Coinbase~BTC~USD","2~Coinbase~ETH~USD"]
        }));
    };
    ws.onmessage = (e) => {
        let data = JSON.parse(e.data)
        if (data.TYPE === '2'){
            dispatch({type: UPDATE_SINGLE_COIN, payload: data});
        }
    }
    const grabDataFromResponse = (data: any) :CoinType[] => {
        let newArray: CoinType[] = [];
        data.map((coin:any) => {
            newArray.push({
                'name': coin.name,
                'symbol': coin.symbol,
                'price': coin.current_price
            });
        })
        return newArray;
    }
    async function getInitialCoins() {
        try {
            const res = await fetchCoins();
            if (res.status === 200) {
                dispatch({type: UPDATE_STATUS, payload: 'idle'});
                dispatch({type: UPDATE_COINS, payload: grabDataFromResponse(res.data)});
            } else dispatch({type: UPDATE_STATUS, payload: 'failed'});
        }catch (e) {
            console.log(e);
            dispatch({type: UPDATE_STATUS, payload: 'failed'})
        }
    }
    return (
        status === "loading" ? (
            <View style={styles.coinContainer}>
                <ActivityIndicator size="large" />
            </View>
        ) : (status === "failed" ? (
                <View style={styles.coinContainerFailed}>
                    <Text>Unexpected problem has occured</Text>
                </View>
            ) : (
                <View style={styles.coinContainer}>
                    <FlatList
                        data={coins}
                        renderItem={({item,index}) =>  <Coin coin={item}/>}
                        // keyExtractor={item => item.price}
                    />
                </View>
            )
        )
    );
}

const styles = StyleSheet.create({
    coinContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    coinContainerFailed: {
        backgroundColor: "red",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
