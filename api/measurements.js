    // const itemsMeasure = [
    //     {
    //         name: 'kilogram'
    //     },
    //     {
    //         name: 'liter'
    //     },
    //     {
    //         name: 'piece'
    //     }
    // ];

    import { MEASUREMENTS_ARRAY } from '../api/_superConstants.js';

    module.exports = async (req, res) => {
        let response = {
            result: "Success",
            // data: itemsMeasure
            data: MEASUREMENTS_ARRAY
        };
        res.json(response);
    }