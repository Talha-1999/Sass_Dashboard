import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
	AUTH_TOKEN,
	SIGNIN,
	SIGNOUT,
	SIGNUP,
	SIGNIN_WITH_GOOGLE,
	SIGNIN_WITH_FACEBOOK
} from '../constants/Auth';
import {
	showAuthMessage,
	authenticated,
	signOutSuccess,
	signUpSuccess,
	signInWithGoogleAuthenticated,
	signInWithFacebookAuthenticated,
	showLoading,
} from "../actions/Auth";

import { BASE_URL } from 'redux/store/baseUrl';
import FirebaseService from 'services/FirebaseService'
import axios from 'axios';
import { message } from 'antd';
import { LOAD_SELECTED_THEME } from 'redux/constants/Profile';

export function* loadSelectedTheme() {
	yield takeEvery(LOAD_SELECTED_THEME, function* (data) {
		try {
            console.log('laksndklajsd',data)
            let selectedThemeId = localStorage.getItem('selected_theme_id')
			const users = yield call(axios.post, `${BASE_URL}/themes/get-string/${selectedThemeId}`, payload);
			const { access_token, user } = users.data
			// if (access_token && user.id) {
			// 	message.success("Login Successfully")
			// 	//localStorage.setItem(AUTH_TOKEN, access_token);
			// 	yield put(authenticated(users.data))
			// }
		} catch (err) {


		}
	});
}

export default function* rootSaga() {
	yield all([
		fork(loadSelectedTheme),
	]);
}