import { createContext, useContext, useState } from 'react';

export const MessageContext = createContext();

export default function MessageProvider({ children }) {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    return (
        <MessageContext.Provider value={{ error, setError, success, setSuccess }}>
            {children}
        </MessageContext.Provider>
    );
}

export const useMessage = () => useContext(MessageContext);
