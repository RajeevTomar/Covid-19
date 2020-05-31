import { Fonts, Metrics, ApplicationStyles } from '../themes';
import { StyleSheet } from 'react-native';
import UseTheme from '../themes/ThemeHooks';
import StatMetaCardStyle from '../styles/StatMetaCardStyle';


export default StateScreenStyle = () => {

    const {colors} = UseTheme();

    const style = StyleSheet.create({
        ...StatMetaCardStyle().style,
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
        },
        populationTestView:
            {
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: colors.statBackground,
                marginLeft: Metrics.baseMargin,
                marginRight: Metrics.baseMargin,
                borderRadius: Metrics.radius,
                padding:Metrics.baseMargin,
                marginBottom:Metrics.smallMargin,
                borderColor: Metrics.background,
            },
            populationSource: {
                fontSize: Fonts.size.verySmall,
                justifyContent: 'center',
                fontWeight: 'normal',
                flex: 1,
                color: colors.textColor,
                alignItems: 'center'
            },
            testedPerPopulation: {
                fontSize: Fonts.size.medium,
                justifyContent: 'center',
                fontWeight: 'bold',
                flex: 1,
                color: colors.gold,
                alignItems: 'center'
            },
    });
    return {style};

};