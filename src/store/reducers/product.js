import {updateObject} from '../utility';
import * as actions from '../actions/Index';

const initialState = {
    productList: [],
    displayedProductList: [],
    displayedProductListAfterSearch: [],
    productCompareProp: {
        DESCRIPTION:[
            {display: 'Manufacturer', id: 'manufacturer'},
            {display: 'Series', id: 'series'},
            {display: 'Model', id: 'model'}
        ],
        TYPE:[
            {display: 'Use Type', id: 'usetype'},
            {display: 'Application', id: 'application'},
            {display: 'Mounting Location', id: 'mountinglocation'},
            {display: 'Accessories', id: 'accessories'},
            {display: 'Model year', id: 'modelyear'}
        ],
        TECHNICAL_SPECIFICATIONS:[
            {display: 'Airflow (CFM)', id: 'airflow'},
            {display: 'Power (W)', range: true, id: 'power'},
            {display: 'Operating voltage (VAC)', range: true, id: 'operatingvoltage'},
            {display: 'Fan speed (RPM)', range:true, id: 'fanspeed'}
        ]
    },
    //???
    comparedProductId: [],
    receiveState: 'init',
    searchString: null,
    selectedProductId: [],
};


const inRequesting = (state, action) => {
    return updateObject(state, {
        receiveState: 'process',
    });
}

const ReceiveSuccess = (state, action) => {
    console.log(action.productList);
    return updateObject(state, {
        receiveState: 'success',
        productList: action.productList, 
        displayedProductList: action.productList,
        displayedProductListAfterSearch: action.productList
    });
}

const FilterCheck = (value, limits) => {
    let realvalue = parseFloat(value);
    let reallimits = [];
    for(let lim of limits)
        reallimits.push(parseFloat(lim));
    if(value>=limits[0] && value<=limits[1]){
        return true;
    }else{
        return false;
    }
}

const SearchCheck = (prod, pattern) => {
    let is_select = false;
    if(prod.productname.toLowerCase().match(pattern.toLowerCase()))
        is_select = is_select || true;
    if(prod.model.toLowerCase().match(pattern.toLowerCase()))
        is_select = is_select || true;
    if(prod.series.toLowerCase().match(pattern.toLowerCase()))
        is_select = is_select || true;
    if(prod.manufacturer.toLowerCase().match(pattern.toLowerCase()))
        is_select = is_select || true;
    return is_select;
}

const FilterProductByFilter = (productList, items) => {
    let displayed = [];
    for(let i=0;i<productList.length; i++){
        let curproduct = productList[i];
        let is_select = true;
        for(let key in items){
            if(!is_select)break;
            for(let key_item in items[key]){
                is_select = is_select && 
                    FilterCheck(
                        curproduct[items[key][key_item].id],
                        items[key][key_item].value
                    );
            }
        }
        if(is_select)
            displayed.push(curproduct);
    }
    console.log(displayed);
    return displayed;
}

const FilterProductBySearch = (listToSearch, searchString) => {
    let items = searchString;

    let displayed = [];
    if(items && items.length>0){
        for(let prod of listToSearch){
            let is_select = SearchCheck(prod, items);
            
            if(is_select)
                displayed.push(prod);
        }
    }
    else{
        displayed = listToSearch;
    }
    console.log(displayed);

    return displayed;
}


const changeCompareList = (state, action) => {
    let selected = [...state.comparedProductId];
    let foundpid = selected.find(id => id === action.productid);
    if(!foundpid){
        console.log('added');
        selected.push(action.productid);
    } else {
        console.log('removed');
        selected = selected.filter(pid => pid !== action.productid);
    }
    return updateObject(state,{comparedProductId: selected});
}



const reducer = (state = initialState, action) => {
    let searchdisplayed=[];
    let displayed=[];

    switch(action.type) {
        case 'product_requesting':
            return inRequesting(state,action);
        case 'product_received': 
            return ReceiveSuccess(state, action);
        case 'product_filter': 
            console.log('product_filter...');
            console.log(action.searchString);

            displayed = FilterProductByFilter(state.productList, action.sideitems);
            
            if(state.searchString && state.searchString.length>0){
                searchdisplayed = FilterProductBySearch(displayed, state.searchString);
            }
            else{
                searchdisplayed = displayed;
            }
            return updateObject(state, {
                receiveState: 'success',
                displayedProductList: displayed,
                displayedProductListAfterSearch: searchdisplayed,
            });
        case 'product_search':
            console.log('product_search...');
            console.log(action.searchString);

            searchdisplayed = FilterProductBySearch(state.displayedProductList, action.searchString);
            return updateObject(state, {
                receiveState: 'success',
                displayedProductListAfterSearch: searchdisplayed,
                searchString: action.searchString
            });
        case 'product_filter_reset':
            if(state.searchString && state.searchString.length>0){
                searchdisplayed = FilterProductBySearch(state.productList, state.searchString);                
            }else{
                searchdisplayed = state.productList;
                console.log('reset_without search');
            }
            return updateObject(state,{
                displayedProductList: state.productList, 
                displayedProductListAfterSearch: searchdisplayed,
            });
        case 'product_compare_change':
            return changeCompareList(state, action);
        default:  
            return state;
    }
};

export default reducer;
