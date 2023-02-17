import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RequestPasswordResetForm } from '../components';
import { useMessage } from '../contexts';
import { requestPasswordReset } from '../services/userServices';

export default function RequestPasswordResetFormController() {
    const navigate = useNavigate();
    const { error, setError } = useMessage();

    const [form, setForm] = useState({
        email: '',
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

        const request = await requestPasswordReset(form);
        if (!request.success) {
            setError(request.error);
        } else {
            navigate('/');
        }
    }

    return <RequestPasswordResetForm {...{ form, handleSubmit, handleChange, error }} />;
}
