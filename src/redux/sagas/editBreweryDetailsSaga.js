import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* editBreweryDetails(action) {
    try {
        console.log(action.payload)
        yield axios.put(`/api/details/${action.payload.id}`, action.payload);
        yield put({type: 'GET_BREWERY_IMAGE'})
    } catch (error) {
        console.log('Image URL post failed', error);
    }
}

function* editBreweryDetailsSaga() {
    yield takeLatest('EDIT_BREWERY_DETAILS', editBreweryDetails);
}

export default editBreweryDetailsSaga;