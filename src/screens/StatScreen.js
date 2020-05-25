import React, { useState, useEffect } from 'react';
import {
    Text, View, Image, FlatList, TouchableHighlight, AppState, ScrollView,
    RefreshControl,
} from 'react-native';
import useTheme from '../themes/ThemeHooks';
import { Metrics, Fonts } from '../themes';
import ActivityIndicator from '../components/ScreenLoader';
import StatScreenStyle from '../styles/StatScreenStyle';
import { createIntervalData, createStatckedData } from '../utils/CommonFunction';
import StatChartsConfig from '../styles/ChartStyles';


import {
    BarChart,
    PieChart,
} from "react-native-chart-kit";

const StatScreen = (props) => {

    const { colors } = useTheme();
    const { refinedData } = props.route.params;
    const { totalCounts } = props.route.params;
    const { style } = StatScreenStyle();
    const { barChartConfig } = StatChartsConfig();

    // break dates in to intervals
    const splitDates = createIntervalData(refinedData.dates.slice(-30), 4);


    // Confirmed Data
    const confirmedCases = {
        labels: splitDates,
        datasets: [{
            data: refinedData.dailyConfirmed.slice(-30)
        }]
    };

    // Recovered Data
    const recoveredCases = {
        labels: splitDates,
        datasets: [{
            data: refinedData.dailyRecovered.slice(-30)
        }]
    };

    // Total counts
    const data = [
        {
            name: "Confirmed",
            cases: parseInt(totalCounts.confirmed),
            color: colors.red,
            legendFontColor: colors.redZoneText,
            legendFontSize: Fonts.size.verySmall
        },
        {
            name: "Recovered",
            cases: parseInt(totalCounts.recovered),
            color: colors.green,
            legendFontColor: colors.greenZoneText,
            legendFontSize: Fonts.size.verySmall
        },
        {
            name: "Deceased",
            cases: parseInt(totalCounts.deaths),
            color: colors.textColor,
            legendFontColor: colors.textColor,
            legendFontSize: Fonts.size.verySmall
        }

    ];

    return (
        <View style={style.mainContainer}>
            <ScrollView>


                <View style={style.statContainer}>
                    <Text style={{ ...style.statHeaderText, color: colors.redZoneText }}>Confirmed Cases</Text>
                    <BarChart
                        data={confirmedCases}
                        width={Metrics.screenWidth - 50}
                        height={160}
                        segments={2}
                        withInnerLines={false}
                        showBarTops={true}
                        withOuterLines={true}
                        chartConfig={{ ...barChartConfig, color: (opacity = 1) => colors.red }}
                        verticalLabelRotation={335}

                    />
                </View>
                <View style={style.statContainer}>
                    <Text style={{ ...style.statHeaderText, color: colors.greenZoneText }}>Recovered Cases</Text>
                    <BarChart
                        data={recoveredCases}
                        width={Metrics.screenWidth - 50}
                        height={160}
                        segments={2}
                        withInnerLines={false}
                        showBarTops={true}
                        withOuterLines={true}
                        chartConfig={{ ...barChartConfig, color: (opacity = 1) => colors.green }}
                        verticalLabelRotation={335}

                    />
                </View>
                <View style={style.statContainer}>
                    <Text style={{ ...style.statHeaderText, color: colors.textColor }}>All Cases</Text>
                    <PieChart
                        data={data}
                        width={Metrics.screenWidth - 50}
                        height={160}
                        chartConfig={barChartConfig}
                        accessor="cases"
                        backgroundColor="transparent"
                        paddingLeft="10"
                        absolute
                    />
                </View>
            </ScrollView>
        </View>
    );
}


export default StatScreen;