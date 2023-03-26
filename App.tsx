
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import CoinContainer from "./src/components/CoinContainer";

const App = () => {
  return (
    <>
      {/*<StatusBar />*/}
      <SafeAreaView {...styles.body}>
        <CoinContainer/>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.black,
  }
});

export default App;
