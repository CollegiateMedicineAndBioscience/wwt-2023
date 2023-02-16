import { Outlet } from 'react-router-dom';
import { Box, Grid, Card, Typography, CardContent, Alert } from '@mui/material';

import Logo from '../assets/logo.png';
import Background from '../assets/background.jpg';

export default function FormLayout({ children, text, error, sx }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={0}
                alignItems='center'
                sx={{
                    height: '100vh',
                    backgroundImage: `url(${Background})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <Grid item md={1} />
                <Grid item md={5}>
                    <Card
                        sx={{
                            height: '80vh',
                            margin: '10vh 0',
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
                            <img src={Logo} alt='cc-logo' width='75%' height='auto' />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={5}>
                    <Card
                        sx={{
                            height: '80vh',
                            margin: '10vh 0',
                            padding: '2vh',
                            backgroundColor: 'main.main',
                            borderRadius: '0 1vh 1vh 0',
                        }}
                    >
                        <CardContent sx={{ ...sx, overflow: 'auto' }}>
                            {text && (
                                <Typography
                                    variant={text.variant || 'h6'}
                                    sx={{ margin: '1vh 0vh', fontWeight: 'bold' }}
                                >
                                    {text.text}
                                </Typography>
                            )}
                            {children}
                            <Outlet />
                            {error && <Alert severity='error'>{error}</Alert>}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={1} />
            </Grid>
        </Box>
    );
}
