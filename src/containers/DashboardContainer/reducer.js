import { GET_WEATHER_DATA_REQUEST, GET_WEATHER_DATA_SUCCESS } from "./constant"


const initialState = {
    data : {}
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_WEATHER_DATA_REQUEST:
            return {
                ...state
            };
        case GET_WEATHER_DATA_SUCCESS: 
            return {
                ...state,
                data: { ...payload }
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer;