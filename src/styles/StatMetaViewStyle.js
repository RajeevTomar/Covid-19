import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics } from '../themes';
import UseTheme from '../themes/ThemeHooks';



export default StatMetaViewStyle = () => {
    const { colors } = UseTheme();

    const style = StyleSheet.create(
        {
            statRowContainer: {
                marginLeft: Metrics.smallMargin,
                marginRight: Metrics.smallMargin,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: Metrics.tinyMargin,
                borderRadius: Metrics.radius,
                borderColor: Metrics.background
            }
        }
    );
    return { style };
};