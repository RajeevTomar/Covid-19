import { Fonts, Metrics, ApplicationStyles} from '../themes';
import useTheme from '../themes/ThemeHooks';
import { StyleSheet } from 'react-native';
import StateDistrictCellStyle from './StateDistrictCellStyle';


export default HeaderViewStyle = () => {
    const {colors} = useTheme();
    const style = StyleSheet.create({
        ...StateDistrictCellStyle().style,
        rowContainer:{
            backgroundColor:colors.statBackground,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            justifyContent:'center',
             
        }, headerText:{
            fontSize: Fonts.size.small,
            padding:Metrics.smallMargin,
            justifyContent:'center',
            fontWeight:'bold',
            flex: 1,
            alignItems:'center'
        },
    });
    return {style};
}