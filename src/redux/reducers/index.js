import {combineReducers} from 'redux'; 

import LiveStateWiseAndTestData from './RemoteAPIReducer';
import LiveLocationZoneAndAllZone from './FetchZoneReducer';
import StateTimeSeries from './StateTimeseriesReducer';
import NewsReducer from './NewsReducer';

export default combineReducers({
    allStats:LiveStateWiseAndTestData,
    allZones:LiveLocationZoneAndAllZone,
    stateTimeSeries:StateTimeSeries,
    news:NewsReducer,
});