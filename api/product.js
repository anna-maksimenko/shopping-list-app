import { MEASUREMENTS_ARRAY } from './_superConstants.js';
import {responseBuilder} from "./_api-helpers.js"

const axios = require('axios');

const BASE_URL = 'https://graphql.fauna.com/graphql';

const ACTION_MAPPING = {
    add: addProduct,
    update: updateProduct,
    delete: deleteProduct
};

const ERROR_MAPPING = {
    noprops: {
        text: "Missing request body or action type",
        code: 1
    },

    notCompleteProps: {
        text: "Incorrect property set for this type of action",
        code: 2
    }
}

async function addProduct({
    name,
    enabled,
    quantity,
    measurement
}){
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
            "authorization": `Basic ${process.env.DB_KEY}`
        }
    })

    return responseBuilder(request, (data) => {
        return data.data.createProduct;
    });

}

async function deleteProduct({id}){
    const deleteProductQuery = `
    mutation deleteProduct {
        deleteProduct(id: "${id}") {
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
            "authorization": `Basic ${process.env.DB_KEY}`
        }
    })

    return responseBuilder(request, (data) => {
        return data.data.deleteProduct;
    });
}

async function updateProduct({
    id,
    name,
    enabled,
    quantity,
    measurement
}){
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
            "authorization": `Basic ${process.env.DB_KEY}`
        },
    })

    return responseBuilder(request, (data) => {
        return data.data.updateProduct;
    });
}

function dataCheck(action, data) {
    let checkId = data.hasOwnProperty('id') && data.id.length > 0;
    let checkName = data.hasOwnProperty('name') && data.name.length > 0;
    let checkEnabled = data.hasOwnProperty('enabled') && typeof data.enabled === "boolean";
    let checkQuantity = data.hasOwnProperty('quantity') && typeof data.quantity === "number" && !isNaN(data.quantity) && data.quantity >= 0;
    let checkMeasurement = data.hasOwnProperty('measurement') && (MEASUREMENTS_ARRAY.map(measure => measure.name)).some(measure => measure === data.measurement);
    let checkPassed = false;

    switch (action) {
        case "add":
            checkPassed = checkName && checkEnabled && checkQuantity && checkMeasurement;
            console.log("checkPassed", data.name)
            break;
        case "update":
            checkPassed = checkId && checkName && checkEnabled && checkQuantity && checkMeasurement;
            break;
        case "delete":
            checkPassed = checkId;
            break;
        default:
            break;
    }
    return checkPassed;
}

module.exports = async (req, res) => {
    if (req.body && req.body.action && req.body.productData) {
        const action = req.body.action;
        const productData = req.body.productData;
        if (dataCheck(action, productData)) {
            const actionResult = await ACTION_MAPPING[action](productData);
            const response = actionResult;
            res.json(response);
        } else {
            console.log(`Error ${ERROR_MAPPING.notCompleteProps.code}`);
            console.log(ERROR_MAPPING.notCompleteProps.text);
            res.json({result: "Error", errors: [ERROR_MAPPING.notCompleteProps.text]});
        }

    } else{
        console.log(`Error ${ERROR_MAPPING.noprops.code}`);
        console.log(ERROR_MAPPING.noprops.text);
        res.json({result: "Error", errors: [ERROR_MAPPING.noprops.text]});
    }
}
