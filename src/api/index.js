import axios from 'axios';

const url = 'http://localhost:5000';

export const fetchUsersApi = async() => {
    try {
        const { data } = await axios.get(url + '/users');

        return data;

    } catch (error) {
        
    }
}

export const deleteUserApi = async (id) => {
    try {
        const { data } = await axios.delete(url + `/users/${id}`);

        return data;

    } catch (error) {
        
    }
}

export const createUserApi = async (firstName, lastName, email, password) => {
    try {
        const { data } = await axios.post(url + '/users', {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        });
        
        return data;
        
    } catch (error) {
        
    }
}

export const loginApi = async (email, password) => {
    try {
        const { data } = await axios.post(url + '/users/login', {
            email: email,
            password: password,
        }, {
            withCredentials: true
        })

        return data;
    } catch (error) {
        
    }
} 

export const getUserApi = async () => {
    try {
        const { data } = await axios.get(url + '/user', {
            withCredentials: true
        })

        return data;
    } catch (error) {
        
    }
} 

export const getProductsApi = async () => {
    try {
        const { data } = await axios.get(url + '/products', {
            withCredentials: true
        });

        return data;
    } catch (error) {
        
    }
}