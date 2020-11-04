import {updateObject} from '../utility';
import * as actions from '../actions/Index';

const initialState = {
    token: null,
    userId: null,
    authRedirectPath: '/',
    logStatus: 'init',
    logo: 'no action',
    isAuthenticated: false,
    error: null
};


const authSuccess = (state,action) => {
    console.log('verifying success');
    
    localStorage.setItem('token',action.myToken);
    localStorage.setItem('userId',action.myId);
    return updateObject(state,{
        token: action.myToken,
        userId: action.myId,
        isAuthenticated: true,
        error: null
    });
}

const authFail = (state, action) =>{
    let failstate = 'fail';
    if(action.authmode==='signup')
        failstate = 'fail_signup';
    return updateObject(authLogOut(state,action),{
        logStatus: failstate,
        error: action.error
    });
}

const authLogOut = (state, action) => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    
    return updateObject(state, {
        logStatus: 'init',
        isAuthenticated: false,
        token: null,
        userId: null
    });
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        // case 'test_auth_reducer': 
        //     console.log('auth reducer triggered');
        //     return updateObject(state, {logo: 'auth triggered'});
        case 'auth_start':
            return updateObject(state, {logStatus: 'process'});
        case 'auth_success':
            return authSuccess(state,action);
        case 'auth_fail':
            return authFail(state,action);
        case 'auth_logout':
            return authLogOut(state,action);

        case 'test_get_all_users': 
            actions.getAllUsers();
            return state;
        default:  
            return state;
    }
};

export default reducer;