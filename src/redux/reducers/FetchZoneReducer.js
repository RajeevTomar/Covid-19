import {
    FETCH_ZONES_DATA,
    ZONE_HTTP_ERROR, SHOW_LOADING,SHOW_LOADING_ZONE
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
        case ZONE_HTTP_ERROR:
            return { ...state, isLoading: false, error: action.payload };
        case SHOW_LOADING_ZONE:
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
}

export default liveLocationZoneAndAllZone;