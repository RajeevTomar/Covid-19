import { useColorScheme } from 'react-native-appearance'
import { ThemedColors } from '.'

const UseTheme = () => {
    const theme = useColorScheme()
    const colors = theme ? ThemedColors[theme] : ThemedColors.default
    return {
      colors,
      theme,
    }
  }

  export default UseTheme;