import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* searchBrewery(action){
    try{
        console.log(action.payload)
        // yield axios.post(`/api/brewery`, action.payload);
    } catch (error){
        console.log(error)
    }
}

function* searchBrewerySaga() {
    yield takeLatest('ADD_BREWERY', searchBrewery);
}

export default searchBrewerySaga;