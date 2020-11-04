import axios from 'axios';

export const getAllUsers = ()=>{

    let token = localStorage.getItem('token');
    let url = 'http://localhost:8080/user/getAll';
    let config = {
        headers: {
            Authorization: 'Bearer '+token,
        }
    }
    
    axios.get(url,config).then(
        response => console.log(response)
    ).catch(
        err => console.log(err)
    );
}

export const getUserInfo = () => {
    return dispatch =>{
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId');

        let url = 'http://localhost:8080/user/getUserById?' + 'userId=' + userId;
        let config = {
            headers: {
                Authorization: 'Bearer '+token,
            }
        }
        axios.get(url,config).then(
            response => {
                dispatch({
                    type: 'user_set_info',
                    userInfo: response.data
                });
            }
        ).catch(
            err => console.log(err)
        );
    }
}