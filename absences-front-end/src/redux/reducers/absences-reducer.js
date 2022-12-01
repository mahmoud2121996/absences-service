import absencesActionTypes from '../actiontypes/absences-action-types';

let initialState = {
    absencesList: [],
    total: 0,
    isLoading: true,
    isError: false,
};

const absencesReducer = function (state = initialState, action) {
    switch (action.type) {
        case absencesActionTypes.GET_ABSENCES_SUCCESS:
            return {
                ...state,
                absencesList: action.payload.data,
                total: action.payload.total,
                isLoading: false,
                isError: false,
            };
        case absencesActionTypes.GET_ABSENCES_REQUEST:
            return { ...state, isLoading: true };
        case absencesActionTypes.GET_ABSENCES_FAILURE:
            return { ...state, isLoading: false, isError: action.payload };
        default:
            return state;
    }
};

export default absencesReducer;
