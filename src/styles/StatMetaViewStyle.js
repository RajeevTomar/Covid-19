import { StyleSheet } from 'react-native';
import { Metrics,Fonts } from '../themes';
import UseTheme from '../themes/ThemeHooks';
import StatMetaCardStyle from '../styles/StatMetaCardStyle';



export default StatMetaViewStyle = () => {
    const { colors } = UseTheme();



    const style = StyleSheet.create(
        {
            ...StatMetaCardStyle().style,
            statRowContainer: {
                marginLeft: Metrics.baseMargin,
                marginRight: Metrics.baseMargin,
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: Metrics.tinyMargin,
                marginBottom: Metrics.tinyMargin,
            },
        }
    );
    return { style };
};