import React from 'react';
import {
    Text, View, Image,
} from 'react-native';
import LocatedZoneStyle from '../styles/LocatedZoneStyle';
import useTheme from '../themes/ThemeHooks';
import TableView from '../components/TableView';

export default LocatedDistrictZoneView = ({ title,liveZone,allZone,stateWise }) => {

    const {style} = LocatedZoneStyle();
    const {colors} = useTheme();
    
    let totalStat = null;
    //let zoneType = liveZone.districtZoneType;
    let zoneBackgroundColor = getZoneBackgroundColor(liveZone,colors);

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
                    return district === liveZoneDistrict;
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
                <Text style={{...style.zoneLocationText,color:colors.white}}>{title}</Text>
                {/* <Text style={{...style.zoneLocationText,color:colors.white}}>{zoneType}</Text> */}
            </View>}
            {totalStat && <View style={style.rowContainer}>
                <TableView title='Confirmed' total={totalStat.confirmed} delta={totalStat.deltaconfirmed} textColor={colors.red} />
                <TableView title='Recovered' total={totalStat.recovered} delta={totalStat.deltarecovered} textColor={colors.green} />
                <TableView title='Deceased' total={totalStat.deaths} delta={totalStat.deltadeaths} textColor={colors.lightColor} />
            </View>}
            {liveZone.district !== 'NA' && <View style={{...style.divider,height:3}} />}
        </View>
    );
}

const getZoneBackgroundColor = (liveZone,colors) => {
    if(liveZone.inContainmentZone)
    {
         return colors.red;
    }
    else
    return colors.green;
    // zoneType = zoneType.replace(/ +/g, "").toLowerCase();
    // switch (zoneType) {
    //     case 'orangezone':
    //         return colors.lightColor;
    //     case 'redzone':
    //         return colors.red;
    //     case 'greenzone':
    //         return colors.green;
    //     default:
    //         return colors.textColor;
    // }

}
