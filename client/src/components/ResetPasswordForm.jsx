import { Button, Grid } from '@mui/material';

import { FormLayout, FormField } from '.';

export default function ResetPasswordForm({ form, handleSubmit, handleChange, error }) {
    return (
        <FormLayout
            text={{ variant: 'h4', text: 'Reset Password' }}
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
                <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid item md={12}>
                        <FormField
                            name='password'
                            id='password'
                            label='Password'
                            placeholder='Type your password'
                            handleChange={handleChange}
                            value={form.password}
                            type='password'
                            fullWidth
                            size='small'
                        />
                    </Grid>
                    <Grid item md={12}>
                        <FormField
                            name='confirmPassword'
                            id='confirm-password'
                            label='Confirm Password'
                            placeholder='Type your password again'
                            handleChange={handleChange}
                            value={form.confirmPassword}
                            type='password'
                            fullWidth
                            size='small'
                        />
                    </Grid>
                </Grid>
                <Button
                    color='primary'
                    type='submit'
                    variant='contained'
                    fullWidth
                    sx={{ margin: '3vh 0' }}
                >
                    Reset My Password
                </Button>
            </form>
        </FormLayout>
    );
}
