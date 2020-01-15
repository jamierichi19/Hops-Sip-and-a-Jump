import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getComments(action) {
    try{
       console.log(action.payload)
        const getResponse = yield axios.get(`/api/comments?id=${action.payload}`);
        yield put({type: 'SET_COMMENTS', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getCommentsSaga() {
    yield takeLatest('GET_BREWERY_COMMENTS', getComments)
}

export default getCommentsSaga;