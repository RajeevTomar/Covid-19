import {combineReducers} from 'redux'; 

import LiveStateWiseAndTestData from './RemoteAPIReducer';
import LiveLocationZoneAndAllZone from './FetchZoneReducer';

export default combineReducers({
    allStats:LiveStateWiseAndTestData,
    allZones:LiveLocationZoneAndAllZone,
});