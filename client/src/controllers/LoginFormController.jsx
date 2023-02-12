import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from '../components';
import { useError } from '../contexts';
import { login } from '../services/userServices';

export default function LoginFormController() {
    const navigate = useNavigate();
    const { error, setError } = useError();

    const [form, setForm] = useState({
        email: '',
        password: '',
        remember: false,
    });

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setForm((form) => {
            return { ...form, [name]: value };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await login(form);
            navigate('/');
        } catch (error) {
            const message = error.response.data;

            setError(() => message.error);
        }
    }

    return <LoginForm {...{ form, handleSubmit, handleChange, error }} />;
}
