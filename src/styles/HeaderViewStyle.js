import { Fonts, Metrics, ApplicationStyles} from '../themes';
import useTheme from '../themes/ThemeHooks';
import { StyleSheet } from 'react-native';



export default HeaderViewStyle = () => {
    const {colors} = useTheme();
    const style = StyleSheet.create({
        rowContainer:{
            backgroundColor:colors.statBackground,
            flexDirection:'row',
            justifyContent:'space-around',
            
             
        }, headerText:{
            fontSize: Fonts.size.small,
            justifyContent:'center',
            fontWeight:'bold',
            paddingTop:Metrics.smallMargin,
            paddingBottom:Metrics.smallMargin,
            flex: 1,
            color:colors.textColor,
            alignItems:'center'
        },
        divider: {
            backgroundColor: colors.background,
            margin: Metrics.smallMargin,
            height: Metrics.tinyMargin,
    
        }
    });
    return {style};
}