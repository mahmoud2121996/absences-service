import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AbsencesTableHeaderItmes } from '../../constants/AbsencesConstants';
import { getNumberOfDays } from '../../utils/absencesUtils';
import moment from "moment";
import ICalendarLink from "react-icalendar-link";
import AbsenceModal from '../AbsenceModal/AbsenceModal';
import { v4 as uuidv4 } from 'uuid';

function AbsencesTable({ absencesList }) {

    const createCalendarEvent = (absence) => ({
        title: "Leave Request",
        description: `${absence.member.name} wants a ${absence.type} leave`,
        startTime: absence.startDate,
        endTime: absence.endDate,
    });

    const renderTableHeader = (AbsencesTableHeaderCellNames) => {
        return (
            <TableHead data-testid="absences-table-header">
                <TableRow>
                    {
                        AbsencesTableHeaderCellNames.map((item, index) => {
                            return (
                                <TableCell key={`${uuidv4()}-key`}>{item}</TableCell>
                            );
                        })
                    }
                </TableRow>
            </TableHead>
        );
    }



    const renderTableBody = (tableAbsencesList) => {
        return (
            <TableBody>
                {tableAbsencesList.map((item) => (
                    <TableRow
                        key={item.id}
                    >
                        <TableCell key={`${item.id}-member-name`}>
                            {item.member.name}
                        </TableCell>
                        <TableCell key={`${item.id}-type`}>
                            {item.type}
                        </TableCell>
                        <TableCell key={`${item.id}-period`}>
                            {`${getNumberOfDays(moment(item.startDate), moment(item.endDate))} DAYS`}
                        </TableCell>
                        <TableCell key={`${item.id}-mebmer-note`}>
                            <AbsenceModal
                                buttonText="View Member Note"
                                modalText={item.memberNote || '-'}
                                modalTitle={"Member Note"}
                            />
                        </TableCell>
                        <TableCell key={`${item.id}-status`}>
                            {item.status}
                        </TableCell>
                        <TableCell key={`${item.id}-admitter-note`}>
                            <AbsenceModal
                                buttonText="View Admitter Note"
                                modalText={item.admitterNote || '-'}
                                modalTitle={"Admitter Note"}
                            />
                        </TableCell>
                        <TableCell key={`${item.id}-Ical-download`}>
                            <ICalendarLink event={createCalendarEvent(item)}>
                                Download
                            </ICalendarLink>
                        </TableCell>
                    </TableRow>)
                )
                }
            </TableBody >
        );
    }

    return (
        <TableContainer component={Paper} data-testid="absences-table">
            <Table size="small" aria-label="a dense table">
                {renderTableHeader(AbsencesTableHeaderItmes)}
                {renderTableBody(absencesList)}
            </Table>
        </TableContainer>
    );
}

export default AbsencesTable;