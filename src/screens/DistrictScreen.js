import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList, TouchableHighlight } from 'react-native';
import DistrictScreenStyle from '../styles/DistrictScreenStyle'
import HeaderView from '../components/HeaderView';
import { useSelector, useDispatch } from 'react-redux'
import StateDistrictCellView from '../components/StateDistrictCellView';
import useTheme from '../themes/ThemeHooks';
import { Metrics } from '../themes';
import { fetchDistrictsWithZone, parseStateTimeseries, refineDataForChart } from '../utils/CommonFunction';
import ColumnView from '../components/ColumnView';
import axios from 'axios';
import { fetchStateTimeSeries } from '.././redux/actions/RemoteAPIAction';
import ActivityIndicator from '../components/ScreenLoader';



export default DistrictScreen = (props) => {

  // styles & colors object
  const { style } = DistrictScreenStyle();
  const { colors } = useTheme();

  // State
  //const [stateTimeSeries, setStateTimeSeries] = useState([]);

  // read data from navigation param
  const { state, allZone, stateLiveData } = props.route.params;

  // sort the state array
  let districtData = fetchDistrictsWithZone(state, allZone, colors);

  // redux dispatch
  const dispatch = useDispatch();

  // read data from store
  const { isLoading, error, stateTimeSeries } =
    useSelector(state => state.stateTimeSeries);

  let stateTimeSeriesForGraph = null;
  if(stateTimeSeries != null)
  {
    const timeSeries = parseStateTimeseries(stateTimeSeries)[state.statecode.toUpperCase()];
    stateTimeSeriesForGraph = refineDataForChart(timeSeries);
  }  

  useEffect(() => {
    fetchStateDailyCases();
  }, []);

  const fetchStateDailyCases = () => {
    fetchStateTimeSeries(dispatch);

    // axios.get('https://api.covid19india.org/states_daily.json').
    //   then(res => {
    //     if (res != null) {
    //       const timeSeries = parseStateTimeseries(res.data)[state.statecode.toUpperCase()];
    //       const timeSeriesForChart = refineDataForChart(timeSeries);
    //       setStateTimeSeries(timeSeriesForChart);
    //     }
    //   }).
    //   catch(error => {

    //   });
  };


  //   try {
  //     const [
  //       { data: statesDailyResponse },
  //     ] = await Promise.all([
  //       axios.get('https://api.covid19india.org/states_daily.json'),
  //     ]);

  //     // Timeseries
  //     const timeSeries = parseStateTimeseries(statesDailyResponse)[state.statecode.toUpperCase()];
  //     const timeSeriesForChart = refineDataForChart(timeSeries);
  //     setStateTimeSeries(timeSeriesForChart);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const onTapStateInsight = () => {

  }

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
