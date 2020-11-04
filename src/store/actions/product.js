import Axios from "axios";

export const getProductList = () => {
    return dispatch =>{
        dispatch({type:'product_requesting'});
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId');

        let url = 'http://localhost:8080/product/getAll';
        let config = {
            headers: {
                Authorization: 'Bearer '+token,
            }
        }

        Axios.get(url,config).then(
            response => {
                dispatch({
                    type: 'product_received',
                    productList: response.data
                });
            }
        ).catch(
            err => console.log(err)
        );
    }
}

