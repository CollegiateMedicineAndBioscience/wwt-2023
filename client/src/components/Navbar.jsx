import { Link } from 'react-router-dom';
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { Searchbar } from '../controllers';
import Logo from '../assets/logo.png';

export default function Navbar({ loggedIn, logout, userMenu }) {
    function NavbarControls() {
        return loggedIn ? (
            <>
                <Box sx={{ flexGrow: 0 }}>
                    <IconButton size='large' color='inherit' onClick={userMenu.handleOpen}>
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        sx={{ mt: '45px' }}
                        anchor={userMenu.anchor}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(userMenu.anchor)}
                        onClose={userMenu.handleClose}
                    >
                        <MenuItem onClick={userMenu.handleClose}>
                            <Link
                                style={{ textDecoration: 'none', color: 'black' }}
                                to='/inventory'
                            >
                                Your Inventory
                            </Link>
                        </MenuItem>

                        <MenuItem onClick={userMenu.handleClose}>
                            <Link
                                style={{ textDecoration: 'none', color: 'black' }}
                                to='/inventory'
                            >
                                Your Orders
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={userMenu.handleClose}>
                            <Link
                                style={{ textDecoration: 'none', color: 'black' }}
                                to='/inventory'
                            >
                                Account
                            </Link>
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                userMenu.handleClose();
                                logout();
                            }}
                        >
                            <Typography textAlign='center' sx={{ color: 'black' }}>
                                Logout
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </>
        ) : (
            <>
                <Button color='inherit' component={Link} to='/login'>
                    Login
                </Button>
                <Button color='inherit' component={Link} to='/register'>
                    Sign Up
                </Button>
            </>
        );
    }
    return (
        <AppBar position='static' color='main' sx={{ color: 'text.main' }}>
            <Toolbar>
                <IconButton component={Link} to='/' sx={{ margin: '0 1vw 0 0 ' }}>
                    <img src={Logo} alt='bdpa logo' width='40' height='40' />
                </IconButton>
                <Typography variant='h6' component='div'>
                    ClassroomCollective
                </Typography>
                <Searchbar />
                <Box sx={{ flexGrow: 1 }} />
                <NavbarControls />
            </Toolbar>
        </AppBar>
    );
}
