import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { fetchLiveStateWiseAndTestData } from '../redux/actions/RemoteAPIAction';
import style from '../styles/DashboardStyle';
import useTheme from '../themes/ThemeHooks';
import { Metrics } from '../themes';
import ActivityIndicator from '../components/ScreenLoader';
//import GetLocation from 'react-native-get-location';
import StateDistrictCellView from '../components/StateDistrictCellView';
import HeaderView from '../components/HeaderView';


const Dashboard = (props) => {

    const navigation = props.navigation;

    const dispatch = useDispatch();
    useEffect(() => {
        // fetch all live stats and test data
        dispatch(fetchLiveStateWiseAndTestData);

    }, []);

    // read data from store
    const { isLoading, error, liveData, stateWise, testData } =
        useSelector(state => state.allStats);

    // remove first item from list   
    const stateList = (liveData != null && liveData.length > 0) ? liveData.slice(1) : null;

    const TableView = ({ title, total, delta, textColor }) => {
        return (
            <View style={style.columnView}>
                <Text style={style.statusText}>{title}</Text>
                <Text style={{ ...style.countText, color: textColor }}>{total}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ ...style.arrowImage, tintColor: textColor }} source={require('../images/icon_plus.png')}
                        tintColor='{textColor}' />
                    <Text style={{ ...style.deltaText, color: textColor }}>{delta}</Text>
                </View>
            </View>
        );
    }


    const ColumnView = ({ totalStat, title }) => {
        if (totalStat == null || totalStat == 'undefined') {
            // fetch data from 
            return null;
        }
        if (title == null || title == 'undefined')
            title = totalStat.state;

        return (
            <View>
                <Text style={style.locationText}>{title}</Text>
                <View style={style.rowContainer}>
                    <TableView title='Confirmed' total={totalStat.confirmed} delta={totalStat.deltaconfirmed} textColor={useTheme().colors.red} />
                    <TableView title='Recovered' total={totalStat.recovered} delta={totalStat.deltarecovered} textColor={useTheme().colors.green} />
                    <TableView title='Deceased' total={totalStat.deaths} delta={totalStat.deltadeaths} textColor={useTheme().colors.black} />
                </View>
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
                            ...style.countText, flex: 1, color: useTheme().colors.black,
                            marginLeft: Metrics.baseMargin, fontWeight: 'normal'
                        }}>{state.state}</Text>
                        <StateDistrictCellView total={state.confirmed} delta={state.deltaconfirmed} textColor={useTheme().colors.red} />
                        <StateDistrictCellView total={state.recovered} delta={state.deltarecovered} textColor={useTheme().colors.green} />
                        <StateDistrictCellView total={state.deaths} delta={state.deltadeaths} textColor={useTheme().colors.redShadow} />
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
                <ColumnView totalStat={'undefined'} />
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