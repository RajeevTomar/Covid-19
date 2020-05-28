import { StyleSheet } from 'react-native';
import { Metrics } from '../themes';
import UseTheme from '../themes/ThemeHooks';



export default StatMetaViewStyle = () => {
    const { colors } = UseTheme();

    const style = StyleSheet.create(
        {
            statRowContainer: {
                marginLeft: Metrics.baseMargin,
                marginRight: Metrics.baseMargin,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: Metrics.tinyMargin,
                marginBottom:Metrics.smallMargin,
            }
        }
    );
    return { style };
};