import absencesAPIs from '../../apis/absencesAPIs';
import absencesActionTypes from '../actiontypes/absences-action-types';
import store from "../store";

const { dispatch } = store;
const getAbsences = (limit, page, status, startDate, endDate) => {
    dispatch({ type: absencesActionTypes.GET_ABSENCES_REQUEST });
    return absencesAPIs.fetchAbsences(limit, page, status, startDate, endDate).then((response) => {
        dispatch({ type: absencesActionTypes.GET_ABSENCES_SUCCESS, payload: response });
        return response;
    }).catch((error) => {
        dispatch({ type: absencesActionTypes.GET_ABSENCES_FAILURE, payload: error });
        throw error;
    });
}


const absencesActions = {
    getAbsences
}

export default absencesActions;