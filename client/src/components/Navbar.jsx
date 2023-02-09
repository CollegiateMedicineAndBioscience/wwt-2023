import { Link } from 'react-router-dom';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';

import Logo from '../assets/logo.png';

export default function Navbar({ loggedIn, logout }) {
    function NavbarControls() {
        return loggedIn ? (
            <>
                <Button color='inherit' component={Link} to='/update'>
                    Orders
                </Button>
                <Button
                    color='inherit'
                    component={Link}
                    to='/login'
                    onClick={logout}
                    sx={{ margin: '0 1vh' }}
                >
                    Logout
                </Button>
            </>
        ) : (
            <>
                <Button color='inherit' component={Link} to='/login'>
                    Login
                </Button>
                <Button color='inherit' component={Link} to='/register'>
                    Register
                </Button>
            </>
        );
    }
    return (
        <AppBar position='static' color='main'>
            <Toolbar>
                <IconButton component={Link} to='/' sx={{ margin: '0 1vw 0 0 ' }}>
                    <img src={Logo} alt='bdpa logo' width='40' height='40' />
                </IconButton>
                <Typography variant='h6' component='div'>
                    ClassroomCollective
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <NavbarControls />
            </Toolbar>
        </AppBar>
    );
}
