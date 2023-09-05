import { AUTH_TOKEN } from 'redux/constants/Auth';
import { LOAD_SELECTED_THEME } from 'redux/constants/Profile';

const initState = {
    loading: false,
    message: '',
    showMessage: false,
    redirect: '',
    token: localStorage.getItem(AUTH_TOKEN),
}

const Profile = (state = initState, action) => {
    switch (action.type) {
        case LOAD_SELECTED_THEME:
            return {
                ...state,
                loading: false,
                //redirect: '/',
                token: action.token
            }
        default:
            return state;
    }
}

export default Profile