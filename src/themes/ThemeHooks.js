import { useColorScheme } from 'react-native-appearance'
import ThemedColors  from './ThemedColor'

const UseTheme = () => {
    //const theme = useColorScheme()
    const colors =  ThemedColors.default;  //theme ? ThemedColors[theme] : ThemedColors.default;
    return {
      colors,
      //theme,
    }
  }

  export default UseTheme;