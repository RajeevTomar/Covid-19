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
        labels: [],
        datasets: [{
            data: refinedData.dailyConfirmed
        }]
    };

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <BarChart
                data={data}
                width={Metrics.screenWidth}
                height={220}
                chartConfig={chartConfig}
                verticalLabelRotation={30}
            />
        </View>
    );
}


export default StatScreen;