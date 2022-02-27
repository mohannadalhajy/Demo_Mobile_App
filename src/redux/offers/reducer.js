import {
  FETCH_GET_ALL_OFFERS_REQUEST,
  FETCH_GET_ALL_OFFERS_SUCCESS,
  FETCH_ADD_OFFERS_SUCCESS,
  FETCH_GET_ALL_OFFERS_FAILURE,
} from './actionTypes'
const initState = {
  loading: false,
  offers: [],
  pageCount: 1,
  count: 0,
  selectedCount: 0,
  error: ""
};

const OfferReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_GET_ALL_OFFERS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case FETCH_ADD_OFFERS_SUCCESS: {
      let list = state.offers;
      list.push(action.payload);
      return {
        ...state,
        offers: list,
        loading: false,
        error: "",
      };
    }
    case FETCH_GET_ALL_OFFERS_SUCCESS: {
      return {
        loading: false,
        offers: action.payload.offers,
        pageCount: action.payload.pageCount,
        count: action.payload.count,
        selectedCount: 0,
        error: "",
      };
    }
    case FETCH_GET_ALL_OFFERS_FAILURE: {
      return {
        offers: [],
        error: action.payload,
        loading: false
      };
    }
    default: return state;
  }
}
export default OfferReducer;