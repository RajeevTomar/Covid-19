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
            marginLeft: Metrics.baseMargin,
            marginRight: Metrics.baseMargin,
            borderRadius: 10,
            borderWidth: 4,
            borderColor: colors.background
        }
    });
    return {style};

};