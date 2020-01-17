import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getDetails(action) {
    try{
        const getResponse = yield axios.get(`/api/details?id=${action.payload}`);
        yield put({type: 'SET_DETAILS', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getDetailsSaga() {
    yield takeLatest('GET_DETAILS', getDetails)
}

export default getDetailsSaga;