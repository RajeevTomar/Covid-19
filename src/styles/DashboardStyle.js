import { Colors, Fonts, Metrics, ApplicationStyles } from '../themes';
import useTheme from '../themes/ThemeHooks';
import { StyleSheet } from 'react-native';
import StateDistrictCellStyle from './StateDistrictCellStyle';
import HeaderViewStyle from './HeaderViewStyle';

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    ...StateDistrictCellStyle,
    ...HeaderViewStyle,
    statContainer: {
        backgroundColor: useTheme().colors.statBackground,
        marginTop: Metrics.baseMargin,
        marginLeft: Metrics.doubleBaseMargin,
        marginRight: Metrics.doubleBaseMargin,
        borderRadius: 10,
        borderWidth: 4,
        paddingBottom: Metrics.baseMargin,
        borderColor: useTheme().colors.background
    },

    locationText: {
        fontSize: Fonts.size.medium,
        color: useTheme().colors.textColor,
        padding: Metrics.baseMargin,
        fontWeight: 'bold',
        justifyContent: 'flex-start'
    },

    statusText: {
        fontSize: Fonts.size.small,
        color: useTheme().colors.textColor,
        padding: Metrics.smallMargin,
        justifyContent: 'flex-start'
    },

    divider: {
        backgroundColor: useTheme().colors.background,
        margin: Metrics.smallMargin,
        height: Metrics.horizontalLineHeight,

    },
});