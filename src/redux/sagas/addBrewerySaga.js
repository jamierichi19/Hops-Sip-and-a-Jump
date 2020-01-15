import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* postBrewery(action){
    try{
        yield axios.post(`/api/brewery`, action.payload);
    } catch (error){
        console.log(error)
    }
}

function* addBrewerySaga() {
    yield takeLatest('ADD_BREWERY', postBrewery);
}

export default addBrewerySaga;