import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getLike(action) {
    try{
        console.log(action.payload)
        const getResponse = yield axios.get(`/api/like/favorite/${action.payload}`);
        yield put({type: 'SET_LIKE', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getLikeSaga() {
    yield takeLatest('GET_LIKE', getLike)
}

export default getLikeSaga;