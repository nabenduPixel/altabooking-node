

const searchRequest = (data) => {
    const requestBody = {
        filters: [{
            searchFilterItems: [{
                "type": "destination",
                "value": data.destination
            }
            ]
        }
        ],
        from: data.start_date,
        to: data.end_date,
        paxes: data.paxes,
        language: "en",
        pagination: {
            "itemsPerPage":5 ,
            // "itemsPerPage": 100,
            "page": 1
        },
        order: "DEFAULT"

    }
    return requestBody;
}


const detailsRequest = (data) => {
    const requestBody = {
        code: data.code,
        from: data.start_date,
        to: data.end_date,
        paxes: data.paxes,
        language: "en"

    }
    return requestBody;
}

const getActivity = async (payload) => {
    const hotelBedsActivityService = require('../services/hotelBedsActivity.service');
    const response = await hotelBedsActivityService.getAvailability(payload);
    return response;
}


const getActivityDetail = async (payload) => {
    const hotelBedsActivityService = require('../services/hotelBedsActivity.service');
    const response = await hotelBedsActivityService.getActivityDetails(payload);
    return response;
}


module.exports = { searchRequest, getActivity, detailsRequest,getActivityDetail };