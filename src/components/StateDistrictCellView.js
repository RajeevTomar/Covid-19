import React from 'react';
import { Text, View, Image } from 'react-native';
import StateDistrictCellStyle from '../styles/StateDistrictCellStyle';



export default StateDistrictCellView = ({ total, delta, textColor }) => {
    const {style} = StateDistrictCellStyle();
    return (
        <View style={{ ...style.columnView, flex: 1 }}>
            <Text style={{ ...style.countText,  }}>{total}</Text>
            {delta > 0 && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ ...style.arrowImage, tintColor: textColor }} source={require('../images/icon_plus.png')}
                    tintColor='{textColor}' />
                <Text style={{ ...style.deltaText, color: textColor }}>{delta}</Text>
            </View>}
        </View>
    );
}