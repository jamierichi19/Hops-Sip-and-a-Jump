import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getImage() {
    try{
        const getResponse = yield axios.get('/api/imageurl');
        console.log(getResponse.data)
        yield put({type: 'SET_IMAGE', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getImageSaga() {
    yield takeLatest('GET_IMAGE', getImage)
}

export default getImageSaga;