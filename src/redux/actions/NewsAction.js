import {TOP_HEADLINES,EVERYTHING} from '../../Constant';
import axios from 'axios';
import {BASE_URL_NEWS} from '../../server/Url';
import {NEWS_ERROR,SHOW_LOADING_NEWS,TOP_HEADLINES_SUCCESS} from './ActionType';
import {API_AUTH_KEY} from '../../server/Config';

/**
 * 
 * @param {*} dispatch -- sent action to the reducer
 * @param {*} config -- it have config like methods name,
 *  api stateName - based on multiple result can be sent
 *  to the component props
 */
export const fetchTopHeadlines = () => {
    return (dispatch) => {
        dispatchActions(dispatch, SHOW_LOADING_NEWS, true);
        // axios with header
        const axiosClient = axios.create({
            // baseURL: BASE_URL,
            headers: {
                Accept: 'application/json',
                Authorization:API_AUTH_KEY
            }
        });
        axiosClient({
            method: 'get',
            url: BASE_URL_NEWS + TOP_HEADLINES,
            params: {q:'covid'}
        }).then(res => {
            dispatchActions(dispatch, TOP_HEADLINES_SUCCESS, res.data.articles);
        }).catch(err => {
            dispatchActions(dispatch, NEWS_ERROR, err);
        });
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