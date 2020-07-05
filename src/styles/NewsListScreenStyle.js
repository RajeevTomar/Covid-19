import { StyleSheet } from 'react-native'
import { Fonts, Metrics, ApplicationStyles } from '../themes'
import useTheme from '../themes/ThemeHooks';

export default NewsListStyle = () => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    ...ApplicationStyles().style.screen,
    newsItemContainer: {
      backgroundColor: colors.background,
      marginLeft: Metrics.smallMargin,
      marginRight: Metrics.smallMargin,
      marginBottom: Metrics.baseMargin,
      borderRadius: 4,
      height: 200,
      borderWidth: 1,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors.transparent
    },
    title: {
      fontSize: Fonts.size.large,
      color: colors.white,
      marginTop: Metrics.marginHorizontal,
      marginLeft: Metrics.smallMargin,
      marginRight: Metrics.smallMargin,
      fontWeight: 'bold',
    },
    titleView: {
      padding: Metrics.smallMargin,
      flex: 1,
      justifyContent: 'center',
      position: "absolute",
      alignItems: 'center'
    },
    bottomView: {
      padding: Metrics.smallMargin,
      flex: 1,
      backgroundColor: colors.windowLighTint,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    },
    source: {
      fontSize: Fonts.size.small,
      color: colors.snow,
      marginTop: Metrics.marginHorizontal,
      fontWeight: 'normal',
      justifyContent: 'flex-start',
      flex: 1,
      alignItems: 'flex-start',
      padding: Metrics.smallMargin,
    },
    date: {
      fontSize: Fonts.size.small,
      color: colors.snow,
      marginTop: Metrics.marginHorizontal,
      fontWeight: 'normal',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      padding: Metrics.smallMargin,
    },
    image: {
      height: '100%',
      position: "absolute",
      width: '100%',
      borderRadius: 6,
    },
    centered: {
      alignItems: 'center'
    }
  });
  return {styles};

}