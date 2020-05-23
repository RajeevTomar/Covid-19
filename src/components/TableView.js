
import React from 'react';
import {
    Text, View, Image,
} from 'react-native';
import TableViewStyle from '../styles/TableViewStyle';
import SmallLineChart from '../components/charts/LineChart';


export default TableView = ({ chartData, title, total, delta, textColor }) => {
    const {style} = TableViewStyle();
    
    total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    delta = delta.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //const dataLength = chartData.length;
    return (
        <View style={style.columnView}>
            <Text style={style.statusText}>{title}</Text>
            <Text style={{ ...style.countText, color: textColor }}>{total}</Text>
            {delta && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ ...style.arrowImage, tintColor: textColor }} source={require('../images/icon_plus.png')}
                    tintColor='{textColor}' />
                <Text style={{ ...style.deltaText, color: textColor }}>{delta}</Text>
            </View>}
            {chartData && <SmallLineChart data={chartData.slice(-30)} color={textColor} />}
        </View>
    );
}