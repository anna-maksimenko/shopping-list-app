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

    if (!request.data.errors || request.data.errors.length < 1) {
        const data = request.data.data.allProducts.data;
        const modifiedData = data.map(function (product) {
            return Object.assign(product, {
                id: product._id
            })
        });
        return {result: "Success", data: modifiedData};
    } else {
        console.log('Error');
        console.log(request.data.errors);
        return {result: "Error", errors: request.data.errors};
    }
}

module.exports = async (req, res) => {
    const allProducts = await fetchAllProducts();
    let response = allProducts;
    if (allProducts.result === "Error") {
        console.log('Database error');
    }
    res.json(response);
}