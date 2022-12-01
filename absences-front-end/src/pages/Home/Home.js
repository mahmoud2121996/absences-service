import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AbsencesTable from "../../components/absencesTable/AbsencesTable";
import absencesActions from '../../redux/actions/absences-actions';
import Pagination from '@mui/material/Pagination';
import AbsenceFilters from '../../components/AbsenceFilters/AbsenceFilters'
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';


function Home() {
    const { absencesList, total, isLoading, isError } = useSelector(
        (state) => state.absences
    );

    const [absencesProprties, setAbsencesProprties] = useState({
        limit: 10,
        page: 1,
        status: "",
        startDate: null,
        endDate: null,
        showModal: false,
        selectedAbsence: null,
    });

    const fetchAbsences = (absencesProprtiesObj) => {
        absencesActions.getAbsences(
            absencesProprtiesObj.limit,
            absencesProprtiesObj.page,
            absencesProprtiesObj.status,
            absencesProprtiesObj.startDate ? absencesProprtiesObj.startDate.getTime() : '',
            absencesProprtiesObj.endDate ? absencesProprtiesObj.endDate.getTime() : ''
        );
    }

    useEffect(() => {
        fetchAbsences(absencesProprties);
    }, [absencesProprties.page]);

    const renderAbsencesDashBoardBody = () => {
        if (!isLoading && !isError && absencesList.length > 0) {
            return (
                <>

                    <Grid item>
                        <AbsencesTable
                            absencesList={absencesList}
                        />
                    </Grid>
                    <Grid item margin="auto">
                        <Pagination
                            data-testid="absences-Pagination"
                            count={Math.ceil(total / absencesProprties.limit)}
                            variant="outlined"
                            onChange={(e, val) => {
                                setAbsencesProprties({
                                    ...absencesProprties, page: val
                                });
                            }}
                            defaultPage={absencesProprties.page}
                        />

                    </Grid>
                </>
            );
        }
    }

    const renderAbsencesDashBoard = () => {
        if (isLoading) {
            return (
                <Grid container justifyContent="center" mt="2rem">
                    <CircularProgress size="10rem" />
                </Grid>
            );
        }
        if (isError) {
            return (
                <Grid container justifyContent="center" mt="2rem">
                    <Alert severity="error">Error...Failed To Fetch Absences Data</Alert>
                </Grid>
            );
        }
        if (absencesList.length === 0) {
            return (
                <Grid container justifyContent="center" mt="2rem">
                    <Alert severity="info">No Absences to Show</Alert>
                </Grid>
            );
        }
    }

    return (
        < Grid container direction="column" spacing={2} >
            <Grid item>
                <Typography variant="h2" align="center" margin="0.5rem">
                    Absences Dashboard
                </Typography>
            </Grid>
            <Grid item>
                <AbsenceFilters
                    absencesProprties={absencesProprties}
                    setAbsencesProprties={setAbsencesProprties}
                    fetchAbsences={fetchAbsences}
                    totalNumberOfAbsences={total}
                />
            </Grid>
            {renderAbsencesDashBoard()}
            {renderAbsencesDashBoardBody()}
        </Grid >

    );
}

export default Home;