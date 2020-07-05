import { NEWS_ERROR, SHOW_LOADING_NEWS, TOP_HEADLINES_SUCCESS } from '../actions/ActionType';

const INITIAL_STATE = {
    loading: false,
    articles: [],
    error: ''
}
const NewsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_LOADING_NEWS:
            return ({ ...state, loading: action.payload });
        case TOP_HEADLINES_SUCCESS:
            return ({ ...state, articles: action.payload, loading: false, error: '' });
        case NEWS_ERROR:
            return ({ ...state, loading: false, error: action.payload });
        default:
            return state;
    }
}

export default NewsReducer;