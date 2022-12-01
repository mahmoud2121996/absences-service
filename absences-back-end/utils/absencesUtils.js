import { absencesStatus } from "../constants/absencesConstants";

export const getMembersObj = (members) => {
    const membersObj = {};
    members.forEach((member) => {
        membersObj[member.userId] = member;
    });
    return membersObj;
}

export const setAbsencesStatus = (absences, membersObj) => {
    const updatedAbsences = absences.map((abs) => {
        let absenceStatusValue = absencesStatus.REQUESTED;
        if (abs.confirmedAt) {
            absenceStatusValue = absencesStatus.CONFIRMED;
        }
        if (abs.rejectedAt) {
            absenceStatusValue = absencesStatus.REJECTED;
        }
        return { ...abs, status: absenceStatusValue, member: membersObj[abs.userId] }
    });

    return updatedAbsences;
}

export const filterAbsences = (status, startDate, endDate, absenceData) => {
    if (status) {
        absenceData = absenceData.filter((item) => {
            return item.status === status;
        });
    }

    if (startDate) {
        absenceData = absenceData.filter((item) => {
            return new Date(item.startDate) >= new Date(parseInt(startDate));
        });
    }


    if (endDate) {
        absenceData = absenceData.filter((item) => {
            return new Date(item.endDate) <= new Date(parseInt(endDate));
        });
    }
    return absenceData;
}


// const absencesutils = {
//     getMembersObj,
//     setAbsencesStatus
// };

// export default absencesutils;