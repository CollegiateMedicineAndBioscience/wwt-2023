import { Link } from 'react-router-dom';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';

import Logo from '../assets/logo.png';

export default function MobileNavbar({ loggedIn, logout, open, setOpen }) {
    function ControlButtons() {
        return loggedIn ? (
            <ListItem>
                <ListItemButton color='inherit' component={Link} to='/login' onClick={logout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </ListItemButton>
            </ListItem>
        ) : (
            <>
                <ListItem>
                    <ListItemButton color='inherit' component={Link} to='/login'>
                        <ListItemIcon>
                            <LoginIcon />
                        </ListItemIcon>
                        <ListItemText>Login</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton color='inherit' component={Link} to='/register'>
                        <ListItemIcon>
                            <AppRegistrationIcon />
                        </ListItemIcon>
                        <ListItemText>Register</ListItemText>
                    </ListItemButton>
                </ListItem>
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

                <Button color='inherit' onClick={setOpen}>
                    Menu
                </Button>
            </Toolbar>
            <Drawer anchor='right' open={open} onClose={setOpen}>
                <List>
                    <ControlButtons />
                </List>
            </Drawer>
        </AppBar>
    );
}
