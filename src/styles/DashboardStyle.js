import { Colors, Fonts, Metrics, ApplicationStyles} from '../themes';
import useTheme from '../themes/ThemeHooks';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    statContainer:{
       backgroundColor:useTheme().colors.statBackground,
       marginTop:Metrics.baseMargin,
       marginLeft:Metrics.doubleBaseMargin,
       marginRight:Metrics.doubleBaseMargin,
       borderRadius: 10,
       borderWidth: 4,
       paddingBottom:Metrics.baseMargin,
       borderColor: useTheme().colors.background
    },
    rowContainer:{
        backgroundColor:useTheme().colors.statBackground,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'    
    },
    locationText:{
        fontSize: Fonts.size.medium,
        color: useTheme().colors.black,
        padding:Metrics.baseMargin,
        fontWeight: 'bold',
        justifyContent:'flex-start'
    },
    columnView:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    statusText:{
        fontSize: Fonts.size.small,
        color: useTheme().colors.black,
        padding:Metrics.smallMargin,
        justifyContent:'flex-start'
    },
    headerText:{
        fontSize: Fonts.size.small,
        padding:Metrics.smallMargin,
        justifyContent:'center',
        fontWeight:'bold',
        alignItems:'center'
    },
    countText:{
        fontSize: Fonts.size.medium,
        color: useTheme().colors.red,
        padding:Metrics.smallMargin,
        justifyContent:'center',
        fontWeight:'bold',
        alignItems:'center'
    },
    deltaText:{
        fontSize: Fonts.size.small,
        color: useTheme().colors.red,
        padding:Metrics.smallMargin,
        justifyContent:'center',
        alignItems:'center'
    },
    divider:{
        backgroundColor: useTheme().colors.background,
        margin:Metrics.smallMargin,
        height:Metrics.horizontalLineHeight,

    },
    arrowImage:{
        width:Metrics.images.tiny,
        height:Metrics.images.tiny,
        alignItems:'center',
        justifyContent:'center',        
      }


});