import React from 'react';
import { Text, View, Image } from 'react-native';
import StateDistrictCellStyle from '../styles/StateDistrictCellStyle';



export default StateDistrictCellView = ({ total, delta, textColor }) => {
    const { style } = StateDistrictCellStyle();
    total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    delta = delta.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return (
        <View style={{ ...style.columnView, flex: 1 }}>
            <Text style={{ ...style.countText, }}>{total}</Text>
            { delta !== '0' &&
                <Text style={{ ...style.deltaText, color: textColor }}>{'+ ' + delta}</Text>
            }
        </View>
    );
}