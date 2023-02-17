import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UpdateUserForm } from '../components';
import { useMessage, useUser } from '../contexts';
import { getUser, updateUserDetails } from '../services/userServices';
import { getAllOrgs } from '../services/orgServices';

export default function UpdateUserFormController() {
    const navigate = useNavigate();
    const { loggedIn } = useUser();
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
        if (!loggedIn) {
            navigate('/login');
        }
    });

    useEffect(() => {
        async function getData() {
            const orgsReq = await getAllOrgs();
            if (!orgsReq.success) {
                setError(orgsReq.error);
            } else {
                setOrgs(orgsReq.organizations);
            }

            const userReq = await getUser();
            if (!userReq.success) {
                setError(userReq.error);
            } else {
                console.log(userReq);
                setForm((initial) => ({ ...initial, ...userReq.user }));
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
        const changes = Object.keys(filteredForm)
            .filter((_, value) => value !== '')
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

        const response = await updateUserDetails(changes);

        if (!response.success) {
            setError(response.error);
        } else {
            navigate('/');
        }
    }

    return <UpdateUserForm {...{ form, handleSubmit, handleChange, error, orgs }} />;
}
