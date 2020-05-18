import { Colors, Fonts, Metrics, ApplicationStyles} from '../themes';
import useTheme from '../themes/ThemeHooks';
import { StyleSheet } from 'react-native';
import StateDistrictCellStyle from './StateDistrictCellStyle';


export default StyleSheet.create({
    ...ApplicationStyles.screen,
    ...StateDistrictCellStyle,
    rowContainer:{
        backgroundColor:useTheme().colors.statBackground,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'    
    }, headerText:{
        fontSize: Fonts.size.small,
        padding:Metrics.smallMargin,
        justifyContent:'center',
        fontWeight:'bold',
        flex: 1,
        alignItems:'center'
    },

    
});