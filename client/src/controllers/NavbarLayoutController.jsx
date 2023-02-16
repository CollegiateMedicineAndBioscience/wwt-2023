import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

import { MobileNavbar, Navbar } from '../components';
import { lightTheme } from '../themes';

import { useMediaQuery } from '@mui/material';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../contexts';
import { logout } from '../services/userServices';

export default function NavbarLayoutController({ children }) {
    const navigate = useNavigate();
    const { loggedIn, setLoggedIn } = useUser();

    const [open, setOpen] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null);

    const openUserMenu = (event) => {
        setMenuAnchor(() => event.target);
    };

    const closeUserMenu = () => {
        setMenuAnchor(() => null);
    };

    const toggleOpen = () => setOpen((initial) => !initial);

    const sm = useMediaQuery((theme) => theme.breakpoints.only('sm'));
    const md = useMediaQuery((theme) => theme.breakpoints.only('md'));

    const logoutUser = async () => {
        await logout();

        Cookies.remove('token');
        setLoggedIn(() => false);

        navigate('/login');
    };

    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline enableColorScheme />
            <Helmet>
                <title>ClassroomCollective</title>
            </Helmet>
            <main>
                <Box sx={{ height: '100vh', backgroundColor: 'midtone.main' }} overflow='auto'>
                    {md || sm
                        ? Navbar({
                              logout: logoutUser,
                              loggedIn,
                              userMenu: {
                                  anchor: menuAnchor,
                                  handleOpen: openUserMenu,
                                  handleClose: closeUserMenu,
                              },
                              anchor: menuAnchor,
                          })
                        : MobileNavbar({
                              logout: logoutUser,
                              loggedIn,
                              open,
                              setOpen: toggleOpen,
                          })}

                    <Box>
                        <Outlet />
                        {children}
                    </Box>
                </Box>
            </main>
        </ThemeProvider>
    );
}
