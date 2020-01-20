import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* unlikeBrewery(action){
    try{
        console.log(action.payload)
        yield axios.delete(`/api/like/${action.payload}`);
    } catch (error){
        console.log(error)
    }
}

function* unlikeBrewerySaga() {
    yield takeLatest('UNLIKE_BREWERY', unlikeBrewery);
  }

export default unlikeBrewerySaga;