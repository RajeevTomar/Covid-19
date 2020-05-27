import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList, TouchableHighlight } from 'react-native';
import DistrictScreenStyle from '../styles/DistrictScreenStyle'
import HeaderView from '../components/HeaderView';
import { useSelector, useDispatch } from 'react-redux'
import StateDistrictCellView from '../components/StateDistrictCellView';
import useTheme from '../themes/ThemeHooks';
import { Metrics } from '../themes';
import {
  fetchDistrictsWithZone, parseStateTimeseries, refineDataForChart,
  parseStateTestData
} from '../utils/CommonFunction';
import ColumnView from '../components/ColumnView';
import { fetchStateTimeSeries } from '.././redux/actions/RemoteAPIAction';
import ActivityIndicator from '../components/ScreenLoader';




export default DistrictScreen = (props) => {

  // styles & colors object
  const { style } = DistrictScreenStyle();
  const { colors } = useTheme();

  // navigation
  const navigation = props.navigation;

  // read data from navigation param
  const { state, allZone, stateLiveData } = props.route.params;

  // sort the state array
  let districtData = fetchDistrictsWithZone(state, allZone, colors);

  // redux dispatch
  const dispatch = useDispatch();

  // read data from store
  const { isLoading, error, stateTimeSeries, allStateTestSeries } =
    useSelector(state => state.stateTimeSeries);

  // UserEffect - Component willmount,didupdate & willUnmount
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      fetchStateDailyCases();
    });
    return unsubscribe;

  }, []);

  // get Data from Cloud API
  const fetchStateDailyCases = () => {
    fetchStateTimeSeries(dispatch);
  };


  // parse data for graph
  let stateTimeSeriesForGraph = null;
  let timeSeries = null;
  if (stateTimeSeries != null) {
    timeSeries = parseStateTimeseries(stateTimeSeries)[state.statecode.toUpperCase()];
    if (timeSeries != null && timeSeries != 'undefined')
      stateTimeSeriesForGraph = refineDataForChart(timeSeries);
  }

  const onTapStateInsight = () => {
    // move to Stat screen 
    // move to the District Screen 
    if (navigation != null && navigation != 'undefined' && timeSeries != null) {
      const parseStateTestDataObj = parseStateTestData(allStateTestSeries);
      if (parseStateTestDataObj != null) {
        const stateName = state.state;
        const stateTestData = parseStateTestDataObj[stateName];
        navigation.navigate('Stat', {
          timeSeries: timeSeries, totalCounts: stateLiveData,
          location: stateName, stateTestData: stateTestData
        });
      }
    }
  }

  // Render Each row of District
  const RenderDistricts = (district, index) => {
    let zoneTextColor = district.colors ? district.colors.textColor : colors.textColor;
    let zoneBackgroundColor = district.colors ? district.colors.backgroundColor : colors.transparent;
    return (
      <View>
        <View style={{
          ...style.rowContainer, justifyContent: 'space-around'
        }}>
          <View style={{
            backgroundColor: zoneBackgroundColor, flex: 1.5, justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              ...style.countText, color: zoneTextColor, flex: 1.5, marginTop: Metrics.smallMargin,
              fontWeight: 'normal'
            }}>{district.district}</Text>
          </View>
          <StateDistrictCellView total={district.confirmed} delta={district.delta.confirmed} textColor={colors.red} />
          <StateDistrictCellView total={district.recovered} delta={district.delta.recovered} textColor={colors.green} />
          <StateDistrictCellView total={district.deceased} delta={district.delta.deceased} textColor={colors.lightColor} />
        </View>
        <View style={{ ...style.divider, margin: Metrics.tinyMargin }}></View>
      </View>
    );
  }

  // return the main View 
  return (
    <View style={style.mainContainer}>
      {stateLiveData &&
        <View style={style.districtContainer}>
          <TouchableHighlight onPress={() => onTapStateInsight()}>
            <ColumnView totalStat={stateLiveData} title={state.state} refinedData={stateTimeSeriesForGraph} />
          </TouchableHighlight>
        </View>
      }
      <HeaderView header={['Location', 'Confirmed', 'Recovered', 'Deceased']} />
      {districtData &&
        <FlatList style={{ marginTop: Metrics.tinyMargin }}
          data={districtData}
          renderItem={({ item, index }) => RenderDistricts(item, index)}
          keyExtractor={(item, index) => index.toString()} />
      }
      <ActivityIndicator isLoading={isLoading} />
    </View>
  );
}
