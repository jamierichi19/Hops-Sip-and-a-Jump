import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postComment(action){
    try{
        let data = {
            id: action.payload.id
        }
        console.log(data)
        yield axios.post(`/api/comments`, action.payload);
        yield put({type: 'GET_BREWERY_COMMENTS', payload: data.id})
    } catch (error){
        console.log(error)
    }
}

function* addCommentSaga() {
    yield takeLatest('ADD_COMMENT', postComment);
}

export default addCommentSaga;