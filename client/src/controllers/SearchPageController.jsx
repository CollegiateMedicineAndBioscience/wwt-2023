import { useReducer, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SearchPage } from '../components';
import { useMessage } from '../contexts';
import { getAllOrgs } from '../services/orgServices';
import { searchItems } from '../services/itemServices';

export default function SearchPageController() {
    const [searchParams] = useSearchParams();
    const { error, setError, success } = useMessage();

    const [filters, dispatchFilters] = useReducer(
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
            const orgReq = await getAllOrgs();
            if (!orgReq.success) {
                setError(orgReq.error);
            } else {
                setOrgs(orgReq.organizations);
            }

            const itemReq = await searchItems({ ...filters, name: searchParams.name });
            if (!itemReq.success) {
                setError(itemReq.error);
            } else {
                setItems(itemReq.items);
            }
        }

        getData();
    }, [setError, filters, searchParams]);

    function handleAvailabilityChange(e) {
        dispatchFilters({ type: 'availabilityChange', value: e.target.value });
    }

    function handleDateChange(value) {
        dispatchFilters({ value });
    }

    function handleOrgChange(e) {
        dispatchFilters({
            type: 'locationChange',
            value: { check: e.target.checked, id: e.target.value },
        });
    }

    function applyFilters(e) {
        dispatchFilters({
            type: 'locationChange',
            value: { check: e.target.checked, id: e.target.value },
        });
    }

    return (
        <SearchPage
            {...{
                results: items,
                orgs,
                searchParams: { ...filters, name: searchParams.name },
                handleAvailabilityChange,
                handleDateChange,
                handleOrgChange,
                applyFilters,
                success,
                error,
            }}
        />
    );
}
