import { Colors, Fonts, Metrics, ApplicationStyles } from '../themes';
import useTheme from '../themes/ThemeHooks';
import { StyleSheet } from 'react-native';

export default StateDistrictCellStyle = () => {

    const {colors} = useTheme();

    const style = StyleSheet.create({
        columnView: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
           padding:Metrics.baseMargin,

        },
        countText: {
            fontSize: Fonts.size.medium,
            color: colors.textColor,
            padding: Metrics.smallMargin,
            justifyContent: 'center',
            alignItems: 'center'
        },
        deltaText: {
            fontSize: Fonts.size.small,
            color: colors.red,
            fontWeight: 'bold',
            padding: Metrics.tinyMargin,
            justifyContent: 'center',
            alignItems: 'center'
        },
        arrowImage: {
            width: Metrics.images.tiny,
            height: Metrics.images.tiny,
            alignItems: 'center',
            justifyContent: 'center',
        }


    });
    return { style };
}