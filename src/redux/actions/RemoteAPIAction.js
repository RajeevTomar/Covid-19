import {
    FETCH_STATE_DISTRICT_TEST_DATA, FETCH_ZONES_DATA,
    HTTP_ERROR, SHOW_LOADING
} from './ActionType';

import axios from 'axios';
import {LIVE_DAILY_DATA_URL, STATE_DISTRICT_WISE_URL,
    TEST_DATA_URL} from '../../server/Url';

export const fetchLiveStateWiseAndTestData = (dispatch) => {
    // show loading
    dispatchActions(dispatch, SHOW_LOADING,true);
    // return (dispatch) => {
        Promise.all([
            axios.get(LIVE_DAILY_DATA_URL),
            axios.get(STATE_DISTRICT_WISE_URL),
            axios.get(TEST_DATA_URL),
        ]).then(responses => {
            // save responses in store and dispatch
            dispatchActions(dispatch, FETCH_STATE_DISTRICT_TEST_DATA,
                {
                    liveData: responses[0].data.statewise,
                    stateWise: responses[1].data,
                    testData: responses[2].data
                });
        }).catch(error => {
            dispatchActions(dispatch, HTTP_ERROR, error);
        });
    }
// };

export const fetchZones = () => {
    return (disptacth) => {

    }
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