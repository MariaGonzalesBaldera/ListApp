import { StyleSheet } from 'react-native';

const Size = {
  xs: 12,
  s: 14,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  xxxxl: 48
};

const Weight = {
  Light: '400',
  Regular: '500',
  Medium: '600',
  Bold: '700'
};

const Line = {
  S: 19.2,
  M: 20.8,
  L: 24
};

// Define estilos reutilizables
const fonts = StyleSheet.create({
  //H - Bold y Semibold
  H1: {
    //fontFamily: 'CrimsonPro-Medium',
    fontFamily: 'CrimsonPro-Medium',
    fontSize: Size.xxxxl,
    fontWeight: Weight.Bold,

  },
  H2: {
    fontSize: Size.xxxl,
    fontWeight: Weight.Regular,
    fontFamily: 'CrimsonPro-Medium',
 
  },
  H3: {
    fontSize: Size.xxl,
    fontWeight: '500',
    fontFamily: 'CrimsonPro-Medium',
  
  },
  H4: {
    fontSize: Size.xl,
    fontWeight: Weight.Regular,
    fontFamily: 'CrimsonPro-Medium',

  },
  H5: {
    fontSize: Size.m,
    fontWeight: '600',
    lineHeight: Line.M
  },
  H6: {
    fontSize: Size.xxl,
    fontWeight: Weight.Regular,
    fontFamily: 'CrimsonPro-Medium',
  
  },
  H7: {
    fontSize: Size.xxl,
    fontWeight: '500',
    fontFamily: 'CrimsonPro-Medium',
  
  },
  //Section Bold y SemiBold
  S1: {
    fontSize: Size.xl,
    fontWeight: Weight.Medium,
    fontFamily: 'CrimsonPro-Medium',
  },
  S2: {
    fontSize: Size.l,
    fontWeight: Weight.Medium,
    fontFamily: 'CrimsonPro-Medium',
    lineHeight: Line.M
  },
  //Body 
  B1: {
    fontSize: Size.sm,
    fontWeight: Weight.Light,
    lineHeight: Line.M
  },
  B2: {
    fontSize: Size.m,
    fontWeight: '600',
    lineHeight: Line.M
  },
  B3: {
    fontSize: Size.s,
    fontWeight: '400',
    lineHeight: Line.M
  },
  B4: {
    fontSize: Size.m,
    fontWeight: '400',
    lineHeight: Line.M
  },
  B5: {
    fontSize: Size.s,
    fontWeight: '400',
    lineHeight: Line.M
  },
  // Button 
  Btn:{
    fontSize: Size.m,
    fontWeight: Weight.Medium,
 
  },
  // Caption
  C1B: {
    fontSize: Size.xs,
    fontWeight: '600',

    lineHeight: Line.M
  },
  C2B: {
    fontSize: 12,
    fontWeight: '400',

    lineHeight: Line.M
  },
  C3B: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: Line.M
  },
  CXB: {
    fontSize: 10,
    fontWeight: '600',

    lineHeight: Line.M
  },
  CYB: {
    fontSize: 12,
    fontWeight: '500',
  },


  // Puedes agregar más estilos según sea necesario
});

// Exporta los estilos
export default fonts