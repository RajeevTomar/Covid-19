import React from 'react';
import { Text, View, Image } from 'react-native';
import style from '../styles/HeaderViewStyle';
import useTheme from '../themes/ThemeHooks';
import { Metrics } from '../themes';

export default HeaderView = ({header}) => {
    return (
        <View style={{
            ...style.rowContainer, justifyContent: 'space-between',
            padding: Metrics.baseMargin, marginTop: Metrics.baseMargin
        }}>
            <Text style={{ ...style.headerText, flex: 2, color: useTheme().colors.black, }}>{header[0]}</Text>
            <Text style={{ ...style.headerText, color: useTheme().colors.red, fontWeight: 'normal' }}>{header[1]}</Text>
            <Text style={{ ...style.headerText, color: useTheme().colors.green, fontWeight: 'normal' }}>{header[2]}</Text>
            <Text style={{ ...style.headerText, color: useTheme().colors.black, fontWeight: 'normal' }}>{header[3]}</Text>
        </View>
    );
}