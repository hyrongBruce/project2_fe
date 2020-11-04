import {updateObject} from '../utility';
import * as actions from '../actions/Index';

const initialState = {
    userInfo: {avatarlocation: 'avatar_def.png'}
};

const setUserInfo = (state,action) => {
    return updateObject(state, {userInfo: action.userInfo});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'user_set_info': 
            return setUserInfo(state,action);
        default:  
            return state;
    }
};

export default reducer;