import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postBrewery(action){
    try{
        console.log(action.payload)
        yield axios.post(`/api/brewery`, action.payload);
        yield put({type: 'GET_BREWERY_IMAGE'})
    } catch (error){
        console.log(error)
    }
}

function* addBrewerySaga() {
    yield takeLatest('ADD_BREWERY', postBrewery);
}

export default addBrewerySaga;