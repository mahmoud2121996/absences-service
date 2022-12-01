import * as React from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';
import { absencesStatus } from '../../constants/AbsencesConstants';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';

function AbsenceFilters({ absencesProprties, setAbsencesProprties, fetchAbsences, totalNumberOfAbsences }) {

    const clearFilters = () => {
        setAbsencesProprties({
            limit: 10,
            page: 1,
            status: "",
            startDate: null,
            endDate: null,
            showModal: false,
            selectedAbsence: null,
        });
    }


    return (

        <Grid container direction="row" spacing={2} data-testid="absences-filters">
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        data-testId="absences-filters-status-menu"
                        value={absencesProprties.status}
                        label="Status"
                        onChange={(e) => {
                            setAbsencesProprties({
                                ...absencesProprties, status: e.target.value
                            });
                        }}
                    >
                        {absencesStatus.map((status) => {
                            return (
                                <MenuItem value={status} key={uuidv4()}>
                                    {status}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={4}>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    localeText={{ start: 'start', end: 'end' }}
                >
                    <DateRangePicker
                        value={[absencesProprties.startDate, absencesProprties.endDate]}
                        onChange={(newValue) => {
                            setAbsencesProprties({
                                ...absencesProprties, startDate: newValue[0].$d, endDate: newValue[1].$d
                            });
                        }}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} data-testId="absences-filters-date-picker-start" />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps}  data-testId="absences-filters-date-picker-end"/>
                            </React.Fragment>
                        )}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid container item xs={4} spacing={2} alignContent="center">
                <Grid item xs={5}>
                    <Button variant="contained" onClick={() => {
                        fetchAbsences(absencesProprties);
                    }}>Search</Button>
                </Grid>
                <Grid item xs={5}>
                    <Button variant="contained" onClick={clearFilters}>Clear Filters</Button>
                </Grid>
                <Grid item xs={2} margin="auto">
                    Total: {totalNumberOfAbsences}
                </Grid>
            </Grid>
        </Grid>

    );
}

export default AbsenceFilters;