import { POST ,EDITOR} from '../constants/UserState';

export const postEditor = (user) => {
    return {
        type: EDITOR,
        payload: user
    }
};

export const SubmitEditor = (data) => {
    return {
        type: POST,
        payload: data
    }
};
