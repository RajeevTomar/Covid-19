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
import StateDistrictCellView from '../components/StateDistrictCellView';
import HeaderView from '../components/HeaderView';
import { CONTAINMENT_ZONE_MESSAGE } from '../String';
import { preprocessTimeseries, refineDataForChart } from '../utils/CommonFunction';
import ColumnView from '../components/ColumnView';
import LocatedDistrictZoneView from '../components/LocatedDistrictZoneView';
import { INDIA_LOCATION_CODE } from '../Constant';
import Geolocation from '@react-native-community/geolocation';



const Dashboard = (props) => {

    const { style } = DashboardStyle();
    const { colors } = useTheme();

    // state
    const [refreshing, setRefreshing] = useState(false);
    const [appState, setAppState] = useState('inactive');


    // navigation
    const navigation = props.navigation;

    // redux dispatch
    const dispatch = useDispatch();

    // read data from redux store
    const { isLoading, error, allData, stateWise } =
        useSelector(state => state.allStats);


    // redux store
    const { liveZone, allZone } = useSelector(state => state.allZones)

    const liveData = allData != null ? allData.statewise : null;

    // remove first item from list   
    const stateList = (liveData != null && liveData.length > 0) ? liveData.slice(1) : null;

    // CountryTimeSeries Data
    const timeSeries = allData != null ? preprocessTimeseries(allData.cases_time_series) : null;
    const timeSeriesForChart = refineDataForChart(timeSeries);

    useEffect(() => {
        fetchDataFromRemoteAPI();
        AppState.addEventListener("change", handleAppStateChange);
        return () => {
            AppState.removeEventListener("change", handleAppStateChange);
        };
    }, []);

    const handleAppStateChange = (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === "active") {
            fetchDataFromRemoteAPI();
        }
        setAppState(nextAppState);
    };

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
        dispatch(fetchLiveStateWiseAndTestData());

        Geolocation.getCurrentPosition(
            position => {
                const location = position?.coords
                const latitude = location.latitude;
                const longitude = location.longitude;
                // fetch all live stats and test data
                
                dispatch(fetchZones(latitude, longitude));
                //dispatch(fetchZones(23.302189, 81.356804));
                //dispatch(fetchZones(28.535517, 77.391029));
                //dispatch(fetchZones(27.213606, 78.031471));
            },
            error => {
                //Alert.alert('Error', JSON.stringify(error));
                console.log(JSON.stringify(error));
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
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

    const onTapState = (tappedState, index) => {
        // filter out district based on selected state
        if (tappedState != null && tappedState != 'undefined') {
            new Promise((resolve, reject) => {
                if (tappedState == null || tappedState == 'undefined' || stateWise == null)
                    reject('Something went wrong.');

                // get state code
                let stateCode = tappedState.statecode;
                let districtData = stateWise.filter(item => {
                    return item.statecode == stateCode;
                });
                resolve(districtData);
            }).then(state => {
                // move to the District Screen 
                if (navigation != null && navigation != 'undefined' && state != null && state.length > 0)
                    navigation.navigate('District', { state: state[0], allZone: allZone, stateLiveData: tappedState });
            }).catch(error => {
                alert(error);
            });
        }
    }

    const onTapCountryInsight = () => {
        // move to Stat screen 
        // move to the District Screen 
        if (navigation != null && navigation != 'undefined')
            navigation.navigate('Stat', { locationCode: INDIA_LOCATION_CODE });

    }


    return (
        <View style={style.mainContainer}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                {/* Current location stat */}
                {liveData &&
                    <View style={style.statContainer}>
                        {liveZone && allZone && <LocatedDistrictZoneView title={liveZone.district} liveZone={liveZone}
                            allZone={allZone} stateWise={stateWise} />}
                        {/* Country Data */}
                        <TouchableHighlight onPress={() => onTapCountryInsight()}>
                            <ColumnView totalStat={liveData[0]} title='Across India' refinedData={timeSeriesForChart} />
                        </TouchableHighlight>
                    </View>
                }
                {/* Header View */}
                <HeaderView header={['Location', 'Confirmed', 'Recovered', 'Deceased']} />
                {/* State List  */}
                {stateList &&
                    <FlatList style={{ marginTop: Metrics.tinyMargin, marginBottom: Metrics.baseMargin }}
                        data={stateList}
                        renderItem={({ item, index }) => RenderStates(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
            </ScrollView>
            {/* containmentZone View    */}
            {liveZone && liveZone.inContainmentZone &&
                <View style={style.containmentZoneView}>
                    <Text style={style.zoneLocationText}>{CONTAINMENT_ZONE_MESSAGE}</Text>
                </View>
            }
            <ActivityIndicator isLoading={isLoading} />
        </View>
    );

}

export default Dashboard; 