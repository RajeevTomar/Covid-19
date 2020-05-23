import React from 'react';
import {
    LineChart,
} from "react-native-chart-kit";
import useTheme from '../../themes/ThemeHooks';

export default SmallLineChart = ({ data, color }) => {
    const { colors } = useTheme();
    return <LineChart
        data={{
            labels: [],
            datasets: [{
                data: data
            }]
        }}
        width={100} // from react-native
        height={60}
        withVerticalLabels={false}
        withHorizontalLabels={false}
        withInnerLines={false}
        withScrollableDot={false}
        withOuterLines={false}
        
        chartConfig={{
            backgroundColor: colors.background,
            backgroundGradientFrom: colors.statBackground,
            backgroundGradientTo: colors.statBackground,
            color: (opacity = 1) => color,

            style: {
                borderRadius: 1
            },
            propsForDots: {
                r: "1",
                strokeWidth: "1",
                stroke: colors.transparent
            }
        }}
        bezier
        style={{
            marginVertical: 1,
            borderRadius: 1,
            paddingRight:0,
            
        }}
    />

}