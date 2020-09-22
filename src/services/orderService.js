import {} from '../api'
export const submitOrder = async(order) => {
    try {
        const { data } = await axios.get(url + '/users');

        return data;

    } catch (error) {
        
    }
}