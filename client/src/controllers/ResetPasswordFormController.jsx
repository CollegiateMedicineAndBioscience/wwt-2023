import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ResetPasswordForm } from '../components';
import { useMessage } from '../contexts';
import { resetPassword } from '../services/userServices';

export default function RequestPasswordResetFormController() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { error, setError } = useMessage();

    const [form, setForm] = useState({
        password: '',
        confirmPassword: '',
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

        const request = await resetPassword(id, { password: form.password });
        if (!request.success) {
            setError(request.error);
        } else {
            navigate('/');
        }
    }

    return <ResetPasswordForm {...{ form, handleSubmit, handleChange, error }} />;
}
