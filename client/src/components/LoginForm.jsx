import { Link } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

import { FormLayout, FormField } from '.';

export default function Login({ form, handleSubmit, handleChange, error }) {
    return (
        <FormLayout
            text={{ variant: 'h4', text: 'Login' }}
            error={error}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '10%',
                color: 'text.main',
            }}
        >
            <form onSubmit={handleSubmit} sx={{ color: 'text.main' }}>
                <FormField
                    name='email'
                    id='email'
                    label='Email'
                    placeholder='Type your email'
                    icon={AccountCircle}
                    handleChange={handleChange}
                    value={form.email}
                    fullWidth
                    size='small'
                    sx={{ margin: '2vh 0' }}
                />
                <FormField
                    name='password'
                    id='password'
                    label='Password'
                    placeholder='Type your password'
                    icon={LockIcon}
                    handleChange={handleChange}
                    value={form.password}
                    type='password'
                    fullWidth
                    size='small'
                    sx={{ margin: '0.5vh 0' }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant='body1' sx={{ color: 'form' }}>
                        <Link to='/recover' style={{ textDecoration: 'none', color: '#D9D9D9' }}>
                            Forgot Password?
                        </Link>
                    </Typography>
                </Box>
                <Button
                    color='primary'
                    type='submit'
                    variant='contained'
                    fullWidth
                    sx={{ margin: '3vh 0' }}
                >
                    Login
                </Button>
            </form>
            <Box sx={{ height: '50vh' }} />
            <Typography variant='body1' alignSelf='flex-end'>
                Dont have an account?{' '}
                <Link to='/register' style={{ color: '#D9D9D9' }}>
                    Sign Up
                </Link>
            </Typography>
        </FormLayout>
    );
}
