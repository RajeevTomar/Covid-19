import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { fetchLiveStateWiseAndTestData, fetchZones } from '../redux/actions/RemoteAPIAction';
import style from '../styles/DashboardStyle';
import useTheme from '../themes/ThemeHooks';
import { Metrics } from '../themes';
import ActivityIndicator from '../components/ScreenLoader';
import GetLocation from 'react-native-get-location';
import StateDistrictCellView from '../components/StateDistrictCellView';
import HeaderView from '../components/HeaderView';
import axios from 'axios';
import { CURRENT_LOC_ZONE_URL } from '../server/Url';
import { ZONE_API_KEY } from '../Constant';

const Dashboard = (props) => {

    // navigation
    const navigation = props.navigation;

    // redux dispatcb
    const dispatch = useDispatch();

    // read data from store
    const { isLoading, error, liveData, stateWise, testData } =
        useSelector(state => state.allStats);

    const { liveZone, allZone } = useSelector(state => state.allZones)

    // remove first item from list   
    const stateList = (liveData != null && liveData.length > 0) ? liveData.slice(1) : null;

    useEffect(() => {
        // fetch all live stats and test data
        dispatch(fetchLiveStateWiseAndTestData);

        // get current location
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                if (location != null) {
                    const latitude = location.latitude;
                    const longitude = location.longitude;
                    // fetch all live stats and test data
                    //dispatch(fetchZones(latitude, longitude));
                    dispatch(fetchZones(28.708881, 77.655746));
                }
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            });

    }, []);

    const TableView = ({ title, total, delta, textColor }) => {
        return (
            <View style={style.columnView}>
                <Text style={style.statusText}>{title}</Text>
                <Text style={{ ...style.countText, color: textColor }}>{total}</Text>
                {delta > 0 && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ ...style.arrowImage, tintColor: textColor }} source={require('../images/icon_plus.png')}
                        tintColor='{textColor}' />
                    <Text style={{ ...style.deltaText, color: textColor }}>{delta}</Text>
                </View>}
            </View>
        );
    }


    const ColumnView = ({ totalStat, title }) => {
        if (title == null || title == 'undefined')
            title = totalStat.state;

        if (totalStat == 'undefined' && liveZone != null && allZone != null) {
            // filter data bw liveZone and allZone
            const liveZoneDistrict = liveZone.district;
            let locatedZone = allZone.filter(zone => {
                return liveZoneDistrict == zone.district
            })
            if (locatedZone != null && locatedZone != 'undefined') {
                const stateCode = locatedZone[0].statecode;
                if (stateCode != null && stateCode != 'undefined') {
                    // filter from district
                    let locatedstate = stateWise.filter(state => {
                        return stateCode == state.statecode
                    });
                    // get final district
                    if (locatedstate != null && locatedstate != 'undefined') {
                        let locatedDistrict = locatedstate[0].districtData.filter(item => {
                            return item.district == liveZoneDistrict;
                        })
                        if (locatedDistrict != null && locatedDistrict.length > 0) {
                            const locationDistrictObj = locatedDistrict[0];
                            totalStat = {
                                confirmed: locationDistrictObj.confirmed,
                                recovered: locationDistrictObj.recovered,
                                deaths: locationDistrictObj.deceased,
                                deltaconfirmed: locationDistrictObj.delta.confirmed,
                                deltarecovered: locationDistrictObj.delta.recovered,
                                deltadeaths: locationDistrictObj.delta.deceased,
                            }
                        }
                    }
                }
            }
        }
        return (
            <View>
                <Text style={style.locationText}>{title}</Text>
                {totalStat && <View style={style.rowContainer}>
                    <TableView title='Confirmed' total={totalStat.confirmed} delta={totalStat.deltaconfirmed} textColor={useTheme().colors.red} />
                    <TableView title='Recovered' total={totalStat.recovered} delta={totalStat.deltarecovered} textColor={useTheme().colors.green} />
                    <TableView title='Deceased' total={totalStat.deaths} delta={totalStat.deltadeaths} textColor={useTheme().colors.lightColor} />
                </View>}
            </View>
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
                            ...style.countText, flex: 1, color: useTheme().colors.textColor,
                            marginLeft: Metrics.baseMargin, fontWeight: 'normal'
                        }}>{state.state}</Text>
                        <StateDistrictCellView total={state.confirmed} delta={state.deltaconfirmed} textColor={useTheme().colors.red} />
                        <StateDistrictCellView total={state.recovered} delta={state.deltarecovered} textColor={useTheme().colors.green} />
                        <StateDistrictCellView total={state.deaths} delta={state.deltadeaths} textColor={useTheme().colors.lightColor} />
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
                    navigation.navigate('StateScreen', { state: state[0] });
            }).catch(error => {
                alert(error);
            });
        }
    }

    return (
        <View style={style.mainContainer}>
            {liveData && <View style={style.statContainer}>
                {liveZone && allZone && <ColumnView totalStat={'undefined'} title={liveZone.district} />}
                <View style={style.divider} />
                <ColumnView totalStat={liveData[0]} title='Across India' />
            </View>}
            <HeaderView header={['Location', 'Confirmed', 'Recovered', 'Deceased']} />
            {stateList && <FlatList style={{ marginTop: Metrics.tinyMargin }}
                data={stateList}
                renderItem={({ item, index }) => RenderStates(item, index)}
                keyExtractor={(item, index) => index.toString()}
            />}
            <ActivityIndicator isLoading={isLoading} />
        </View>
    );

}

export default Dashboard;