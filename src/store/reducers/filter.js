import {updateObject} from '../utility';
import * as actions from '../actions/Index';

const initialState = {
    GeneralTypes: [
        'Product_Type',
        'Technical_Specifications',
        'Past_Selections'
    ],
    sideitems: {
        Product_Type:{
          ModelYear: {title: 'Model year', id:'modelyear', min:2000, max: 2050, step: 1, value: [2000,2050]}
        },
        Technical_Specifications:{
          Airflow: {title: 'Airflow', id:'airflow', unit: 'CFM', min: 2000, max: 10000, step: 1, value: [2000,10000]},
          MaxPower: {title: 'Max power', id:'powermax', unit: 'W', min: 9.84, max: 96.52, step: 0.01, value: [9.84,96.52]},
          SoundAtMaxSpeed: {title: 'Sound at max speed', id: 'soundmaxspeed', unit: 'dBA', min:20, max:80, step: 1, value: [20,80]},
          FanSweepDiameter: {title: 'Fan sweep diameter', id: 'fansweepdiameter' , unit: 'in', min: 18, max:96, step: 1, value: [18,96]},
        }
        ,
        Brand:{},
        Past_Selections:{
            Firm: {title: 'Firm', id:'firm', min:0, max:10, step: 1, value: [0,10]},
            Global: {title: 'Global', id: 'global',min:0, max: 1492, step: 1, value: [0,1492]}
        },
        Certifications:{}
    }
};

// const setUserInfo = (state,action) => {
//     return updateObject(state, {userInfo: action.userInfo});
// }

const filterValueChangeEnd = (state, action) => {
    console.log('slider value changed')
    return updateObject(state, {sideitems: action.sideitems});
}

const filterClear = (state,action) => {
    return updateObject(state,{sideitems: action.sideitems});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'filter_value_change': 
            return filterValueChangeEnd(state, action);
        case 'filter_clear':
            return filterClear(state, action);
        default:  
            return state;
    }
};

export default reducer;
