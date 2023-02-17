import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from '../components';
import { useMessage } from '../contexts';
import { login } from '../services/userServices';

export default function LoginFormController() {
    const navigate = useNavigate();
    const { error, setError } = useMessage();

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

        const request = await login(form);
        if (!request.success) {
            setError(() => request.error);
        } else {
            navigate('/');
        }
    }

    return <LoginForm {...{ form, handleSubmit, handleChange, error }} />;
}
