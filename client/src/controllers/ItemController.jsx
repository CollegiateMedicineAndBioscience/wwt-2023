import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMessage } from '../contexts';
import { Item } from '../components';
import { createOrder } from '../services/orderServices';

export default function ItemController({ item, searchParams }) {
    const navigate = useNavigate();
    const { setError, setSuccess } = useMessage();
    const [quantity, setQuantity] = useState(0);

    function handleIncrease() {
        setQuantity((initial) => (initial + 1 > item.ids.length ? item.ids.length : initial + 1));
    }

    function handleDecrease() {
        setQuantity((initial) => (initial - 1 < 0 ? 0 : initial - 1));
    }

    function handleChange(e) {
        if (Number(e.target.value) > item.ids.length) {
            setQuantity(() => item.ids.length);
            return;
        }

        if (Number(e.target.value) < 0) {
            setQuantity(() => 0);
            return;
        }

        setQuantity(() => Number(e.target.value));
    }

    async function handlePlaceOrder() {
        const request = await createOrder({
            ids: item.ids.slice(0, quantity - 1),
            startDate: searchParams.startDate,
            endDate: searchParams.endDate,
        });

        if (!request.success) {
            setError(() => request.error);
        } else {
            navigate('/search');
            setSuccess('Your order was successfully created.');
        }
    }

    return (
        <Item
            {...{ item, quantity, handleIncrease, handleDecrease, handleChange, handlePlaceOrder }}
        />
    );
}
