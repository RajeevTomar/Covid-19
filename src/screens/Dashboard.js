import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList, TouchableHighlight, AppState } from 'react-native';
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

const Dashboard = (props) => {

    const {style} = DashboardStyle();
    const { colors } = useTheme();

    // state
    const [containmentZone, setContainmentZone] = useState(false);
    //const [appState, setAppState] = useState('');


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
        fetchDataFromRemoteAPI();
        AppState.addEventListener("change", _handleAppStateChange);
        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };

    }, []);

    const _handleAppStateChange = nextAppState => {
        if (nextAppState === "active") {
            fetchDataFromRemoteAPI();
        }
        //setAppState(nextAppState);
    };

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
                dispatch(fetchZones(23.302189, 81.356804));
                //dispatch(fetchZones(26.937834, 81.188324));
                //dispatch(fetchZones(27.213606, 78.031471));
            }
        }).catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        });
    }





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
        return (
            <View>
                <Text style={style.locationText}>{title}</Text>
                {totalStat.confirmed > 0 && <View style={style.rowContainer}>
                    <TableView title='Confirmed' total={totalStat.confirmed} delta={totalStat.deltaconfirmed} textColor={colors.red} />
                    <TableView title='Recovered' total={totalStat.recovered} delta={totalStat.deltarecovered} textColor={colors.green} />
                    <TableView title='Deceased' total={totalStat.deaths} delta={totalStat.deltadeaths} textColor={colors.lightColor} />
                </View>}
            </View>
        );
    }

    const DistrictZoneView = ({ title }) => {
        let totalStat = null;
        let zoneType = liveZone.districtZoneType;
        let zoneBackgroundColor = getZoneBackgroundColor(zoneType);

        // check if you are in ContainmentZone
        setContainmentZone(liveZone.inContainmentZone);

        // filter data bw liveZone and allZone
        let liveZoneDistrict = liveZone.district;
        liveZoneDistrict = liveZoneDistrict.replace(/ +/g, "").toLowerCase();
        let locatedZone = allZone.filter(zone => {
            let district = zone.district.replace(/ +/g, "").toLowerCase();;
            return liveZoneDistrict === district;
        })
        if (locatedZone != null && locatedZone != 'undefined' && locatedZone.length > 0) {
            const stateCode = locatedZone[0].statecode;
            if (stateCode != null && stateCode != 'undefined') {
                // filter from district
                let locatedstate = stateWise.filter(state => {
                    return stateCode === state.statecode
                });
                // get final district
                if (locatedstate != null && locatedstate != 'undefined') {
                    let locatedDistrict = locatedstate[0].districtData.filter(item => {
                        let district = item.district.replace(/ +/g, "").toLowerCase();;
                        return district  === liveZoneDistrict;
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
                        };
                    }
                }
            }
        }
        return (
            <View>
                {liveZone.district !== 'NA' && <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    backgroundColor: zoneBackgroundColor
                }}>
                    <Text style={style.zoneLocationText}>{title}</Text>
                    <Text style={style.zoneLocationText}>{zoneType}</Text>
                </View>}
                {totalStat && <View style={style.rowContainer}>
                    <TableView title='Confirmed' total={totalStat.confirmed} delta={totalStat.deltaconfirmed} textColor={colors.red} />
                    <TableView title='Recovered' total={totalStat.recovered} delta={totalStat.deltarecovered} textColor={colors.green} />
                    <TableView title='Deceased' total={totalStat.deaths} delta={totalStat.deltadeaths} textColor={colors.lightColor} />
                </View>}
                {liveZone.district !== 'NA' && <View style={style.divider} />}
            </View>
        );
    }

    const getZoneBackgroundColor = (zoneType) => {
        zoneType = zoneType.replace(/ +/g, "").toLowerCase();
        switch (zoneType) {
            case 'orangezone':
                return colors.lightColor;
            case 'redzone':
                return colors.red;
            case 'greenzone':
                return colors.green;
            default:
                return colors.textColor;
        }

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
                            ...style.countText, flex: 1, color: colors.textColor,
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
                    navigation.navigate('StateScreen', { state: state[0], allZone: allZone });
            }).catch(error => {
                alert(error);
            });
        }
    }

    return (
        <View style={style.mainContainer}>
            {/* Current location stat */}
            {liveData && <View style={style.statContainer}>
                {liveZone && allZone && <DistrictZoneView title={liveZone.district} />}
                <ColumnView totalStat={liveData[0]} title='Across India' />
            </View>}
            {/* Header View */}
            <HeaderView header={['Location', 'Confirmed', 'Recovered', 'Deceased']} />
            {/* State List  */}
            {stateList && <FlatList style={{ marginTop: Metrics.tinyMargin, marginBottom: Metrics.baseMargin }}
                data={stateList}
                renderItem={({ item, index }) => RenderStates(item, index)}
                keyExtractor={(item, index) => index.toString()}
            />}
            {/* containmentZone View    */}
            {containmentZone && <View style={style.containmentZoneView}>
                <Text style={style.zoneLocationText}>{CONTAINMENT_ZONE_MESSAGE}</Text>
            </View>}
            <ActivityIndicator isLoading={isLoading} />
        </View>
    );

}

export default Dashboard; 