import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* postComment(action){
    try{
        yield axios.post(`/api/comments`, action.payload);
    } catch (error){
        console.log(error)
    }
}

function* addCommentSaga() {
    yield takeLatest('ADD_COMMENT', postComment);
}

export default addCommentSaga;