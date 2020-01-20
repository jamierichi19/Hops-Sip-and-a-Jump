import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getFavorites() {
    try{
        const getResponse = yield axios.get('/api/like');
        yield put({type: 'SET_FAVORITES', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getFavoritesSaga() {
    yield takeLatest('GET_FAVORITES', getFavorites)
}

export default getFavoritesSaga;