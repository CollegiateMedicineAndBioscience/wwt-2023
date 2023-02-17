import {
    Typography,
    Grid,
    Checkbox,
    FormControlLabel,
    TextField,
    Button,
    Alert,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { NavbarLayout, Item } from '../controllers';

export default function SearchPage({
    results,
    orgs,
    searchParams,
    handleAvailabilityChange,
    handleOrgChange,
    handleDateChange,
    applyFilters,
    success,
    error,
}) {
    return (
        <NavbarLayout>
            <Grid
                container
                columnSpacing={4}
                rowSpacing={2}
                sx={{ height: '100%', color: 'text.main', padding: '2vh 2vw' }}
            >
                <Grid item md={3}>
                    <Button
                        color='primary'
                        type='submit'
                        variant='contained'
                        fullWidth
                        onClick={applyFilters}
                    >
                        Apply Filters
                    </Button>
                    <hr />
                    <Typography variant='h6'>
                        <b>Availability</b>
                    </Typography>
                    <FormControlLabel
                        control={
                            <Checkbox
                                sx={{ color: 'text.main' }}
                                checked={searchParams.availableNow}
                                onChange={handleAvailabilityChange}
                            />
                        }
                        label='Available now'
                    />
                    <hr />
                    <Typography variant='h6'>
                        <b>Start Date</b>
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            name='startDate'
                            className='form-field'
                            value={searchParams.startDate}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                            onChange={(value) => handleDateChange({ startDate: value })}
                        />
                    </LocalizationProvider>
                    <Typography variant='h6'>
                        <b>End Date</b>
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            name='endDate'
                            className='form-field'
                            value={searchParams.endDate}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                            onChange={(value) => handleDateChange({ endDate: value })}
                        />
                    </LocalizationProvider>
                    <hr />
                    <Typography variant='h6'>
                        <b>Location</b>
                    </Typography>
                    {orgs.map((org) => (
                        <FormControlLabel
                            key={org.id}
                            control={<Checkbox sx={{ color: 'text.main' }} value={org.id} />}
                            checked={searchParams.location.includes(org.id)}
                            label={org.name}
                            onChange={handleOrgChange}
                        />
                    ))}
                </Grid>
                <Grid item md={9}>
                    {error && <Alert severity='error'>{error}</Alert>}
                    {success && <Alert severity='success'>{success}</Alert>}
                    <Typography>{results.length} result(s)</Typography>
                    <Typography variant='h5'>Results for "{searchParams.name}"</Typography>
                    {results.map((item) => (
                        <Item {...{ item, searchParams }} />
                    ))}
                </Grid>
            </Grid>
        </NavbarLayout>
    );
}
