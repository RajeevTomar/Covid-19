import React from 'react';
import { Text, View, Image } from 'react-native';
import HeaderViewStyle from '../styles/HeaderViewStyle';
import useTheme from '../themes/ThemeHooks';
import { Metrics } from '../themes';

export default HeaderView = ({header}) => {
    const {style} = HeaderViewStyle();
    const {colors} = useTheme();
    return (
        <View style={{
            ...style.rowContainer, justifyContent: 'space-between',
            padding: Metrics.baseMargin
        }}>
            <Text style={{ ...style.headerText, flex: 1.5, color: colors.textColor, }}>{header[0]}</Text>
            <Text style={{ ...style.headerText, color: colors.red, fontWeight: 'normal' }}>{header[1]}</Text>
            <Text style={{ ...style.headerText, color: colors.green, fontWeight: 'normal' }}>{header[2]}</Text>
            <Text style={{ ...style.headerText, color: colors.textColor, fontWeight: 'normal' }}>{header[3]}</Text>
        </View>
    );
}