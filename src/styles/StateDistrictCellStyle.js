import { Colors, Fonts, Metrics, ApplicationStyles} from '../themes';
import useTheme from '../themes/ThemeHooks';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    columnView:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    countText:{
        fontSize: Fonts.size.medium,
        color: useTheme().colors.coal,
        padding:Metrics.smallMargin,
        justifyContent:'center',
        fontWeight:'bold',
        alignItems:'center'
    },
    deltaText:{
        fontSize: Fonts.size.small,
        color: useTheme().colors.red,
        padding:Metrics.tinyMargin,
        justifyContent:'center',
        alignItems:'center'
    },
    arrowImage:{
        width:Metrics.images.tiny,
        height:Metrics.images.tiny,
        alignItems:'center',
        justifyContent:'center',        
      }


});