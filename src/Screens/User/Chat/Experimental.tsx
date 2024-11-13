import React, { useCallback } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { AdyenCheckout, useAdyenCheckout } from '@adyen/react-native';
import { configuration } from '../../../Services/Payments'

// Componente principal
const CheckoutPage = ({ paymentMethods }: any) => {
  
  // Manejador para enviar el pago
  const submitHandler = useCallback(
    (data, component, extra) => {
      // Aquí harías la petición a /payments
      console.log('Datos de pago enviados:', data);
      // Cuando termines, llama a hide() para cerrar el componente
      component.hide(true);
    },
    []
  );
  
  // Manejador para errores
  const errorHandler = useCallback(
    (error, component) => {
      // Manejo de errores o cancelaciones por parte del usuario
      console.error('Error en el pago:', error);
      // Cierra el componente si hay un error
      component.hide(false);
    },
    []
  );

  // Manejador para detalles adicionales
  const additionalDetailsHandler = useCallback(
    (data, component) => {
      // Aquí harías la petición a /payments/details
      console.log('Detalles adicionales enviados:', data);
      // Cuando termines, llama a hide() para cerrar el componente
      component.hide(true);
    },
    []
  );

  return (
    <View style={styles.container}>
      {/* Componente de Adyen Checkout */}
      <AdyenCheckout
        config={configuration}
        paymentMethods={paymentMethods}
        onSubmit={submitHandler}
        onError={errorHandler}
        onAdditionalDetails={additionalDetailsHandler}
      >
        {/* Tu vista de Checkout */}
        <YourCheckoutView />
      </AdyenCheckout>
    </View>
  );
};

// Componente personalizado para mostrar el botón de Checkout
const YourCheckoutView = () => {
  const { start } = useAdyenCheckout();

  return (
    <View style={styles.checkoutButtonContainer}>
      {/* Botón que inicia el proceso de pago */}
      <Button
        title="Checkout"
        onPress={() => {
          start('dropIn'); // Muestra la lista de métodos de pago
        }}
      />
    </View>
  );
};

// Estilos para la página
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  checkoutButtonContainer: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
});

export default CheckoutPage;
