import { POST, EDITOR, USER_DATA } from '../constants/UserState';

const initState = {
    editorValue: {},
    post: {}

}

const User = (state = initState, action) => {
    switch (action.type) {
        case EDITOR:
            return {
                ...state,
                editorValue: action.payload

            }
        case POST:
            return {
                ...state,
                post: action.payload
            }

        default:
            return state;
    }
}

export default User