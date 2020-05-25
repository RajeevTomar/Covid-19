import { Fonts, Metrics, ApplicationStyles } from '../themes';
import { StyleSheet } from 'react-native';
import LocatedZoneStyle from './LocatedZoneStyle';
import UseTheme from '../themes/ThemeHooks';


export default StateScreenStyle = () => {

    const {colors} = UseTheme();

    const style = StyleSheet.create({
        ...ApplicationStyles().style.screen,
        statContainer:{
            backgroundColor: colors.statBackground,
                marginLeft: Metrics.baseMargin,
                marginRight: Metrics.baseMargin,
                borderRadius: 10,
                borderWidth: 4,
                paddingBottom: Metrics.baseMargin,
                borderColor: colors.background
        },
        statHeaderText: {
            fontSize: Fonts.size.medium,
            color: colors.textColor,
            padding: Metrics.baseMargin,
            fontWeight: 'bold',
            justifyContent: 'flex-start'
        }
    });
    return {style};

};