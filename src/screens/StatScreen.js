import React, { useState, useEffect } from 'react';
import {
    Text, View, Image, FlatList, TouchableHighlight, AppState, ScrollView,
    RefreshControl,
} from 'react-native';
import useTheme from '../themes/ThemeHooks';
import { Metrics, Fonts } from '../themes';
import StatScreenStyle from '../styles/StatScreenStyle';
import { createIntervalData, refineDataForChart } from '../utils/CommonFunction';
import StatChartsConfig from '../styles/ChartStyles';
import { useSelector } from 'react-redux'
import { STATE_CODES, STATE_POPULATIONS } from '../Constant';


import {
    BarChart,
    PieChart,
} from "react-native-chart-kit";

const StatScreen = (props) => {

    const COUNT_TIME_SERIES = -30;

    const { colors } = useTheme();
    const { style } = StatScreenStyle();
    const { barChartConfig } = StatChartsConfig();

    // read data from navigation prarams
    const { timeSeries,totalCounts,location,stateTestData } = props.route.params;
    const refinedData = refineDataForChart(timeSeries);

    // break dates in to intervals
    const splitDates = createIntervalData(refinedData.dates.slice(COUNT_TIME_SERIES), 8);

    // set Header Title
    props.navigation.setOptions({ title: location })


     // population
     const population = STATE_POPULATIONS[location];
     // StatMetaObj for StatMetaCardView
     const statMetaObj = {
        testData: stateTestData,
        population: population,
        locationStat: totalCounts,
        lastSevenDaysData: timeSeries.slice(-7),
      };


    // Confirmed Data
    const confirmedCases = {
        labels: splitDates,
        datasets: [{
            data: refinedData.dailyConfirmed.slice(COUNT_TIME_SERIES)
        }]
    };

    // Recovered Data
    const recoveredCases = {
        labels: splitDates,
        datasets: [{
            data: refinedData.dailyRecovered.slice(COUNT_TIME_SERIES)
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
                        verticalLabelRotation={340}
                        showValuesOnTopOfBars={true}

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
                        verticalLabelRotation={340}

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
                        showValuesOnTopOfBars={true}
                    />
                </View>
            </ScrollView>
        </View>
    );
}


export default StatScreen;