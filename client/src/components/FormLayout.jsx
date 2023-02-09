import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Grid, Card, Typography, CardContent, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Logo from '../assets/logo.png';

function FormLayout({ children, text, error }) {
    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={0}
                alignItems='center'
                sx={{ height: '100vh', backgroundColor: 'midtone.main' }}
            >
                <Grid item md={2} />
                <Grid item md={4}>
                    <Card
                        sx={{
                            height: '75vh',
                            margin: '12.5vh 0',
                            padding: '2vh',
                            textAlign: 'center',
                            backgroundColor: '#3F0071',
                            borderRadius: '1vh 0 0 1vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <CardContent>
                            <img src={Logo} alt='cc-logo' width='80%' height='auto' />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={4} sx={{ color: theme.palette.main.main }}>
                    <Card
                        sx={{
                            height: '75vh',
                            margin: '12.5vh 0',
                            padding: '2vh',
                            backgroundColor: 'main.main',
                            borderRadius: '0 1vh 1vh 0',
                        }}
                    >
                        <CardContent>
                            {text && (
                                <Typography
                                    variant='h6'
                                    sx={{ margin: '1vh 0vh', fontWeight: 'bold' }}
                                >
                                    {text}
                                </Typography>
                            )}
                            {children}
                            <Outlet />
                            {error && <Alert severity='error'>{error}</Alert>}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={2} />
            </Grid>
        </Box>
    );
}

export default FormLayout;
