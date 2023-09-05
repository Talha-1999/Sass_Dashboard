import {
	AUTH_TOKEN,
	AUTHENTICATED,
	SHOW_AUTH_MESSAGE,
	HIDE_AUTH_MESSAGE,
	SIGNOUT_SUCCESS,
	SIGNUP_SUCCESS,
	SHOW_LOADING,
	SAVE_APPOINMENT,
	SAVE_PROFILE,
	SIGNIN_WITH_GOOGLE_AUTHENTICATED,
	SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
	SAVE_PACKAGES,
} from '../constants/Auth';

const initState = {
	profile: {},
	appointment: [],
	packages: [],
	loading: false,
	message: '',
	showMessage: false,
	redirect: '',
	token: localStorage.getItem(AUTH_TOKEN),
}

const auth = (state = initState, action) => {
	switch (action.type) {
		case AUTHENTICATED:
			const { access_token, user } = action.user
			return {
				...state,
				loading: false,
				redirect: '/',
				token: access_token,
				profile: user
			}
		case SHOW_AUTH_MESSAGE:
			return {
				...state,
				message: action.message,
				showMessage: true,
				loading: false
			}
		case HIDE_AUTH_MESSAGE:
			return {
				...state,
				message: '',
				showMessage: false,
			}
		case SIGNOUT_SUCCESS: {
			return {
				...state,
				token: null,
				redirect: '/',
				loading: false
			}
		}
		case SIGNUP_SUCCESS: {
			return {
				...state,
				loading: false,
				token: action.token
			}
		}
		case SHOW_LOADING: {
			return {
				...state,
				loading: action.loading
			}
		}
		case SIGNIN_WITH_GOOGLE_AUTHENTICATED: {
			return {
				...state,
				loading: false,
				token: action.token
			}
		}
		case SIGNIN_WITH_FACEBOOK_AUTHENTICATED: {
			return {
				...state,
				loading: false,
				token: action.token
			}
		}
		case SAVE_APPOINMENT: {
			return {
				...state,
				appointment: action.payload
			}
		}
		case SAVE_PROFILE: {
			return {
				...state,
				profile: action.payload
			}
		}
		case SAVE_PACKAGES: {
			return {
				...state,
				packages: action.payload
			}
		}
		default:
			return state;
	}
}

export default auth