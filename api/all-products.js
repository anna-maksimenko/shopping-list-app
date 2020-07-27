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
        return {result: "Success", data: modifiedData};
    } else {
        console.log('Error');
        console.log(request.data.errors.join(", "));
        return {result: "Error", errorMessage: request.data.errors.join(", ")};
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