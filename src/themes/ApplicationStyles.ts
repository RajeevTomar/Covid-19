import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'
import useTheme from './ThemeHooks';


// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android
export interface ApplicationStylesType {
  screen
  darkLabelContainer
  darkLabel
  groupContainer
  sectionTitle
  linearGradient
}

export interface ScreenStylesType {
  mainContainer
  backgroundImage
  container
  section
  sectionHeader
  sectionText
}

const ApplicationStyles = ()=>{
    const { colors } = useTheme();
    const style = {
      screen: {
        mainContainer: {
          flex: 1,
          backgroundColor: colors.background,
          
        },
        backgroundImage: {
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        },
        container: {
          flex: 1,
          paddingTop: Metrics.baseMargin,
          backgroundColor: Colors.transparent,
        },
        section: {
          margin: Metrics.section,
          padding: Metrics.baseMargin
        },
        sectionHeader: {
          padding: Metrics.baseMargin,
          backgroundColor: Colors.frost
        },
        sectionText: {
          ...Fonts.style.medium,
          paddingVertical: Metrics.doubleBaseMargin,
          color: Colors.snow,
          marginVertical: Metrics.smallMargin,
          textAlign: 'center'
        },
        subtitle: {
          color: Colors.snow,
          padding: Metrics.smallMargin,
          marginBottom: Metrics.smallMargin,
          marginHorizontal: Metrics.smallMargin
        },
        titleText: {
          ...Fonts.style.medium,
          fontSize: 14,
          color: Colors.text
        }
      },
      darkLabelContainer: {
        padding: Metrics.smallMargin,
        paddingBottom: Metrics.doubleBaseMargin,
        borderBottomColor: Colors.border,
        borderBottomWidth: 1,
        marginBottom: Metrics.baseMargin
      },
      darkLabel: {
        fontFamily: Fonts.type.regular,
        color: Colors.snow
      },
      groupContainer: {
        margin: Metrics.smallMargin,
        flexDirection: 'row',
        justifyContent: 'spacearound',
        alignItems: 'center'
      },
      sectionTitle: {
        ...Fonts.style.medium,
        color: Colors.coal,
        backgroundColor: Colors.ricePaper,
        padding: Metrics.smallMargin,
        marginTop: Metrics.smallMargin,
        marginHorizontal: Metrics.baseMargin,
        borderWidth: 1,
        borderColor: Colors.ember,
        alignItems: 'center',
        textAlign: 'center'
      },
      linearGradient: {
        flex: 1
      }
    };
    return {style};
  }

// const ApplicationStyle: ApplicationStylesType = {
//   screen: {
//     mainContainer: {
//       flex: 1,
//       backgroundColor: useTheme().colors.background,
      
//     },
//     backgroundImage: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       bottom: 0,
//       right: 0
//     },
//     container: {
//       flex: 1,
//       paddingTop: Metrics.baseMargin,
//       backgroundColor: Colors.transparent,
//     },
//     section: {
//       margin: Metrics.section,
//       padding: Metrics.baseMargin
//     },
//     sectionHeader: {
//       padding: Metrics.baseMargin,
//       backgroundColor: Colors.frost
//     },
//     sectionText: {
//       ...Fonts.style.medium,
//       paddingVertical: Metrics.doubleBaseMargin,
//       color: Colors.snow,
//       marginVertical: Metrics.smallMargin,
//       textAlign: 'center'
//     },
//     subtitle: {
//       color: Colors.snow,
//       padding: Metrics.smallMargin,
//       marginBottom: Metrics.smallMargin,
//       marginHorizontal: Metrics.smallMargin
//     },
//     titleText: {
//       ...Fonts.style.medium,
//       fontSize: 14,
//       color: Colors.text
//     }
//   },
//   darkLabelContainer: {
//     padding: Metrics.smallMargin,
//     paddingBottom: Metrics.doubleBaseMargin,
//     borderBottomColor: Colors.border,
//     borderBottomWidth: 1,
//     marginBottom: Metrics.baseMargin
//   },
//   darkLabel: {
//     fontFamily: Fonts.type.regular,
//     color: Colors.snow
//   },
//   groupContainer: {
//     margin: Metrics.smallMargin,
//     flexDirection: 'row',
//     justifyContent: 'spacearound',
//     alignItems: 'center'
//   },
//   sectionTitle: {
//     ...Fonts.style.medium,
//     color: Colors.coal,
//     backgroundColor: Colors.ricePaper,
//     padding: Metrics.smallMargin,
//     marginTop: Metrics.smallMargin,
//     marginHorizontal: Metrics.baseMargin,
//     borderWidth: 1,
//     borderColor: Colors.ember,
//     alignItems: 'center',
//     textAlign: 'center'
//   },
//   linearGradient: {
//     flex: 1
//   }
// }

export default ApplicationStyles;