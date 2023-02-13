import { Button } from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';

import { FormLayout, FormField } from '.';

export default function RequestPaswordResetForm({ form, handleSubmit, handleChange, error }) {
    return (
        <FormLayout
            text={{ variant: 'h4', text: 'Request a Password Reset' }}
            error={error}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '10%',
                color: 'text.main',
            }}
        >
            <form onSubmit={handleSubmit} sx={{ color: 'text.main' }}>
                <FormField
                    name='email'
                    id='email'
                    label='Email'
                    placeholder='Type your email'
                    icon={AccountCircle}
                    handleChange={handleChange}
                    value={form.email}
                    fullWidth
                    size='small'
                    sx={{ margin: '2vh 0' }}
                />
                <Button
                    color='primary'
                    type='submit'
                    variant='contained'
                    fullWidth
                    sx={{ margin: '3vh 0' }}
                    disabled={form.password !== form.confirmPassword}
                >
                    Request Password Reset
                </Button>
            </form>
        </FormLayout>
    );
}
