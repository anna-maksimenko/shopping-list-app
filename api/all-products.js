import {responseBuilder} from "./_api-helpers.js"

const axios = require('axios');

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

const fetchAllProducts = async () => {
    const request = await axios({
        url: BASE_URL,
        method: 'post',
        data: {
            query: fetchAllProductsQuery
        },
        headers: {
            "authorization": `Basic ${process.env.DB_KEY}`
        },
    })


    return responseBuilder(request, (data) => {
        const dataRoot = data.data.allProducts.data;
        return dataRoot.map(function (product) {
            return Object.assign(product, {
                id: product._id
            })
        });
    })
}

module.exports = async (req, res) => {
    const allProducts = await fetchAllProducts();
    let response = allProducts;
    if (allProducts.result === "Error") {
        console.log('Database error');
    }
    res.json(response);
}