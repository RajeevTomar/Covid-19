import React, { useState, useEffect } from 'react';
import {
    Text, View, Image, FlatList, TouchableHighlight, AppState, ScrollView,
    RefreshControl,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { fetchLiveStateWiseAndTestData, fetchZones } from '../redux/actions/RemoteAPIAction';
import DashboardStyle from '../styles/DashboardStyle';
import useTheme from '../themes/ThemeHooks';
import { Metrics } from '../themes';
import ActivityIndicator from '../components/ScreenLoader';
import GetLocation from 'react-native-get-location';
import StateDistrictCellView from '../components/StateDistrictCellView';
import HeaderView from '../components/HeaderView';
import { CONTAINMENT_ZONE_MESSAGE } from '../String';
import { preprocessTimeseries, refineDataForChart } from '../utils/CommonFunction';
import ColumnView from '../components/ColumnView';
import LocatedDistrictZoneView from '../components/LocatedDistrictZoneView';
// import 'intl';


const Dashboard = (props) => {

    const { style } = DashboardStyle();
    const { colors } = useTheme();

    // state
    //const [appState, setAppState] = useState(AppState.currentState);
    const [refreshing, setRefreshing] = React.useState(false);


    // navigation
    const navigation = props.navigation;

    // redux dispatch
    const dispatch = useDispatch();

    // read data from store
    const { isLoading, error, allData, stateWise, testData } =
        useSelector(state => state.allStats);

    const { liveZone, allZone } = useSelector(state => state.allZones)

    const liveData = allData != null ? allData.statewise : null;

    // remove first item from list   
    const stateList = (liveData != null && liveData.length > 0) ? liveData.slice(1) : null;

    useEffect(() => {
        fetchDataFromRemoteAPI();

        // AppState.addEventListener("change", _handleAppStateChange);
        // return () => {
        //     AppState.removeEventListener("change", _handleAppStateChange);
        // };

    }, []);

    // const _handleAppStateChange = nextAppState => {
    //     if (appState.match(/inactive|background/) && nextAppState === "active") {
    //         console.log("App has come to the foreground!");
    //     }
    //     setAppState(nextAppState);
    //     fetchDataFromRemoteAPI();
    // };

    // Country Line Chart Data
    const dailyCasesReport = allData != null ? preprocessTimeseries(allData.cases_time_series) : null;
    const refinedData = refineDataForChart(dailyCasesReport);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchDataFromRemoteAPI();
        wait(500).then(() => setRefreshing(false));
    }, [refreshing]);

    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }


    const fetchDataFromRemoteAPI = () => {
        // make api call here
        // fetch all live stats and test data
        dispatch(fetchLiveStateWiseAndTestData);

        // get current location
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        }).then(location => {
            if (location != null) {
                const latitude = location.latitude;
                const longitude = location.longitude;
                // fetch all live stats and test data
                //dispatch(fetchZones(latitude, longitude));
                //dispatch(fetchZones(23.302189, 81.356804));
                //dispatch(fetchZones(28.535517, 77.391029));
                dispatch(fetchZones(27.213606, 78.031471));
            }
        }).catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        });
    }


    const RenderStates = (state, index) => {
        return (
            <TouchableHighlight onPress={() => onTapState(state, index)}>
                <View>
                    <View style={{
                        ...style.rowContainer, justifyContent: 'space-around',
                        paddingTop: Metrics.smallMargin, paddingBottom: Metrics.smallMargin,
                    }}>
                        <Text style={{
                            ...style.countText, flex: 1.5, color: colors.textColor,
                            marginLeft: Metrics.baseMargin, fontWeight: 'normal'
                        }}>{state.state}</Text>
                        <StateDistrictCellView total={state.confirmed} delta={state.deltaconfirmed} textColor={colors.red} />
                        <StateDistrictCellView total={state.recovered} delta={state.deltarecovered} textColor={colors.green} />
                        <StateDistrictCellView total={state.deaths} delta={state.deltadeaths} textColor={colors.lightColor} />
                    </View>
                    <View style={{ ...style.divider, margin: Metrics.tinyMargin }}></View>
                </View>

            </TouchableHighlight>
        );
    }

    const onTapState = (state, index) => {
        // filter out district based on selected state
        if (state != null && state != 'undefined') {
            new Promise((resolve, reject) => {
                if (state == null || state == 'undefined' || stateWise == null)
                    reject('Something went wrong.');

                // get state code
                let stateCode = state.statecode;
                let districtData = stateWise.filter(item => {
                    return item.statecode == stateCode;
                });
                resolve(districtData);
            }).then(state => {
                // move to the District Screen 
                if (navigation != null && navigation != 'undefined' && state != null && state.length > 0)
                    navigation.navigate('State', { state: state[0], allZone: allZone });
            }).catch(error => {
                alert(error);
            });
        }
    }

    const onTapCountryInsight = () => {
        // move to Stat screen 
        // move to the District Screen 
        if (navigation != null && navigation != 'undefined')
            navigation.navigate('Stat', { refinedData:refinedData });
    }


    return (
        <View style={style.mainContainer}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                {/* Current location stat */}
                {liveData && <View style={style.statContainer}>
                    {liveZone && allZone && <LocatedDistrictZoneView title={liveZone.district} liveZone={liveZone}
                        allZone={allZone} stateWise={stateWise} />}
                    {/* Country Data */}
                    <TouchableHighlight onPress={() => onTapCountryInsight()}>
                        <ColumnView totalStat={liveData[0]} title='Across India' refinedData={refinedData} />
                    </TouchableHighlight>
                </View>}
                {/* Header View */}
                <HeaderView header={['Location', 'Confirmed', 'Recovered', 'Deceased']} />
                {/* State List  */}
                {stateList && <FlatList style={{ marginTop: Metrics.tinyMargin, marginBottom: Metrics.baseMargin }}
                    data={stateList}
                    renderItem={({ item, index }) => RenderStates(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                />}
            </ScrollView>
            {/* containmentZone View    */}
            {liveZone && liveZone.inContainmentZone && <View style={style.containmentZoneView}>
                <Text style={style.zoneLocationText}>{CONTAINMENT_ZONE_MESSAGE}</Text>
            </View>}
            <ActivityIndicator isLoading={isLoading} />
        </View>
    );

}

export default Dashboard; 