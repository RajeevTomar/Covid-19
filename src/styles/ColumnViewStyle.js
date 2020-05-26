import { Fonts, Metrics } from '../themes';
import useTheme from '../themes/ThemeHooks';
import { StyleSheet } from 'react-native';

export default ColumnViewStyle = () => {

    const { colors } = useTheme();

    const style = StyleSheet.create({
         locationText: {
            fontSize: Fonts.size.medium,
            color: colors.textColor,
            padding: Metrics.baseMargin,
            fontWeight: 'bold',
        },
        columnContainer:{
            backgroundColor:colors.statBackground,
            flexDirection:'row',
            justifyContent:'space-around',
        },
        moreImage: {
            width: Metrics.images.medium,
            height: Metrics.images.medium,
            justifyContent: 'center',
            alignItems:'center',
            resizeMode:'contain',
            marginTop:Metrics.smallMargin,
            marginRight:Metrics.doubleBaseMargin    
            
        }
    });
    return { style };
}