import React, { useState, useEffect } from 'react';
import {
    Text, View, ScrollView
} from 'react-native';
import useTheme from '../themes/ThemeHooks';
import { Metrics, Fonts } from '../themes';
import { parse,format } from 'date-fns';
import StatScreenStyle from '../styles/StatScreenStyle';
import {
    preprocessTimeseries, createIntervalData,
    refineDataForChart, parseStateTimeseries, parseStateTestData,
    
} from '../utils/CommonFunction';
import StatChartsConfig from '../styles/ChartStyles';
import { useSelector } from 'react-redux'
import { INDIA_LOCATION_CODE, STATE_POPULATIONS } from '../Constant';
import StatMetaView from '../components/StatMetaView';



import {
    BarChart,
    PieChart,
} from "react-native-chart-kit";

const StatScreen = (props) => {

    const COUNT_TIME_SERIES = -30;

    const { colors } = useTheme();
    const { style } = StatScreenStyle();
    const { barChartConfig } = StatChartsConfig();

    // variables
    let timeSeries = null;
    let timeSeriesForChart = null;
    let locationData = null;
    let stateTestData = null;

    // read data from navigation prarams
    const { locationCode } = props.route.params;


    // read data from redux store
    const { allData } = useSelector(state => state.allStats);
    if (locationCode === INDIA_LOCATION_CODE) {

        // CountryTimeSeries Data
        timeSeries = allData != null ? preprocessTimeseries(allData.cases_time_series) : null;
        locationData = allData.statewise[0];
        // set name as India
        locationData.name = 'India';
        // parse test data
        let allTestsArr = allData.tested;
        if (allTestsArr != null && allTestsArr.length > 0) {
            const recentTestedObj = allTestsArr[allTestsArr.length - 1];
            // put data in stateTestData
            //let updatedOn = format(recentTestedObj?.updatetimestamp,'dd MMM');
            let updatedOn = format(
                parse(recentTestedObj?.updatetimestamp, 'dd/MM/yyyy HH:mm:ss', new Date()),
                'dd/MM/yyyy'
            );
            stateTestData = {
                totaltested: Number.parseInt(recentTestedObj?.totalsamplestested),
                updatedon: updatedOn,
            };
        }
    }
    else {
        // read state from redux - store
        const { stateTimeSeries, allStateTestSeries } =
            useSelector(state => state.stateTimeSeries);
        const statesData = allData.statewise;
        //total count 
        locationData = statesData.filter((state) => {
            return state.statecode === locationCode;
        })[0];
        // set name
        locationData.name = locationData.state;
        //time series
        timeSeries = parseStateTimeseries(stateTimeSeries)[locationCode.toUpperCase()];
        // parse test series data
        const parseStateTestDataObj = parseStateTestData(allStateTestSeries);
        if (parseStateTestDataObj != null) {
            stateTestData = parseStateTestDataObj[locationData.state];
        }
    }
    // location name
    const location = locationData.state;

    // Time series for Chart
    timeSeriesForChart = refineDataForChart(timeSeries);

    // break dates in to intervals
    const splitDates = createIntervalData(timeSeriesForChart.dates.slice(COUNT_TIME_SERIES), 8);

    // set Header Title
    props.navigation.setOptions({ title: locationData.name })

    // population
    const population = STATE_POPULATIONS[location];

    // StatMetaObj for StatMetaCardView
    const statMetaObj = {
        testData: stateTestData,
        population: population,
        locationStat: locationData,
        lastSevenDaysData: timeSeries.slice(-7),
    };


    // Confirmed Data
    const confirmedCases = {
        labels: splitDates,
        datasets: [{
            data: timeSeriesForChart.dailyConfirmed.slice(COUNT_TIME_SERIES)
        }]
    };

    // Recovered Data
    const recoveredCases = {
        labels: splitDates,
        datasets: [{
            data: timeSeriesForChart.dailyRecovered.slice(COUNT_TIME_SERIES)
        }]
    };

    // Total counts
    const data = [
        {
            name: "Confirmed",
            cases: parseInt(locationData.confirmed),
            color: colors.red,
            legendFontColor: colors.redZoneText,
            legendFontSize: Fonts.size.verySmall
        },
        {
            name: "Recovered",
            cases: parseInt(locationData.recovered),
            color: colors.green,
            legendFontColor: colors.greenZoneText,
            legendFontSize: Fonts.size.verySmall
        },
        {
            name: "Deceased",
            cases: parseInt(locationData.deaths),
            color: colors.textColor,
            legendFontColor: colors.textColor,
            legendFontSize: Fonts.size.verySmall
        }

    ];

    return (
        <View style={style.mainContainer}>
            <ScrollView>

                <StatMetaView statMetaObj={statMetaObj}></StatMetaView>

                <View style={style.statContainer}>
                    <Text style={{ ...style.statHeaderText, color: colors.red }}>Confirmed Cases</Text>
                    <BarChart
                        data={confirmedCases}
                        width={Metrics.screenWidth - 40}
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
                    <Text style={{ ...style.statHeaderText, color: colors.green }}>Recovered Cases</Text>
                    <BarChart
                        data={recoveredCases}
                        width={Metrics.screenWidth - 40}
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
                        width={Metrics.screenWidth - 40}
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