import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postLike(action){
    try{
        yield axios.post(`/api/like`, action.payload);
        yield put({type: 'GET_LIKE', payload: action.payload.id})
    } catch (error){
        console.log(error)
    }
}

function* likeBrewerySaga() {
    yield takeLatest('LIKE_BREWERY', postLike);
}

export default likeBrewerySaga;