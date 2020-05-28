import { StyleSheet } from 'react-native';
import { Metrics } from '../themes';
import UseTheme from '../themes/ThemeHooks';



export default StatMetaCardStyle = () => {
    const { colors } = UseTheme();

    const style = StyleSheet.create(
        {
            cardContainer: {
                backgroundColor:colors.statBackground,
                padding: Metrics.baseMargin,
                borderRadius: Metrics.radius,
                borderColor: Metrics.background,
                width:Metrics.metaCardWith,
                
                
                
            }
        }
    );
    return { style };
};