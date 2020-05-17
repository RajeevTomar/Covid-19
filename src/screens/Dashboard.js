import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import ApplicationStyle from '../themes/ApplicationStyles';
import { useSelector, useDispatch } from 'react-redux'
import { fetchLiveStateWiseAndTestData } from '../redux/actions/RemoteAPIAction';

const Dashboard = (props) => {

    const dispatch = useDispatch();
    useEffect(() => {
        // fetch all live stats and test data
        dispatch(fetchLiveStateWiseAndTestData);

    }, []);

    // read data from store
    const { isLoading, error, liveData, stateWise, testData } =
        useSelector(state => state.allStats);
    const { style } = ApplicationStyle();
    if (liveData == null)
        return null;
    return (
        <View style={style.screen.mainContainer}>
            <Text>{liveData[0].active}</Text>
        </View>
    );
}

export default Dashboard;