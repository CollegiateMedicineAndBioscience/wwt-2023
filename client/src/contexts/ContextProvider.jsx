import { ErrorProvider, UserProvider } from '.';

export default function ContextProvider({ children }) {
    return (
        <ErrorProvider>
            <UserProvider>{children}</UserProvider>
        </ErrorProvider>
    );
}
