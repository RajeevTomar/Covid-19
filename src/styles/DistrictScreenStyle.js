import { Fonts, Metrics, ApplicationStyles } from '../themes';
import { StyleSheet } from 'react-native';
import HeaderViewStyle from './HeaderViewStyle';
import UseTheme from '../themes/ThemeHooks';


export default DistrictScreenStyle = () => {

    const {colors} = UseTheme();

    const style = StyleSheet.create({
        ...ApplicationStyles().style.screen,
        ...HeaderViewStyle().style,
        districtContainer: {
            backgroundColor: colors.statBackground,
            marginLeft: Metrics.doubleBaseMargin,
            marginRight: Metrics.doubleBaseMargin,
            borderRadius: 10,
            borderWidth: 4,
            paddingBottom: Metrics.baseMargin,
            borderColor: colors.background
        }
    });
    return {style};

};