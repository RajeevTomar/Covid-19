import {
    FETCH_STATE_DAILY_CASES,
    STATE_HTTP_ERROR,SHOW_LOADING_STATE
} from '../actions/ActionType';



const LIVE_STATE_INITIAL_STATE = {
    error: null,
    isLoading: false,
    stateTimeSeries: null,
    
    
}

const stateTimeSeries = (state = LIVE_STATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_STATE_DAILY_CASES:
            return { ...state, isLoading: false, ...action.payload};
        case STATE_HTTP_ERROR:
            return { ...state, isLoading: false, error: action.payload };
        case SHOW_LOADING_STATE:
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
}
export default stateTimeSeries;