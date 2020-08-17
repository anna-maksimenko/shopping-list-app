import axios from 'axios';

const BASE_URL = '/api';

function responseHandling(response) {
    console.log(response);
    if (response.data && response.data.result === "Success") {
        return response.data.data;
    } else {
        console.log('Error');
        if (response.data.result) {
            console.log(response.data.errors);
        } else {
            console.log("API connection error");
        }
    }
}

export const fetchAllProducts = async () => {
    const request = await axios({
        url: `${BASE_URL}/all-products`,
        method: 'get'
    })
    return responseHandling(request);
}

export const addProduct = async (productData) => {
    const request = await axios({
        url: `${BASE_URL}/product`,
        method: 'post',
        data: {
            action: "add",
            productData
        }
    })
    return responseHandling(request);
}

export const deleteProduct = async (id) => {
    const request = await axios({
        url: `${BASE_URL}/product`,
        method: 'post',
        data: {
            action: "delete",
            productData: {id}
        }
    })
    return responseHandling(request);
}

export const updateProduct = async (productData) => {
    const request = await axios({
        url: `${BASE_URL}/product`,
        method: 'post',
        data: {
            action: "update",
            productData: productData
        }
    })
    return responseHandling(request);
}

export const fetchAllMeasurements = async () => {
    const request = await axios({
        url: `${BASE_URL}/measurements`,
        method: 'get'
    })
    return responseHandling(request);
}