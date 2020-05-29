import { StyleSheet } from 'react-native';
import { Metrics,Fonts } from '../themes';
import UseTheme from '../themes/ThemeHooks';
import StatMetaCardStyle from '../styles/StatMetaCardStyle';



export default StatMetaViewStyle = () => {
    const { colors } = UseTheme();



    const style = StyleSheet.create(
        {
            ...StatMetaCardStyle().style,
            statRowContainer: {
                marginLeft: Metrics.baseMargin,
                marginRight: Metrics.baseMargin,
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: Metrics.tinyMargin,
                marginBottom: Metrics.tinyMargin,
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
        }
    );
    return { style };
};