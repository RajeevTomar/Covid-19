import React from 'react';
import { Text, View, Image, FlatList, TouchableHighlight } from 'react-native';
import StateScreenStyle from '../styles/StateScreenStyle'
import HeaderView from '../components/HeaderView';
import StateDistrictCellView from '../components/StateDistrictCellView';
import useTheme from '../themes/ThemeHooks';
import { Metrics } from '../themes';
import { sortBaseOnConfirmCases } from '../utils/CommonFunction';




export default StateScreen = (props) => {

  const { style } = StateScreenStyle();

  const { colors } = useTheme();

  const { state, allZone } = props.route.params;


  //const districts = Object.create(state.districtData);

  // sort the state array
  let districtData = sortBaseOnConfirmCases(state.districtData);

  // filter all district zone based on statecode
  if (allZone != null && allZone != 'undefined' && allZone.length > 0) {
    let districtZones = allZone.filter(item => {
      return item.statecode === state.statecode;
    });
    // map with state data
    if (districtZones != null && districtZones != 'undefined' && districtZones.length > 0) {
      districtData.map(district => {
        let districtZone = districtZones.filter(item => {
          return item.district === district.district;
        });
        // add color code based on zone 
        let iDistrictZone = districtZone[0];
        if (iDistrictZone != null && iDistrictZone != 'undefined') {
          let colorsObj = {
            backgroundColor: '',
            textColor: ''
          };
          switch (iDistrictZone.zone) {
            case 'Green':
              colorsObj.backgroundColor = colors.greenZoneBackground;
              colorsObj.textColor = colors.greenZoneText;
              break;
            case 'Red':
              colorsObj.backgroundColor = colors.redZoneBackground;
              colorsObj.textColor = colors.redZoneText;
              break;
            case 'Orange':
              colorsObj.backgroundColor = colors.orangZoneBackground;
              colorsObj.textColor = colors.orangeZoneText;
              break;
            default:
              colorsObj.backgroundColor = colors.actionbarColor;
              colorsObj.textColor = colors.avatarBorder;
          }
          district.colors = colorsObj;
        }
        return district;
      });
    }
  }

  let stateData = districtData ? districtData : state.districtData;

  const RenderDistricts = (district, index) => {
    let zoneTextColor = district.colors ? district.colors.textColor : colors.textColor;
    let zoneBackgroundColor = district.colors ? district.colors.backgroundColor : colors.transparent;
    return (
      <View>
        <View style={{
          ...style.rowContainer, justifyContent: 'space-around'
        }}>
          <View style={{ backgroundColor: zoneBackgroundColor, flex: 1.5, }}>
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
      {state && <HeaderView header={[state.state, 'Confirmed', 'Recovered', 'Deceased']} />}
      {stateData && <FlatList style={{ marginTop: Metrics.tinyMargin }}
        data={stateData}
        renderItem={({ item, index }) => RenderDistricts(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />}
    </View>
  );
}