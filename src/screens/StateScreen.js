import React from 'react';
import { Text, View, Image, FlatList, TouchableHighlight } from 'react-native';
import StateScreenStyle from '../styles/StateScreenStyle'
import HeaderView from '../components/HeaderView';
import StateDistrictCellView from '../components/StateDistrictCellView';
import useTheme from '../themes/ThemeHooks';
import { Metrics } from '../themes';




export default StateScreen = (props) => {

  const {style} = StateScreenStyle();

  const { colors } = useTheme();

  const { state,allZone } = props.route.params;

  // sort the state array
  let districtData = state.districtData;
  districtData = districtData.sort((firstItem, secondItem) =>{
    if (firstItem.confirmed < secondItem.confirmed) {
      return 1;
    }
    if (firstItem.confirmed > secondItem.confirmed) {
      return -1;
    }
    // cases must be equal
    return 0;
  });


  const RenderDistricts = (district, index) => {
    return (
      <View>
        <View style={{
          ...style.rowContainer, justifyContent: 'space-around',
          paddingTop: Metrics.smallMargin, paddingBottom: Metrics.smallMargin,
        }}>
          <Text style={{
            ...style.countText, flex: 1, color: colors.textColor,
            marginLeft: Metrics.baseMargin, fontWeight: 'normal'
          }}>{district.district}</Text>
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
      {state.districtData && <FlatList style={{marginTop:Metrics.tinyMargin}}
        data={districtData}
        renderItem={({ item, index }) => RenderDistricts(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />}
    </View>
  );
}