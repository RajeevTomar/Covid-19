import React from 'react';
import { Text, View, Image } from 'react-native';
import style from '../styles/StateDistrictCellStyle';



export default StateDistrictCellView = ({ total, delta, textColor }) => {
    return (
        <View style={{ ...style.columnView, flex: 1 }}>
            <Text style={{ ...style.countText, color: textColor, }}>{total}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ ...style.arrowImage, tintColor: textColor }} source={require('../images/icon_plus.png')}
                    tintColor='{textColor}' />
                <Text style={{ ...style.deltaText, color: textColor }}>{delta}</Text>
            </View>
        </View>
    );
}