    export const responseBuilder = function (request, dataCallback) {
        if (!request.data.errors || request.data.errors.length < 1) {
           const modifiedData = dataCallback(request.data);
            return {
                result: "Success",
                data: modifiedData
            };
        } else {
            console.log('Error');
            console.log(request.data.errors);
            return {
                result: "Error",
                errors: request.data.errors
            };
        }
    }


    
