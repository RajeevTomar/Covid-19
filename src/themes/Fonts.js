import {Platform} from 'react-native';


const type = {
    regular: 'Robotoslab-Bold',
    bold: 'Robotoslab-Regular',
}

const size = {
    verySmall:Platform.OS=='ios'?10:12,
    small: Platform.OS=='ios'?14:16,
    medium: Platform.OS=='ios'?16:18,
    large: Platform.OS=='ios'?20:22,
    extraLarge:Platform.OS=='ios'?24:26,
    doubleExtraLarge:Platform.OS=='ios'?30:32

}

const style = {
    small: {
        fontFamily: type.regular,
        fontSize: size.small
    },
    smallBold: {
        fontFamily: type.bold,
        fontSize: size.small
    },
    medium: {
        fontFamily: type.regular,
        fontSize: size.medium
    },
    mediumBold: {
        fontFamily: type.bold,
        fontSize: size.medium
    },
    large: {
        fontFamily: type.regular,
        fontSize: size.large
    },
    largeBold: {
        fontFamily: type.bold,
        fontSize: size.large
    }
}

export default {
    type,
    size,
    style
}