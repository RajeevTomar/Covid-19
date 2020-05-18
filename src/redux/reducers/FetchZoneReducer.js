import {
    FETCH_ZONES_DATA,
    HTTP_ERROR, SHOW_LOADING
} from '../actions/ActionType';



const LIVE_STATE_INITIAL_STATE = {
    error: null,
    isLoading: false,
    liveZone: null,
    allZone: null,
}

const liveLocationZoneAndAllZone = (state = LIVE_STATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ZONES_DATA:
            return { ...state, isLoading: false, ...action.payload};
        case HTTP_ERROR:
            return { ...state, isLoading: false, error: action.payload };
        case SHOW_LOADING:
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
}

export default liveLocationZoneAndAllZone;