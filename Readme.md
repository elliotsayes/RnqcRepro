Created to reproduce https://github.com/margelo/react-native-quick-crypto/issues/118

## Instructions:

- `yarn install && npx pod-install`
- `yarn ios`
- Click `testSign` button (No error)
- Click `testDecryptValidWithFinal` AND `testDecryptInvalidWithoutFinal` buttons
- Click `testSign` button AGAIN (No error)
- Click `testDecryptInvalidWITHFinal` button
- Click `testSign` button ONCE AGAIN, observe Error is thrown
- Check source code in `App.tsx`

## Reproduction steps:

Initialize: 
- `npx react-native init RnqcRepro --template react-native-template-typescript`
- `git init && git add . && git commit -m "Initial commit`

Install quick-crypto (rn701 fork):
- `yarn add ArweaveNative/react-native-quick-crypto#built/rn701`
- `yarn add react-native-quick-base64`
- `npx pod-install`

Install & configure dependencies:
- `yarn add @craftzdog/react-native-buffer`
- `yarn add stream-browserify`
- `yarn add --dev babel-plugin-module-resolver`
- Add module resolution to `babel.config.js`

Create demo
- Add example RSA PEM (`rsa_pem.json`)
- Modify `App.tsx` with demo buttons
