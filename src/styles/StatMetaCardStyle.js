import { StyleSheet } from 'react-native';
import { Metrics,Fonts } from '../themes';
import UseTheme from '../themes/ThemeHooks';



export default StatMetaCardStyle = () => {
    const { colors } = UseTheme();

    const style = StyleSheet.create(
        {   
            cardContainer: {
                backgroundColor: colors.statBackground,
                padding: Metrics.baseMargin,
                borderRadius: Metrics.radius,
                borderColor: Metrics.background,
                width: Metrics.screenWidth/2-15,
            },
            title: {
                fontSize: Fonts.size.small,
                justifyContent: 'center',
                fontWeight: 'bold',
                marginTop: Metrics.smallMargin,
                flex: 1,
                color: colors.textColor,
                alignItems: 'center'
            },
            statistic: {
                fontSize: Fonts.size.large,
                justifyContent: 'center',
                fontWeight: 'bold',
                marginTop: Metrics.smallMargin,
                flex: 1,
                color: colors.red,
                alignItems: 'center'
            },
            date: {
                fontSize: Fonts.size.small,
                justifyContent: 'center',
                fontWeight: 'normal',
                flex: 1,
                color: colors.textColor,
                alignItems: 'center'
            },
            description: {
                fontSize: Fonts.size.medium,
                justifyContent: 'center',
                fontWeight: 'normal',
                marginTop: Metrics.baseMargin,
                marginBottom: Metrics.smallMargin,
                flex: 1,
                color: colors.green,
                alignItems: 'center'
            },
            


        }
    );
    return { style };
};