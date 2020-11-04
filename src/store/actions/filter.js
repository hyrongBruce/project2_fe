
export const filterValueChange = (items, accid, innerid) => {
    return dispatch =>{
        dispatch({type: 'product_requesting'});
        
        dispatch({
            type: 'filter_value_change',
            sideitems: items
        });

        dispatch({
            type: 'product_filter',
            sideitems: items
        })
    }
}

export const filterReset = (items) => {
    return dispatch => {
        dispatch({
            type: 'filter_clear',
            sideitems: items
        });
        dispatch({
            type: 'product_filter_reset'
        });
    }
}