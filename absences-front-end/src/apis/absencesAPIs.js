import httpUtils from "../utils/httpUitls";



const ABSENCES_API_URL = `${process.env.REACT_APP_BACK_END_URL}/api/v1/absences`;

const fetchAbsences = (limit, page, status, startDate, endDate, url = ABSENCES_API_URL) => {
    const getAbsencesEndpoint = `${url}?limt=${limit}&page=${page}&status=${status}&startDate=${startDate}&endDate=${endDate}`;
    return httpUtils.get(getAbsencesEndpoint).then(response => response.json());
}


const absencesAPIs = {
    fetchAbsences
}

export default absencesAPIs;