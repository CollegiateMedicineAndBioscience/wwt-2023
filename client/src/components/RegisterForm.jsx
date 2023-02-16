import { Link } from 'react-router-dom';
import { Typography, Button, Box, Grid, MenuItem } from '@mui/material';

import { FormLayout, FormField } from '.';

export default function Register({ form, handleSubmit, handleChange, error, orgs }) {
    return (
        <FormLayout
            text={{ variant: 'h4', text: 'Sign-Up' }}
            error={error}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '0 2vw',
                color: 'text.main',
            }}
        >
            <form onSubmit={handleSubmit}>
                <Grid container columnSpacing={1} rowSpacing={0.5}>
                    <Grid item md={6}>
                        <FormField
                            name='firstName'
                            id='first-name'
                            label='First Name'
                            placeholder='Type your first name'
                            handleChange={handleChange}
                            value={form.firstName}
                            fullWidth
                            size='small'
                        />
                    </Grid>
                    <Grid item md={6}>
                        <FormField
                            name='lastName'
                            id='last-name'
                            label='Last Name'
                            placeholder='Type your last name'
                            handleChange={handleChange}
                            value={form.lastName}
                            fullWidth
                            size='small'
                        />
                    </Grid>
                    <Grid item md={12}>
                        <FormField
                            name='email'
                            id='email'
                            label='Email'
                            placeholder='Type your email'
                            handleChange={handleChange}
                            value={form.email}
                            fullWidth
                            size='small'
                        />
                    </Grid>
                    <Grid item md={12}>
                        <FormField
                            select
                            name='orgId'
                            id='orgId'
                            label='Organization / School Name'
                            handleChange={handleChange}
                            value={form.orgId}
                            fullWidth
                            size='small'
                        >
                            {orgs.map(({ id, name }) => (
                                <MenuItem key={id} value={id} sx={{ color: '#666666' }}>
                                    {name}
                                </MenuItem>
                            ))}
                        </FormField>
                    </Grid>

                    <Grid item md={6}>
                        <FormField
                            name='roomNumber'
                            id='room-number'
                            label='Room Number'
                            placeholder='Type your room #'
                            handleChange={handleChange}
                            value={form.roomNumber}
                            fullWidth
                            size='small'
                        />
                    </Grid>
                    <Grid item md={6}>
                        <FormField
                            name='phoneNumber'
                            id='phone-number'
                            label='Phone Number'
                            placeholder='Type your phone #'
                            handleChange={handleChange}
                            value={form.phoneNumber}
                            fullWidth
                            size='small'
                        />
                    </Grid>
                    <Grid item md={12}>
                        <FormField
                            name='password'
                            id='password'
                            label='Password'
                            placeholder='Type your password'
                            handleChange={handleChange}
                            value={form.password}
                            type='password'
                            fullWidth
                            size='small'
                        />
                    </Grid>
                    <Grid item md={12}>
                        <FormField
                            name='confirmPassword'
                            id='confirm-password'
                            label='Confirm Password'
                            placeholder='Type your password again'
                            handleChange={handleChange}
                            value={form.confirmPassword}
                            type='password'
                            fullWidth
                            size='small'
                        />
                    </Grid>
                </Grid>
                <Button
                    color='primary'
                    type='submit'
                    variant='contained'
                    fullWidth
                    sx={{ margin: '2vh 0' }}
                    disabled={form.password !== form.confirmPassword}
                >
                    Sign Up
                </Button>
            </form>
            <Box sx={{ height: '50vh' }} />
            <Typography variant='body1' alignSelf='flex-end'>
                Already have an account?{' '}
                <Link to='/login' style={{ color: '#D9D9D9' }}>
                    Login
                </Link>
            </Typography>
        </FormLayout>
    );
}
