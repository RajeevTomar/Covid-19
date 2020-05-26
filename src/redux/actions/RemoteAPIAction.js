import {
    FETCH_STATE_DISTRICT_TEST_DATA, FETCH_ZONES_DATA, FETCH_STATE_DAILY_CASES,
    HTTP_ERROR, SHOW_LOADING, ZONE_HTTP_ERROR, STATE_HTTP_ERROR, SHOW_LOADING_ZONE, SHOW_LOADING_STATE
} from './ActionType';

import axios from 'axios';
import {
    LIVE_DAILY_DATA_URL, STATE_DISTRICT_WISE_URL, CURRENT_LOC_ZONE_URL, ZONE_DATA_URL,
    TEST_DATA_URL, STATE_DAILY_DATA_URL
} from '../../server/Url';
import { ZONE_API_KEY } from '../../Constant';

export const fetchLiveStateWiseAndTestData = (dispatch) => {
    // show loading
    dispatchActions(dispatch, SHOW_LOADING, true);
    // return (dispatch) => {
    Promise.all([
        axios.get(LIVE_DAILY_DATA_URL),
        axios.get(STATE_DISTRICT_WISE_URL),
        axios.get(TEST_DATA_URL),
    ]).then(responses => {
        // save responses in store and dispatch
        dispatchActions(dispatch, FETCH_STATE_DISTRICT_TEST_DATA,
            {
                allData: responses[0].data,
                stateWise: responses[1].data,
                testData: responses[2].data
            });
    }).catch(error => {
        dispatchActions(dispatch, HTTP_ERROR, error);
    });
}
// };

export const fetchZones = (latitude, longitude) => {
    return (dispatch, getState) => {
        Promise.all([
            axios.post(CURRENT_LOC_ZONE_URL, {
                key: ZONE_API_KEY,
                latlngs: [[latitude, longitude]]
            }),
            axios.get(ZONE_DATA_URL),
        ]).then(responses => {
            // save responses in store and dispatch
            dispatchActions(dispatch, FETCH_ZONES_DATA,
                {
                    liveZone: responses[0].data.data[0],
                    allZone: responses[1].data.zones,
                });
        }).catch(error => {
            dispatchActions(dispatch, ZONE_HTTP_ERROR, error);
        });
    }
}

export const fetchStateTimeSeries = (dispatch) => {
    // show loading
    dispatchActions(dispatch, SHOW_LOADING_STATE, true);
    axios.get(STATE_DAILY_DATA_URL).
        then(response => {
            // save responses in store and dispatch
            dispatchActions(dispatch, FETCH_STATE_DAILY_CASES,
                {
                    stateTimeSeries: response.data
                });
        }).
        catch(error => {
            dispatchActions(dispatch, STATE_HTTP_ERROR, error);
        });
}



/*
 * 
 * @param {*} dispatch -- dispatch the actions to the reducers
 * @param {*} type - type define the action and based on action reducter return the state 
 * @param {*} payload - is the object that can pass with action type
 */
const dispatchActions = (dispatch, action, payload) => {
    dispatch({
        type: action,
        payload: payload
    });
};