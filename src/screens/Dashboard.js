import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { fetchLiveStateWiseAndTestData } from '../redux/actions/RemoteAPIAction';
import style from '../styles/DashboardStyle';
import useTheme from '../themes/ThemeHooks';


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


    const RawView = ({ title, total, delta, textColor }) => {

        return (
            <View style={style.columnView}>
                <Text style={style.statusText}>{title}</Text>
                <Text style={{ ...style.countText, color: textColor }}>{total}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={style.arrowImage} source={require('../images/arrow_up_small.png')} />
                    <Text style={{ ...style.deltaText, color: textColor }}>{delta}</Text>
                </View>
            </View>
        );
    }


    const ColumnView = (props) => {
        const totalStat = props.totalStat;
        return (
            <View style={style.rowContainer}>
                <RawView title='Confirmed' total={totalStat.confirmed} delta={totalStat.deltaconfirmed} textColor={useTheme().colors.red} />
                <RawView title='Recovered' total={totalStat.recovered} delta={totalStat.deltarecovered} textColor={useTheme().colors.green} />
                <RawView title='Deceased' total={totalStat.deaths} delta={totalStat.deltadeaths} textColor={useTheme().colors.black} />
            </View>
        );
    }

    const RenderStates = (state, index) => {
        if (index == 0)
            return null;
        return (
            <TouchableHighlight>
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
                {/* <FlatList
                    data={liveData}
                    renderItem={({ item, index }) => RenderStates(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                /> */}
            </View>
        </View>
    );

}

export default Dashboard;