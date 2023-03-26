import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {store} from "../features/store";
import CoinType from "../features/coin/CoinType";
import {updateCoins, updateStatus} from "../features/coin/coinSlice";
import fetchCoins from "../features/coin/coinAPI";
import {
    StyleSheet,
    ActivityIndicator,
    Text,
    View,
    FlatList,
} from 'react-native';
import Coin from "../features/coin/Coin";
export default function CoinContainer() {
    const dispatch = useDispatch();
    const status = useSelector((state: ReturnType<typeof store.getState>) => state.coin.status);
    const coins = useSelector((state: ReturnType<typeof store.getState>) => state.coin.coins);
    getInitialCoins(); //TODO: useEffect()
    // const ws = new WebSocket('wss://nbstream.binance.com/lvt/stream');
    // ws.onmessage = (e) => {
    //     console.log(e.data)
    // } TODO: use the grabDataFromResponse to update coins array using websocket
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
        const res = await fetchCoins();
        if (res.status === 200) {
            dispatch(updateCoins(grabDataFromResponse(res.data)))
            dispatch(updateStatus('idle'));
        }
        else dispatch(updateStatus('failed'));
    }
    //TODO: make styles inline
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
        // backgroundColor: "#FFF",
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // flexWrap: 'wrap',
    },
    coinContainerFailed: {
        backgroundColor: "red",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
