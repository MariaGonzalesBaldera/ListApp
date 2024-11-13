let colors = {
  primary: {
    lighest: '#fae6f2',
    light: '#F995CB',
    medium: '#CC007A',
    dark:'#99005C',
    darkest:'#47002B'
  },
  secondary: {
    lighest: '#E6FCFF',
    light: '#B0F6FE',
    medium: '#00E1FD',
    dark:'#00A9BE',
    darkest:'#004F59'
  },
  danger: {
    lighest: '#FCE9E8',
    light: '#F7BCB8',
    medium: '#E4261A',
    dark:'#AB1D14',
    darkest:'#67110C'
  },
  warning: {
    lighest: '#FEF9EA',
    light: '#FDEBBE',
    medium: '#F9C02E',
    dark:'#C79A25',
    darkest:'#95731C'
  },
  successful: {
    lighest: '#EBF7EE',
    light: '#C0E7C9',
    medium: '#35B150',
    dark:'#28853C',
    darkest:'#185024'
  },
  neutral: {
    white: '#ffffff',
    lighest: '#F4F4F4',
    light: '#EFEFEF',
    medium: '#e6e6e6',
    dark:'#515151',
    darkest:'#252525'
  },
  gradient: {
    gradient: {
      colors: ['rgba(242, 201, 48, 1)', 'rgba(108, 11, 232, 1)', 'rgba(27, 8, 80, 1)'],
      locations: [0.04, 0.4582, 0.9635],
    },
    gradient2: {
      colors: ['rgba(108, 11, 232, 1)', 'rgba(25, 29, 47, 1)'],
      locations: [0.1231, 0.8285],
    },
  },
};
export const setLightModeColors = {
  background: '#ffffff',
  text: '#252525',
  primary: '#000000',
  secondary: '#e6e6e6',
  tertiary:'#515151',
  placeholder:'#F4F4F4',
  disable:'#E6E6E6',
  textDisable:'#A8A8A8',
  backgroundChat:'#F4F4F4'
};

export const setDarkModeColors = {
  background: '#252525',
  text: '#F4F4F4',
  primary: '#FFFFFF',
  secondary: '#EFEFEF',
  tertiary:'#8F8F8F',
  placeholder:'#2E2E2E',
  disable:'#A9A9A9',
  textDisable:'#8F8F8F',
  backgroundChat:'#2F2F2F'
};

export default colors;