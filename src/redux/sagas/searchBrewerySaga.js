import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* searchBrewery(action){
    try{
        const getResponse = yield axios.get(`/api/search?city=${action.payload.search}`);
        yield put({type: 'SET_SEARCH_RESULTS', payload: getResponse.data})
    } catch (error){
        console.log(error)
    }
}

function* searchBrewerySaga() {
    yield takeLatest('SEARCH_BREWERY', searchBrewery);
}

export default searchBrewerySaga;