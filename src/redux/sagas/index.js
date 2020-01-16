import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import addBrewerySaga from './addBrewerySaga';
import imageInfoSaga from './imageInfoSaga';
import getImageSaga from './getImageSaga';
import deleteBrewerySaga from './deleteBrewerySaga';
import getCommentsSaga from './getCommentsSaga';
import editBreweryDetailsSaga from './editBreweryDetailsSaga';
import searchBrewerySaga from './searchBrewerySaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    addBrewerySaga(),
    imageInfoSaga(),
    getImageSaga(),
    deleteBrewerySaga(),
    getCommentsSaga(),
    editBreweryDetailsSaga(),
    searchBrewerySaga(),
  ]);
}
