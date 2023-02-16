import { useReducer, useState, useEffect } from 'react';

import { SearchPage } from '../components';
import { useError } from '../contexts';
import { getAllOrgs } from '../services/orgServices';

export default function SearchPageController() {
    const { error, setError } = useError();

    const [searchParams, dispatchSearchParams] = useReducer(
        (state, action) => {
            switch (action.type) {
                case 'availabilityChange':
                    const date = new Date();

                    return state.availableNow
                        ? {
                              ...state,
                              startDate: '',
                              endDate: '',
                              availableNow: false,
                          }
                        : {
                              ...state,
                              startDate: new Date(),
                              endDate: date.setDate(date.getDate() + 7),
                              availableNow: true,
                          };
                case 'locationChange':
                    console.log(state.location);

                    if (action.value.check) {
                        return {
                            ...state,
                            location: [...state.location, action.value.id],
                        };
                    } else {
                        return {
                            ...state,
                            location: state.location.filter((loc) => loc !== action.value.id),
                        };
                    }
                default:
                    return { ...state, ...action.value };
            }
        },
        {
            availableNow: false,
            name: '',
            startDate: '',
            endDate: '',
            location: [],
        }
    );

    const [items, setItems] = useState([]);
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

    function handleAvailabilityChange(e) {
        dispatchSearchParams({ type: 'availabilityChange', value: e.target.value });
    }

    function handleDateChange(value) {
        dispatchSearchParams({ value });
    }

    function handleOrgChange(e) {
        dispatchSearchParams({
            type: 'locationChange',
            value: { check: e.target.checked, id: e.target.value },
        });
    }

    function applyFilters(e) {
        dispatchSearchParams({
            type: 'locationChange',
            value: { check: e.target.checked, id: e.target.value },
        });
    }

    return (
        <SearchPage
            {...{
                results: items,
                orgs,
                searchParams,
                handleAvailabilityChange,
                handleDateChange,
                handleOrgChange,
                applyFilters,
                error,
            }}
        />
    );
}
