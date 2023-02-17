import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const MessageContext = createContext();

export default function MessageProvider({ children }) {
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setError(() => '');
        setSuccess(() => '');
    }, [navigate]);

    return (
        <MessageContext.Provider value={{ error, setError, success, setSuccess }}>
            {children}
        </MessageContext.Provider>
    );
}

export const useMessage = () => useContext(MessageContext);
