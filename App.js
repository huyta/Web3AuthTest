/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import * as WebBrowser from "@toruslabs/react-native-web-browser";
import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
} from '@web3auth/react-native-sdk';
//import '@ethersproject/shims';
//import { ethers } from 'ethers';
import { Buffer } from 'buffer';
global.Buffer = global.Buffer || Buffer;


const scheme = 'huytran';
const resolvedRedirectUrl = `${scheme}://auth`;
const clientId = 'BAY_7b_3YlupFJbGkSaLCBTGxmGLxmaR5_RIG7qTg3_0jkXMn5stbzcT5PrFyA-TNPfSSZJGgJgrc9yyelsDRCk';
const providerUrl = 'https://rpc.ankr.com/polygon';


const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const login = async () => {
    try {
      const web3auth = new Web3Auth(WebBrowser, {
        clientId,
        network: OPENLOGIN_NETWORK.TESTNET, // or other networks
      });

      const info = await web3auth.login({
        redirectUrl: resolvedRedirectUrl,
        loginProvider: LOGIN_PROVIDER.GOOGLE,
        //mfaLevel: 'mandatory',
        //curve: 'secp256k1',
        /*extraLoginOptions: {
          login_hint: "trananh_huy@yahoo.com",
        },*/
      });
      console.log('Logged In:', info);
      //const wallet = new ethers.Wallet(info.privKey || '');
      //const address = wallet.address;
      //console.log(address);

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button title='Login' onPress={() => login()}></Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
