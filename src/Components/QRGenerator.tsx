import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRGenerator = ({url}: any) => {
  const qrValue = url ? url : 'No value'; // Tu constante aquí

  return (
    <View style={styles.container}>
      <QRCode
        value={qrValue}
        size={140} // Puedes ajustar el tamaño según tus necesidades
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default QRGenerator;
