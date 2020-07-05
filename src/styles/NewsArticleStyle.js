import { StyleSheet } from 'react-native'
import { Fonts, Metrics, ApplicationStyles } from '../themes'
import useTheme from '../themes/ThemeHooks';

export default NewsArticleStyle = () => {
  const {colors} = useTheme();
  const styles= StyleSheet.create({

    ...ApplicationStyles().style.screen,
    title: {
      fontSize: Fonts.size.doubleExtraLarge,
      color: colors.textColor,
      marginTop: Metrics.marginHorizontal,
      marginLeft: Metrics.smallMargin,
      marginRight: Metrics.smallMargin,
      padding: Metrics.baseMargin,
      fontWeight: 'bold',
      alignItems: 'center'
    },
    articleContentView: {
      padding: Metrics.smallMargin,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: colors.windowTint,
      paddingBottom: Metrics.doubleSection,
    },
    sourceDateView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      margin: Metrics.baseMargin,
    },
    source: {
      fontSize: Fonts.size.large,
      color: colors.textColor,
      marginTop: Metrics.marginHorizontal,
      fontWeight: 'normal',
      justifyContent: 'flex-start',
      flex: 1,
      alignItems: 'flex-start',
      padding: Metrics.smallMargin,
    },
    date: {
      fontSize: Fonts.size.large,
      color: colors.textColor,
      marginTop: Metrics.marginHorizontal,
      fontWeight: 'normal',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      padding: Metrics.smallMargin,
    },
    description: {
      fontSize: Fonts.size.medium,
      color: colors.sourceColor,
      padding: Metrics.baseMargin,
      fontWeight: 'bold',
      alignItems: 'center',

    },
    image: {
      height: '100%',
      position: "absolute",
      width: '100%',
    },
    circleView: {
      width: Metrics.images.medium,
      height: Metrics.images.medium,
      borderRadius: Metrics.images.small,
      backgroundColor: colors.windowTint,
      position: 'absolute',
      marginTop: Metrics.navBarHeight,
      marginLeft: Metrics.doubleBaseMargin,
    },
    circleImage: {
      width: Metrics.images.medium,
      height: Metrics.images.medium,
    }

  });
  return {styles};
}