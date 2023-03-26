import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import CoinType from "./CoinType";
// import {useAppDispatch, useAppSelector} from '/src/features';
interface PropChildren {
    coin: CoinType
}
export default function Coin(props:PropChildren) {
    // const dispatch = useAppDispatch();
    return (
        <View style={styles.card}>
            <Text style={styles.symbol}>
                {props.coin.symbol}
            </Text>
            <Text style={styles.name}>
                {props.coin.name}
            </Text>
            <Text style={styles.price}>
                {props.coin.price}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent : "space-evenly",
        height: 60,
        width: 120,
        alignItems:"center",
        backgroundColor: "#4b4b4b"
    },
    name: {
        color: "#FFF",
    },
    symbol: {

    },
    price : {

    }
});
