import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { fetchLiveStateWiseAndTestData } from '../redux/actions/RemoteAPIAction';
import style from '../styles/DashboardStyle';
import useTheme from '../themes/ThemeHooks';
import { Metrics } from '../themes';


const Dashboard = (props) => {

    const dispatch = useDispatch();
    useEffect(() => {
        // fetch all live stats and test data
        dispatch(fetchLiveStateWiseAndTestData);

    }, []);

    // read data from store
    const { isLoading, error, liveData, stateWise, testData } =
        useSelector(state => state.allStats);
    if (liveData == null)
        return null;
    const stateList = liveData.slice(1);

    const TableView = ({ title, total, delta, textColor }) => {
        return (
            <View style={style.columnView}>
                <Text style={style.statusText}>{title}</Text>
                <Text style={{ ...style.countText, color: textColor }}>{total}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ ...style.arrowImage, tintColor: textColor }} source={require('../images/arrow_up_small.png')}
                        tintColor='{textColor}' />
                    <Text style={{ ...style.deltaText, color: textColor }}>{delta}</Text>
                </View>
            </View>
        );
    }


    const ColumnView = (props) => {
        const totalStat = props.totalStat;
        return (
            <View style={style.rowContainer}>
                <TableView title='Confirmed' total={totalStat.confirmed} delta={totalStat.deltaconfirmed} textColor={useTheme().colors.red} />
                <TableView title='Recovered' total={totalStat.recovered} delta={totalStat.deltarecovered} textColor={useTheme().colors.green} />
                <TableView title='Deceased' total={totalStat.deaths} delta={totalStat.deltadeaths} textColor={useTheme().colors.black} />
            </View>
        );
    }

    const StateItemView = ({ total, delta, textColor }) => {
        return (
            <View style={{ ...style.columnView, flex: 1 }}>
                <Text style={{ ...style.countText, color: textColor, }}>{total}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ ...style.arrowImage, tintColor: textColor, alignItems: 'center' }} source={require('../images/arrow_up_small.png')}
                        tintColor='{textColor}' />
                    <Text style={{ ...style.deltaText, color: textColor }}>{delta}</Text>
                </View>
            </View>
        );
    }

    const HeaderView = () => {
        return (
            <View style={{
                ...style.rowContainer, justifyContent: 'space-between',
                padding: Metrics.baseMargin, marginTop: Metrics.baseMargin
            }}>
                <Text style={{ ...style.headerText, flex: 2, color: useTheme().colors.black, }}>Location</Text>
                <Text style={{ ...style.headerText, flex: 1, color: useTheme().colors.red, fontWeight: 'normal' }}>Confirmed</Text>
                <Text style={{ ...style.headerText, flex: 1, color: useTheme().colors.green, fontWeight: 'normal' }}>Recovered</Text>
                <Text style={{ ...style.headerText, flex: 1, color: useTheme().colors.black, fontWeight: 'normal' }}>Deceased</Text>
            </View>
        );
    }

    const RenderStates = (state, index) => {
        return (
            <TouchableHighlight>
                <View>
                    <View style={{
                        ...style.rowContainer, justifyContent: 'space-around',
                        paddingTop: Metrics.baseMargin, paddingBottom: Metrics.baseMargin,
                    }}>
                        <Text style={{
                            ...style.countText, flex: 1.5, color: useTheme().colors.black,
                            marginLeft: Metrics.baseMargin, fontWeight: 'normal'
                        }}>{state.state}</Text>
                        <StateItemView total={state.confirmed} delta={state.deltaconfirmed} textColor={useTheme().colors.red} />
                        <StateItemView total={state.recovered} delta={state.deltarecovered} textColor={useTheme().colors.green} />
                        <StateItemView total={state.deaths} delta={state.deltadeaths} textColor={useTheme().colors.black} />
                    </View>
                    <View style={{ ...style.divider, margin: Metrics.tinyMargin }}></View>
                </View>

            </TouchableHighlight>
        );
    }

    return (
        <View style={style.mainContainer}>
            <View style={style.statContainer}>
                <Text style={style.locationText}>{liveData[7].state}</Text>
                <ColumnView totalStat={liveData[7]} />
                <View style={style.divider}></View>
                <Text style={style.locationText}>Across India</Text>
                <ColumnView totalStat={liveData[0]} />
            </View>
            <HeaderView />
            <FlatList style={{ marginTop: Metrics.tinyMargin }}
                data={stateList}
                renderItem={({ item, index }) => RenderStates(item, index)}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );

}

export default Dashboard;