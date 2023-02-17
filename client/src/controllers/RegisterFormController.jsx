import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RegisterForm } from '../components';
import { useMessage } from '../contexts';
import { register } from '../services/userServices';
import { getAllOrgs } from '../services/orgServices';

export default function RegisterFormController() {
    const navigate = useNavigate();
    const { error, setError } = useMessage();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        orgId: '',
        roomNumber: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });

    const [orgs, setOrgs] = useState([]);

    useEffect(() => {
        async function getData() {
            const response = await getAllOrgs();
            if (!response.success) {
                setError(response.error);
            } else {
                setOrgs(response.organizations);
            }
        }

        getData();
    }, [setError]);

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setForm((form) => {
            return { ...form, [name]: value };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const { confirmPassword, ...filteredForm } = form;

        const response = await register(filteredForm);
        if (!response.success) {
            setError(response.error);
        } else {
            navigate('/login');
        }
    }

    return <RegisterForm {...{ form, handleSubmit, handleChange, error, orgs }} />;
}
