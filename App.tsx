/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import crypto from 'react-native-quick-crypto';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
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

const pem = require('./rsa_pem.json')

const testSign = () => {
  const data = Buffer.from(new Uint8Array(16));
  const res = crypto
    .createSign('sha256')
    .update(data)
    .sign({
    key: pem,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING
  })

  const signature = Buffer.from(res)
  console.log({signature, _length: signature.length})
}

const testDecryptValidWithFinal = () => {
  const key = Uint8Array.from([250, 187, 63, 226, 26, 79, 129, 57, 75, 81, 174, 131, 103, 209, 54, 170, 209, 75, 34, 137, 141, 209, 86, 187, 197, 137, 134, 36, 64, 114, 106, 55])
  const encrypted = Uint8Array.from([255, 132, 52, 236, 193, 99, 226, 127, 90, 111, 189, 134, 166, 63, 183, 29, 66, 68, 174, 119, 10, 141, 89, 13, 119, 159, 188, 251, 174, 74, 193, 131, 14, 225, 116, 175, 186, 66, 184, 103, 143, 244, 192, 111, 223, 192, 188, 183])

  const iv = encrypted.slice(0, 16);
  const data = encrypted.slice(16);
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  
  const update = decipher.update(data);
  console.log({update})
  
  const final = decipher.final();
  console.log({final})
}

const testDecryptInvalid = (doFinal: boolean) => {
  const key = Uint8Array.from([220, 81, 133, 76, 43, 55, 4, 83, 247, 42, 39, 146, 132, 135, 70, 98, 205, 233, 103, 9, 199, 66, 88, 87, 21, 32, 183, 144, 116, 80, 4, 7])
  const encrypted = Uint8Array.from([242, 146, 189, 15, 77, 7, 46, 25, 223, 108, 123, 68, 193, 98, 249, 115, 88, 8, 130, 159, 82, 1, 48, 53, 188, 89, 195, 226, 197, 104, 46, 235, 209, 74, 28, 129, 249, 7, 184, 9, 21, 75, 57, 32, 230, 132, 10, 154])

  const iv = encrypted.slice(0, 16);
  const data = encrypted.slice(16);
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  
  const update = decipher.update(data);
  console.log({update})
  
  if (doFinal) {
    const final = decipher.final();
    console.log({final})
  }
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button title="testSign" onPress={testSign} />
          <Button title="testDecryptValidWithFinal" onPress={testDecryptValidWithFinal} />
          <Button title="testDecryptInvalidWithoutFinal" onPress={() => testDecryptInvalid(false)} />
          <Button title="testDecryptInvalidWITHFinal" onPress={() => testDecryptInvalid(true)} />
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
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
