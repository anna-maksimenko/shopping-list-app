const axios = require('axios')

import { NowRequest, NowResponse } from '@vercel/node'

const BASE_URL = 'https://graphql.fauna.com/graphql';

const fetchAllProductsQuery = `
{
  allProducts {
    data {
        _id,
        name
        enabled
        quantity
        measurement
    }
  }
}
`;

const addProductQuery = `
mutation newProduct {
    createProduct(data: {
        name: "carrot",
        enabled: true,
        quantity: 2,
        measurement: "kilogram"
    }) {
        _id,
        name,
        enabled,
        quantity,
        measurement
    }
}
`

const fetchAllProducts = async () => {
    const request = await axios({
        url: BASE_URL,
        method: 'post',
        data: {
            query: fetchAllProductsQuery
        },
        headers: {
            "authorization": "Basic "
        },
    })

    const data = request.data.data.allProducts.data;

    if (data) {
        var modifiedData = data.map(function (product) {
            return Object.assign(product, {
                id: product._id
            })
        });
        return modifiedData;
    } else {
        console.log('Error')
    }
}

const addProduct = async ({
    name,
    enabled,
    quantity,
    measurement
}) => {
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

    if (data) {
        return data;
    } else {
        console.log('Error')
    }
}


const deleteProduct = async (id) => {
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

const updateProduct = async ({
    id,
    name,
    enabled,
    quantity,
    measurement
}) => {
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

export default (req: NowRequest, res: NowResponse) => {
    res.json({
        name: 'John',
        email: 'john@example.com'
    })
}
