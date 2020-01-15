import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* deleteBrewery(action){
    try{
        console.log(action.payload);
        yield axios.delete(`/api/brewery/${action.payload}`);
        yield put({type: 'GET_BREWERY_IMAGE'})
    } catch (error){
        console.log(error)
    }
}

function* deleteBrewerySaga() {
    yield takeLatest('DELETE_BREWERY', deleteBrewery);
  }

export default deleteBrewerySaga;