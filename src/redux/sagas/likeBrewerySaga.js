import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* postLike(action){
    try{
        console.log(action.payload)
        yield axios.post(`/api/like`, action.payload);
    } catch (error){
        console.log(error)
    }
}

function* likeBrewerySaga() {
    yield takeLatest('LIKE_BREWERY', postLike);
}

export default likeBrewerySaga;