import { Colors, Fonts, Metrics, ApplicationStyles } from '../themes';
import useTheme from '../themes/ThemeHooks';
import { StyleSheet } from 'react-native';
import StateDistrictCellStyle from './StateDistrictCellStyle';
import HeaderViewStyle from './HeaderViewStyle';

export default DashboardStyle = () =>{
    const {colors} = useTheme();

    const style = StyleSheet.create({
        ...ApplicationStyles().style.screen,
        ...StateDistrictCellStyle().style,
        ...HeaderViewStyle().style,
        statContainer: {
            backgroundColor: colors.statBackground,
            borderRadius: 10,
            borderWidth: 4,
            marginLeft:Metrics.baseMargin,
            marginRight:Metrics.baseMargin,
            borderColor: colors.background
        },
    
        locationText: {
            fontSize: Fonts.size.medium,
            color: colors.textColor,
            padding: Metrics.baseMargin,
            fontWeight: 'bold',
            justifyContent: 'flex-start'
        },
    
        zoneLocationText: {
            fontSize: Fonts.size.small,
            color: colors.white,
            padding: Metrics.baseMargin,
            fontWeight: 'bold',
            justifyContent: 'flex-start'
        },
    
        statusText: {
            fontSize: Fonts.size.small,
            color: colors.textColor,
            padding: Metrics.smallMargin,
            justifyContent: 'flex-start'
        },
    
        divider: {
            backgroundColor: colors.background,
            margin: Metrics.smallMargin,
            height: Metrics.tinyMargin,
    
        },
        containmentZoneView: {
            width: '100%',
            backgroundColor: colors.red,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0, 
        },
        moreImage: {
            width: Metrics.images.medium,
            height: Metrics.images.medium,
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight:Metrics.smallMargin
        }
    });
    return {style};
}