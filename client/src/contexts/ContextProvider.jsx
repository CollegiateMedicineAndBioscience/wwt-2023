import { MessageProvider, UserProvider } from '.';

export default function ContextProvider({ children }) {
    return (
        <MessageProvider>
            <UserProvider>{children}</UserProvider>
        </MessageProvider>
    );
}
