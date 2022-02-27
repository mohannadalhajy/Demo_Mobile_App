import {
    FETCH_GET_ALL_OFFERS_REQUEST,
    FETCH_GET_ALL_OFFERS_SUCCESS,
    FETCH_ADD_OFFERS_SUCCESS,
    FETCH_GET_ALL_OFFERS_FAILURE
} from './actionTypes'
import getErrorMessage from '../../errors';
const api = require('./api');
const getOffersRequestAction = () => {
    return {
        type: FETCH_GET_ALL_OFFERS_REQUEST,
    };
};
const getOffersSuccessAction = (result) => {
    return {
        type: FETCH_GET_ALL_OFFERS_SUCCESS,
        payload: result,
    };
};
const addOfferSuccessAction = (result) => {
    return {
        type: FETCH_ADD_OFFERS_SUCCESS,
        payload: result,
    };
};
const getOffersFailureAction = (error) => {
    return {
        type: FETCH_GET_ALL_OFFERS_FAILURE,
        payload: error,
    };
};
export const getOffers = body => async (dispatch, getState) => {
    dispatch(getOffersRequestAction());
    if (!body.page || body.page <= 0) body.page = 1
    if (!body.take || body.take <= 0) body.take = 50
    const promise = api.getByPage(body.page, body.take);
    promise.then((response) => {
        const offers = response.data.result.result
        dispatch(getOffersSuccessAction({ ...response.data.result, offers: offers }));
    }).catch((error) => {
        let errorMsg = "error"
        if (error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        //const errorMsg = "error in Offers"//getErrorMessage(error.response.data.error.code);
        dispatch(getOffersFailureAction(errorMsg));
    });
};
export const addOffer = body => async (dispatch, getState) => {
    dispatch(getOffersRequestAction());
    const promise = api.add(body);
    promise.then((response) => {
        const offer = response.data.result
        dispatch(addOfferSuccessAction(offer));
    }).catch((error) => {
        let errorMsg = "error"
        if (error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        dispatch(getOffersFailureAction(errorMsg));
    });
};
