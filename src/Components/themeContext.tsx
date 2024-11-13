import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import {useColorScheme} from 'react-native';
import {setDarkModeColors, setLightModeColors} from './../Utils/colors'; // Ajusta la ruta según tu estructura

interface Colors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  tertiary: string;
  placeholder: string;
  disable: string;
  textDisable:string;
  backgroundChat: string;
}

interface ThemeContextType {
  theme: Colors;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  toggleTheme: (mode: 'light' | 'dark' | 'auto') => void; // Cambia para aceptar un modo
}
export const ThemeContext = createContext<ThemeContextType >(
{
  theme: {
    background:  '#ffffff',
    text:  '#252525',
    primary:  '#000000',
    secondary:  '#e6e6e6',
    tertiary: '#515151',
    placeholder: '#F4F4F4',
    disable: '#E6E6E6',
    backgroundChat: '#F4F4F4',
  },
  isDarkMode: false,
  setIsDarkMode: () => {},
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const systemTheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'auto'>('auto');
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'dark');

  useEffect(() => {
    if (themeMode === 'auto') {
      setIsDarkMode(systemTheme === 'dark');
    }
  }, [systemTheme, themeMode]);

  const theme: Colors = isDarkMode ? setDarkModeColors : setLightModeColors;

  const toggleTheme = (mode: 'light' | 'dark' | 'auto') => {
    setThemeMode(mode);
    if (mode === 'light') {
      setIsDarkMode(false);
    } else if (mode === 'dark') {
      setIsDarkMode(true);
    } else if (mode === 'auto') {
      setIsDarkMode(systemTheme === 'dark');
    }
  };
  return (
    <ThemeContext.Provider
      value={{theme, isDarkMode, setIsDarkMode, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
