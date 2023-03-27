import React from 'react';
import {
    StyleSheet,
    Text,
    Animated,
} from 'react-native';
import {Coin as CoinType} from "../types/types";
interface PropChildren {
    coin: CoinType
}
export default function Coin(props:PropChildren) {
    const statusDiffer = () => {
        switch (props.coin.statusDiffer) {
            case ("UP"):
                return styles.up;
            case ("DOWN"):
                return styles.down;
            default: return ;
        }
    }
    return (
        <Animated.View style={[styles.card , statusDiffer()]}>
            <Text style={styles.symbol}>
                {props.coin.symbol}
            </Text>
            <Text style={styles.name}>
                {props.coin.name}
            </Text>
            <Text style={styles.price}>
                {props.coin.price}
            </Text>
        </Animated.View>
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
    up: {
        backgroundColor: "#08ff00"
    },
    down: {
        backgroundColor: "#f10000"
    },
    name: {
        color: "#FFF",
    },
    symbol: {

    },
    price : {

    }
});
