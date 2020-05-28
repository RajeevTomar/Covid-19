
import React from 'react';
import {
    Text, View, Image,
} from 'react-native';
import TableViewStyle from '../styles/TableViewStyle';
import SmallLineChart from '../components/charts/LineChart';


export default TableView = ({ chartData, title, total, delta, textColor }) => {
    const { style } = TableViewStyle();

    // total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // delta = delta.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // delta = '+ ' + delta;
    let totalInt = parseInt(total);
    let deltaInt = parseInt(delta);
    totalInt = totalInt.toLocaleString('en-IN');
    deltaInt = deltaInt.toLocaleString('en-IN');
    deltaInt = '+ ' + deltaInt;

    return (
        <View style={style.columnView}>
            <Text style={style.statusText}>{title}</Text>
            <Text style={{ ...style.countText, color: textColor }}>{totalInt}</Text>
            {deltaInt && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ ...style.deltaText, color: textColor }}>{deltaInt}</Text>
            </View>}
            {chartData && chartData.length > 0 && <SmallLineChart data={chartData.slice(-30)} color={textColor} />}
        </View>
    );
}