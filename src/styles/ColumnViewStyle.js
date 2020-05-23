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
            justifyContent: 'flex-start'
        },
        columnContainer:{
            backgroundColor:colors.statBackground,
            flexDirection:'row',
            justifyContent:'space-around',
            
             
        }
    });
    return { style };
}