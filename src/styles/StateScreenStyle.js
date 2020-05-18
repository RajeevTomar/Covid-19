import { Fonts, Metrics,ApplicationStyles} from '../themes';
import useTheme from '../themes/ThemeHooks';
import { StyleSheet } from 'react-native';
import HeaderViewStyle from './HeaderViewStyle';
import StateDistrictCellStyle from './StateDistrictCellStyle';

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    ...HeaderViewStyle,
    ...StateDistrictCellStyle,

});