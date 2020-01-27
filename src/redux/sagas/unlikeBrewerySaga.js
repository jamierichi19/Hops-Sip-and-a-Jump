import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* unlikeBrewery(action){
    try{
        yield axios.delete(`/api/like/${action.payload}`);
        yield put({type: 'GET_LIKE', payload: action.payload})
    } catch (error){
        console.log(error)
    }
}

function* unlikeBrewerySaga() {
    yield takeLatest('UNLIKE_BREWERY', unlikeBrewery);
  }

export default unlikeBrewerySaga;