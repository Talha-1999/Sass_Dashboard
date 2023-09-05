import { combineReducers } from 'redux';
import Auth from './Auth';
import User from './UserState';
import Theme from './Theme';

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    user:User
});

export default reducers;