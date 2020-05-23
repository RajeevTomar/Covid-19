import { Fonts, Metrics } from '../themes';
import useTheme from '../themes/ThemeHooks';
import { StyleSheet } from 'react-native';
import StateDistrictCellStyle from './StateDistrictCellStyle';

export default TableViewStyle = () => {

    const { colors } = useTheme();

    const style = StyleSheet.create({
        ...StateDistrictCellStyle().style,
        statusText: {
            fontSize: Fonts.size.small,
            color: colors.textColor,
            padding: Metrics.smallMargin,
            justifyContent: 'flex-start'
        },
        
    });
    return { style };
}