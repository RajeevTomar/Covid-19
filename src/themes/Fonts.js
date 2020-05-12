
const type = {
    regular: 'Robotoslab-Bold',
    bold: 'Robotoslab-Regular',
}

const size = {
    verySmall:8,
    small: 12,
    medium: 16,
    large: 20,
    extraLarge:24,
    doubleExtraLarge:30

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