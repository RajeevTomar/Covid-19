
import React from 'react';
import {
    Text, View,
} from 'react-native';
import TableView from './TableView';
import ColumnViewStyle from '../styles/ColumnViewStyle';
import useTheme from '../themes/ThemeHooks';


export default ColumnView = ({ totalStat, title, refinedData }) => {
    const {style} = ColumnViewStyle();
    const {colors} = useTheme();
    // check if refined data is undefined
    if( refinedData == null || refinedData == 'undefined')
     {
         refinedData = {
            dailyConfirmed:[],
            refinedData:[],
            refinedData:[]
         };
         
     }
    return (
        <View>
            <Text style={style.locationText}>{title}</Text>
            {totalStat.confirmed >= 0 && <View style={style.columnContainer}>
                <TableView title='Confirmed' chartData ={refinedData.dailyConfirmed} total={totalStat.confirmed} delta={totalStat.deltaconfirmed} textColor={colors.red} />
                <TableView title='Recovered' chartData ={refinedData.dailyRecovered} total={totalStat.recovered} delta={totalStat.deltarecovered} textColor={colors.green} />
                <TableView title='Deceased' chartData ={refinedData.dailyDeceased} total={totalStat.deaths} delta={totalStat.deltadeaths} textColor={colors.lightColor} />
            </View>}
        </View>
    );
};