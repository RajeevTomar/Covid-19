import React, { useState, useEffect } from 'react';
import {
    Text, View, Image, FlatList, TouchableHighlight, AppState, ScrollView,
    RefreshControl,
} from 'react-native';
import useTheme from '../themes/ThemeHooks';
import { Metrics } from '../themes';
import ActivityIndicator from '../components/ScreenLoader';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const StatScreen = (props) => {

    const { colors } = useTheme();
    const { refinedData } = props.route.params;


    const data = {
        labels: refinedData.dates.slice(-30),
        datasets: [{
            data: refinedData.dailyConfirmed.slice(-30)
        }]
    };

    const chartConfig = {
        backgroundColor: colors.background,
        backgroundGradientFrom: colors.white,
        backgroundGradientTo: colors.white,
        color: (opacity = 1) => colors.red,
        barPercentage: .2,
        decimalPlaces: 0,
        style: {
            borderRadius: 1,
            marginVertical: 8,
            borderRadius: 16
        }
    };

    return (
        <View style={{ backgroundColor: colors.background, padding: 0, margin: Metrics.tinyMargin }}>
            <BarChart
                data={data}
                width={Metrics.screenWidth}
                height={320}
                withInnerLines={false}
                withOuterLines={true}
                chartConfig={chartConfig}
                verticalLabelRotation={90}

            />
        </View>
    );
}


export default StatScreen;