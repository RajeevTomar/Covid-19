import { Fonts, Metrics, ApplicationStyles } from '../themes';
import { StyleSheet } from 'react-native';
import HeaderViewStyle from './HeaderViewStyle';


export default StateScreenStyle = () => {

    const style = StyleSheet.create({
        ...ApplicationStyles().style.screen,
        ...HeaderViewStyle().style,
    });
    return {style};

};