import { Fonts, Metrics } from '../themes';
import useTheme from '../themes/ThemeHooks';
import { StyleSheet } from 'react-native';
import HeaderViewStyle from './HeaderViewStyle';

export default LocatedZoneStyle = () => {

    const { colors } = useTheme();

    const style = StyleSheet.create({
        ...HeaderViewStyle().style,
        zoneLocationText: {
            fontSize: Fonts.size.small,
            color: colors.textColor,
            padding: Metrics.baseMargin,
            fontWeight: 'bold',
            justifyContent: 'flex-start'
        }
        
    });
    return { style };
}