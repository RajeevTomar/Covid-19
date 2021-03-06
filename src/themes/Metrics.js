import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')
const screenWidth = width < height ? width : height
const screenHeight = width < height ? height : width

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  tinyMargin:1,
  doubleSection: 50,
  horizontalLineHeight: 4,
  searchBarHeight: 30,
  metaCardWith:170,
  screenWidth,
  screenHeight,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  buttonRadius: 4,
  cardRadius: 5,
  locationBackgroundHeight: screenHeight * 0.485757121,
  breakHeight: 125,
  radius:6,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    tiny:10,
    small: 20,
    medium: 30,
    large: 60,
    logo: 200,
    avatar: 54
  }
}

export default metrics