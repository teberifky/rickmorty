const initialState = {
    data: [],
    loading: false,
}

const characterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_CHARACTERS':
            return {
                ...state,
                loading: true,
            }
        case 'SUCCESSED_CHARACTERS':
            console.log(state);
            console.log(action.payload.data);
            return {
                ...state,
                loading: false,
                data: [
                    ...state.data,
                    ...action.payload.data
                ],
            }
        case 'FAILED_CHARACTERS':
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default characterReducer