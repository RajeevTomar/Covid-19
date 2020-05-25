import { useColorScheme } from 'react-native-appearance'
import ThemedColors from './ThemedColor'

const UseTheme = () => {
  let theme = useColorScheme();
  if (theme === 'no-preference')
    theme = 'light';
  const colors = theme ? ThemedColors[theme] : ThemedColors.default;
  return {
    colors,
    //theme,
  }
}

export default UseTheme;