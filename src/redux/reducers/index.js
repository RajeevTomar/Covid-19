import {combineReducers} from 'redux'; 

import LiveStateWiseAndTestData from './RemoteAPIReducer';

export default combineReducers({
    allStats:LiveStateWiseAndTestData,
});