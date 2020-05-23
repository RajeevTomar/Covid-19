import { useColorScheme } from 'react-native-appearance'
import ThemedColors  from './ThemedColor'

const UseTheme = () => {
    const theme = useColorScheme()
    //const colors =  theme ? ThemedColors[theme] : ThemedColors.default;
    const colors =  ThemedColors.default;
    return {
      colors,
      //theme,
    }
  }

  export default UseTheme;