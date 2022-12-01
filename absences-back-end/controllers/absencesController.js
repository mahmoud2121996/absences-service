import { absences, members } from "../api/api";
import { getMembersObj, setAbsencesStatus, filterAbsences } from "../utils/absencesUtils";

export const getAbsences = async (req, res) => {
    const {
        limit = 10,
        page = 1,
        status = "",
        startDate = null,
        endDate = null,
    } = req.query;

    const membersData = await members();
    let absenceData = await absences();
    const memberObj = getMembersObj(membersData);
    absenceData = setAbsencesStatus(absenceData, memberObj);

    absenceData = filterAbsences(status, startDate, endDate, absenceData);


    const total = absenceData.length;
    const start = (page - 1) * limit;
    const end = page * limit;
    
    absenceData = absenceData.slice(start, end);

    res.send({ total: total, data: absenceData });

}
