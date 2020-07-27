import axios from 'axios';

const BASE_URL = '/api';



export const fetchAllProducts = async () => {
    const request = await axios({
        url: `${BASE_URL}/all-products`,
        method: 'get'
    })

    if (request.data && request.data.result === "Success") {
        return request.data.data;
    } else {
        console.log('Error');
        if (request.data.result) {
            console.log(request.data.errors);
        } else {
           console.log("API connection error");
        }
    }
}

export const addProduct = async ({name, enabled, quantity, measurement}) => {
const addProductQuery = `
    mutation newProduct {
        createProduct(data: {
            name: "${name}",
            enabled: ${enabled},
            quantity: ${quantity},
            measurement: "${measurement}"
        }) {
            name,
            enabled,
            quantity,
            measurement
        }
    }
    `
    const request = await axios({
        url: BASE_URL,
        method: 'post',
        data: {
            query: addProductQuery
        },
        headers: {
            "authorization": "Basic "
        },
    })

    const data = request.data.data.createProduct;
    //console.log(request);

    if (data) {
        return data;
    } else {
        console.log('Error')
    }
}


export const deleteProduct = async (id) => {
    const deleteProductQuery = `
    mutation deleteProduct {
        deleteProduct(id: ${id}) {
            _id
        }
    }
    `
    const request = await axios({
        url: BASE_URL,
        method: 'post',
        data: {
            query: deleteProductQuery
        },
        headers: {
            "authorization": "Basic "
        },
    })

    const data = request.data;
    console.log(data);

    if (data.errors && data.errors.length < 1) {
        return data;
    } else {
        data.errors.map((error) => console.error(error.message));
        
    }
}

export const updateProduct = async ({id, name, enabled, quantity, measurement}) => {
    const updateProductQuery = `
        mutation updateProduct{
            updateProduct(id: ${id}, data: {
            name: "${name}", 
            enabled: ${enabled},
            quantity: ${quantity},
            measurement: "${measurement}"
        })
            {
            _id
            name
            enabled
            quantity
            measurement
            }
        }
    `
    const request = await axios({
        url: BASE_URL,
        method: 'post',
        data: {
            query: updateProductQuery
        },
        headers: {
            "authorization": "Basic "
        },
    })

    const data = request.data;
    console.log(data);
}

