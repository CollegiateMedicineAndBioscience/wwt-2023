import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { lightTheme } from '../themes';
import { MessageProvider, UserProvider } from '.';

export default function ContextProvider({ children }) {
    return (
        <main>
            <ThemeProvider theme={lightTheme}>
                <CssBaseline enableColorScheme />
                <Helmet>
                    <title>ClassroomCollective</title>
                </Helmet>
                <MessageProvider>
                    <UserProvider>
                        {children}
                        <Outlet />
                    </UserProvider>
                </MessageProvider>
            </ThemeProvider>
        </main>
    );
}
