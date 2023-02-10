import React from 'react';
import { Link } from 'react-router-dom';
import {
    Checkbox,
    FormControlLabel,
    Typography,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
} from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';

import { FormLayout } from '.';

function Login({ form, handleSubmit, handleChange, handleCheckboxChange, error }) {
    return (
        <FormLayout text='Login' error={error}>
            <form onSubmit={handleSubmit} sx={{ color: 'text.primary' }}>
                <FormControl variant='standard' fullWidth required sx={{ margin: '1vh' }}>
                    <TextField
                        required
                        id='email'
                        size='small'
                        label='Type your email'
                        onChange={handleChange}
                        value={form.email}
                        sx={{
                            input: {
                                background: '#D9D9D9',
                                color: 'red',
                            },
                        }}
                    />
                </FormControl>
                <FormControl variant='standard' fullWidth>
                    <TextField
                        required
                        id='password'
                        size='small'
                        label='Type your password'
                        onChange={handleChange}
                        value={form.password}
                        other={{ type: 'password' }}
                    />
                </FormControl>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <FormControlLabel
                        control={<Checkbox checked={form.remember} />}
                        labelPlacement='start'
                        label='Remember me'
                        name='remember'
                        onChange={handleCheckboxChange}
                    />
                </div>
                <Button color='primary' type='submit' variant='contained' fullWidth>
                    Login
                </Button>
                <Typography variant='body1'>
                    Dont have an account? <Link to='/register'>Register</Link>
                </Typography>
                <Typography variant='body1'>
                    Forgot your password? <Link to='/recover'>Recover Password</Link>
                </Typography>
            </form>
        </FormLayout>
    );
}

export default Login;
